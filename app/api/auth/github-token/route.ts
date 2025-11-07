import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Firebase Admin 초기화
if (!admin.apps.length) {
  try {
    // 방법 1: 환경 변수 사용 (우선)
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } 
    // 방법 2: JSON 파일 직접 사용 (대안)
    else {
      // lib 폴더에서 JSON 파일 찾기
      const jsonFiles = [
        path.join(process.cwd(), 'lib', 'firebase-service-account.json'),
        path.join(process.cwd(), 'lib', 'serviceAccountKey.json'),
        path.join(process.cwd(), 'firebase-service-account.json'),
        path.join(process.cwd(), 'serviceAccountKey.json'),
      ];

      let serviceAccountPath: string | null = null;
      for (const filePath of jsonFiles) {
        if (fs.existsSync(filePath)) {
          serviceAccountPath = filePath;
          break;
        }
      }

      if (serviceAccountPath) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
        console.log('Firebase Admin 초기화 성공 (JSON 파일 사용)');
      } else {
        throw new Error('Firebase Admin SDK 설정을 찾을 수 없습니다. 환경 변수 또는 JSON 파일이 필요합니다.');
      }
    }
  } catch (error) {
    console.error('Firebase Admin 초기화 실패:', error);
  }
}

// GitHub API에서 사용자 정보 가져오기
async function getGitHubUser(githubToken: string) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'BOOSTCAMP-App',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GitHub API 오류: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

// GitHub 이메일 가져오기
async function getGitHubEmails(githubToken: string) {
  const response = await fetch('https://api.github.com/user/emails', {
    headers: {
      'Authorization': `token ${githubToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'BOOSTCAMP-App',
    },
  });

  if (!response.ok) {
    // 이메일 API 실패 시 기본값 반환
    return { email: null, verified: false };
  }

  const emails = await response.json();
  const primaryEmail = emails.find((email: any) => email.primary) || emails[0];
  return primaryEmail || { email: null, verified: false };
}

export async function POST(request: NextRequest) {
  try {
    const { githubToken } = await request.json();

    if (!githubToken) {
      return NextResponse.json(
        { success: false, error: 'GitHub 토큰이 필요합니다.' },
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
      
      // 사용자 정보 업데이트
      firebaseUser = await admin.auth().updateUser(uid, {
        email: githubEmail.email || githubUser.email,
        displayName: githubUser.name || githubUser.login,
        photoURL: githubUser.avatar_url,
        emailVerified: githubEmail.verified || false,
      });
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        // 사용자가 없으면 생성
        firebaseUser = await admin.auth().createUser({
          uid,
          email: githubEmail.email || githubUser.email,
          displayName: githubUser.name || githubUser.login,
          photoURL: githubUser.avatar_url,
          emailVerified: githubEmail.verified || false,
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
      provider: 'github',
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
      { 
        success: false,
        error: error.message || '인증에 실패했습니다.' 
      },
      { status: 401 }
    );
  }
}

