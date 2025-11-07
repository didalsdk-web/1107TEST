# Firebase 토큰 기반 인증 가이드

## 방법 1: Firebase Custom Token 사용

Firebase Custom Token은 서버에서 생성하여 클라이언트에 전달하는 토큰입니다.

### 1. 서버 측 (Node.js 예시)

```javascript
// server/auth.js
const admin = require('firebase-admin');

// Firebase Admin SDK 초기화
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
});

// Custom Token 생성
async function createCustomToken(uid, additionalClaims = {}) {
  try {
    const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
}

// API 엔드포인트 예시
app.post('/api/auth/token', async (req, res) => {
  const { userId, username } = req.body;
  
  // 사용자 검증 로직 (예: 데이터베이스에서 확인)
  // ...
  
  // Custom Token 생성
  const customToken = await createCustomToken(userId, {
    username: username,
  });
  
  res.json({ token: customToken });
});
```

### 2. 클라이언트 측 (React/Next.js)

```typescript
// hooks/use-auth-token.ts
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export async function loginWithToken(customToken: string) {
  try {
    const userCredential = await signInWithCustomToken(auth, customToken);
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || '토큰 로그인에 실패했습니다.',
    };
  }
}
```

---

## 방법 2: Firebase ID Token 사용

Firebase Auth로 로그인하면 자동으로 ID Token이 생성됩니다. 이 토큰을 사용하여 API 요청 시 인증할 수 있습니다.

### 클라이언트 측 코드

```typescript
// hooks/use-auth-token.ts
import { auth } from '@/lib/firebase';
import { getIdToken } from 'firebase/auth';

// 현재 사용자의 ID Token 가져오기
export async function getIdTokenForUser() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('사용자가 로그인되어 있지 않습니다.');
  }
  
  // ID Token 가져오기 (자동으로 갱신됨)
  const idToken = await getIdToken(user, true); // true = 강제 갱신
  return idToken;
}

// API 요청 시 사용
export async function makeAuthenticatedRequest(url: string, options: RequestInit = {}) {
  const idToken = await getIdTokenForUser();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    },
  });
  
  return response;
}
```

### 서버 측 검증 (Next.js API Route)

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';

// Firebase Admin 초기화 (한 번만)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

export async function GET(request: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '인증 토큰이 없습니다.' },
        { status: 401 }
      );
    }

    const idToken = authHeader.split('Bearer ')[1];

    // 토큰 검증
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // 사용자 정보 사용
    const uid = decodedToken.uid;
    const email = decodedToken.email;
    
    return NextResponse.json({
      message: '인증 성공',
      user: {
        uid,
        email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: '인증 실패' },
      { status: 401 }
    );
  }
}
```

---

## 방법 3: 외부 JWT 토큰 사용

외부 인증 서버에서 발급한 JWT 토큰을 사용하는 경우:

```typescript
// hooks/use-jwt-auth.ts
import { signInWithCustomToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';

// 외부 서버에서 JWT 토큰 받기
async function getJWTFromExternalServer(username: string, password: string) {
  const response = await fetch('https://your-auth-server.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });
  
  const data = await response.json();
  return data.token; // JWT 토큰
}

// JWT 토큰으로 Firebase Custom Token 받기
async function exchangeJWTForCustomToken(jwtToken: string) {
  const response = await fetch('/api/auth/exchange-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${jwtToken}`,
    },
  });
  
  const data = await response.json();
  return data.customToken;
}

// 전체 로그인 플로우
export async function loginWithJWT(username: string, password: string) {
  try {
    // 1. 외부 서버에서 JWT 받기
    const jwtToken = await getJWTFromExternalServer(username, password);
    
    // 2. JWT를 Firebase Custom Token으로 교환
    const customToken = await exchangeJWTForCustomToken(jwtToken);
    
    // 3. Firebase에 로그인
    const userCredential = await signInWithCustomToken(auth, customToken);
    
    return { success: true, user: userCredential.user };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || '로그인에 실패했습니다.',
    };
  }
}
```

---

## 토큰 저장 및 관리

```typescript
// utils/token-storage.ts
// 클라이언트 측에서 토큰 저장 (선택사항)

export const TokenStorage = {
  // localStorage에 저장
  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },

  // 토큰 가져오기
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token');
    }
    return null;
  },

  // 토큰 삭제
  removeToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },
};
```

---

## 주요 차이점

| 방법 | 장점 | 단점 | 사용 시나리오 |
|------|------|------|--------------|
| **Custom Token** | 서버에서 완전한 제어 가능, 커스텀 클레임 추가 가능 | 서버 구축 필요 | 기존 인증 시스템과 통합 |
| **ID Token** | Firebase가 자동 관리, 간단함 | Firebase에 의존적 | Firebase Auth 사용 시 |
| **JWT Token** | 표준 프로토콜, 다양한 서비스와 호환 | 추가 인프라 필요 | 마이크로서비스 아키텍처 |

---

## 보안 고려사항

1. **토큰 만료 시간**: 토큰은 만료 시간을 설정해야 합니다.
2. **HTTPS 사용**: 프로덕션에서는 반드시 HTTPS를 사용하세요.
3. **토큰 갱신**: ID Token은 자동으로 갱신되지만, Custom Token은 수동 갱신이 필요합니다.
4. **토큰 검증**: 서버 측에서 항상 토큰을 검증하세요.

