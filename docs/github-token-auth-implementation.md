# GitHub 토큰 기반 인증 구현 가이드

## 1. GitHub Personal Access Token 생성 방법

### GitHub에서 토큰 생성:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" 클릭
3. 필요한 권한 선택:
   - `read:user` - 사용자 정보 읽기
   - `user:email` - 이메일 주소 읽기
4. 토큰 생성 후 복사 (한 번만 표시됨!)

---

## 2. 서버 측 구현 (Next.js API Route)

### app/api/auth/github-token/route.ts

```typescript
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Firebase Admin 초기화
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// GitHub API에서 사용자 정보 가져오기
async function getGitHubUser(githubToken: string) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('GitHub 인증 실패');
  }

  return await response.json();
}

// GitHub 이메일 가져오기
async function getGitHubEmails(githubToken: string) {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  });

  if (!response.ok) {
    throw new Error('이메일 정보 가져오기 실패');
  }

  const emails = await response.json();
  return emails.find((email: any) => email.primary) || emails[0];
}

export async function POST(request: NextRequest) {
  try {
    const { githubToken } = await request.json();

    if (!githubToken) {
      return NextResponse.json(
        { error: 'GitHub 토큰이 필요합니다.' },
        { status: 400 }
      );
    }

    // GitHub에서 사용자 정보 가져오기
    const githubUser = await getGitHubUser(githubToken);
    const githubEmail = await getGitHubEmails(githubToken);

    // Firebase에서 사용자 찾기 또는 생성
    const uid = `github_${githubUser.id}`;
    let firebaseUser;

    try {
      firebaseUser = await admin.auth().getUser(uid);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // 사용자가 없으면 생성
        firebaseUser = await admin.auth().createUser({
          uid,
          email: githubEmail.email,
          displayName: githubUser.name || githubUser.login,
          photoURL: githubUser.avatar_url,
          emailVerified: githubEmail.verified,
        });
      } else {
        throw error;
      }
    }

    // Firebase Custom Token 생성
    const customToken = await admin.auth().createCustomToken(uid, {
      github_id: githubUser.id,
      github_username: githubUser.login,
      github_avatar: githubUser.avatar_url,
    });

    return NextResponse.json({
      success: true,
      customToken,
      user: {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      },
    });
  } catch (error: any) {
    console.error('GitHub 토큰 인증 오류:', error);
    return NextResponse.json(
      { error: error.message || '인증에 실패했습니다.' },
      { status: 401 }
    );
  }
}
```

---

## 3. 클라이언트 측 구현

### hooks/use-github-auth.ts

```typescript
"use client"

import { useState, useEffect } from 'react'
import { 
  User, 
  signInWithCustomToken,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/lib/firebase'

export function useGitHubAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGitHubToken = async (githubToken: string) => {
    try {
      // 서버에서 Firebase Custom Token 받기
      const response = await fetch('/api/auth/github-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubToken }),
      })

      const data = await response.json()

      if (!data.success) {
        return {
          success: false,
          error: data.error || 'GitHub 인증에 실패했습니다.',
        }
      }

      // Firebase Custom Token으로 로그인
      const userCredential = await signInWithCustomToken(auth, data.customToken)
      
      return {
        success: true,
        user: userCredential.user,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그인에 실패했습니다.',
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      return { success: true }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || '로그아웃에 실패했습니다.',
      }
    }
  }

  return {
    user,
    loading,
    loginWithGitHubToken,
    logout,
    isAuthenticated: !!user,
  }
}
```

---

## 4. UI 컴포넌트 업데이트

### components/github-auth.tsx

```typescript
"use client"

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useGitHubAuth } from '@/hooks/use-github-auth'

export function GitHubAuthForm() {
  const [githubToken, setGithubToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginWithGitHubToken, user, isAuthenticated } = useGitHubAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!githubToken) {
      setError('GitHub 토큰을 입력해주세요.')
      setLoading(false)
      return
    }

    const result = await loginWithGitHubToken(githubToken)

    if (result.success) {
      setGithubToken('') // 보안을 위해 토큰 제거
    } else {
      setError(result.error || '로그인에 실패했습니다.')
    }

    setLoading(false)
  }

  if (isAuthenticated) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
          <p className="text-green-400">로그인 성공!</p>
          <p className="text-sm text-white/70 mt-1">
            {user?.email || user?.displayName}
          </p>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="github-token" className="text-white mb-2 block">
          GitHub Personal Access Token
        </Label>
        <Input
          id="github-token"
          type="password"
          placeholder="ghp_xxxxxxxxxxxx"
          value={githubToken}
          onChange={(e) => setGithubToken(e.target.value)}
          className="bg-[#1a1a2e] border-[#3a3a5e] text-white"
          disabled={loading}
        />
        <p className="text-xs text-white/50 mt-1">
          GitHub Settings → Developer settings → Personal access tokens에서 생성
        </p>
      </div>

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        className="w-full bg-primary text-white hover:opacity-90"
        disabled={loading}
      >
        {loading ? '로그인 중...' : 'GitHub로 로그인'}
      </Button>
    </form>
  )
}
```

---

## 5. 환경 변수 설정

### .env.local (서버 측)

```env
# Firebase Admin SDK
FIREBASE_PROJECT_ID=test-11872
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@test-11872.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 6. Firebase Admin SDK 설치

```bash
npm install firebase-admin
```

---

## 보안 고려사항

1. **토큰 저장**: GitHub 토큰은 절대 클라이언트에 저장하지 마세요
2. **HTTPS**: 프로덕션에서는 반드시 HTTPS 사용
3. **토큰 만료**: GitHub 토큰에 만료 시간 설정 권장
4. **권한 최소화**: 필요한 최소한의 GitHub 권한만 요청
5. **서버 검증**: 항상 서버에서 GitHub 토큰을 검증하세요

---

## 사용 흐름

1. 사용자가 GitHub에서 Personal Access Token 생성
2. 클라이언트에서 토큰 입력
3. 서버로 토큰 전송
4. 서버에서 GitHub API로 사용자 정보 확인
5. Firebase Custom Token 생성
6. 클라이언트에서 Custom Token으로 Firebase 로그인
7. Firebase 인증 상태 유지

