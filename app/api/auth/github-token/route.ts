import { NextRequest, NextResponse } from 'next/server';
import admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Firebase Admin 초기화 (런타임에만 실행)
let isAdminInitialized = false;

function initializeFirebaseAdmin() {
  // 이미 초기화되었으면 스킵
  if (isAdminInitialized || admin.apps.length > 0) {
    return;
  }

  // 빌드 시점 체크: 환경 변수가 없으면 초기화하지 않음
  if (!process.env.FIREBASE_PROJECT_ID && !process.env.FIREBASE_CLIENT_EMAIL && !process.env.FIREBASE_PRIVATE_KEY) {
    // JSON 파일도 확인
    const jsonFiles = [
      path.join(process.cwd(), 'lib', 'firebase-service-account.json'),
      path.join(process.cwd(), 'lib', 'serviceAccountKey.json'),
      path.join(process.cwd(), 'firebase-service-account.json'),
      path.join(process.cwd(), 'serviceAccountKey.json'),
    ];

    let hasJsonFile = false;
    for (const filePath of jsonFiles) {
      try {
        if (fs.existsSync(filePath)) {
          hasJsonFile = true;
          break;
        }
      } catch {
        // 파일 시스템 접근 실패 시 무시 (빌드 시점)
      }
    }

    if (!hasJsonFile) {
      // 환경 변수도 없고 JSON 파일도 없으면 초기화하지 않음
      return;
    }
  }

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
      isAdminInitialized = true;
      console.log('Firebase Admin 초기화 성공 (환경 변수 사용)');
      return;
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
        try {
          if (fs.existsSync(filePath)) {
            serviceAccountPath = filePath;
            break;
          }
        } catch {
          // 파일 시스템 접근 실패 시 무시
        }
      }

      if (serviceAccountPath) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
        });
        isAdminInitialized = true;
        console.log('Firebase Admin 초기화 성공 (JSON 파일 사용)');
        return;
      }
    }
  } catch (error) {
    // 빌드 시점에는 에러를 throw하지 않음
    if (process.env.NODE_ENV !== 'production' || admin.apps.length === 0) {
      console.error('Firebase Admin 초기화 실패:', error);
    }
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
  // 런타임에 Firebase Admin 초기화 시도
  initializeFirebaseAdmin();

  // Firebase Admin이 초기화되지 않았으면 에러 반환
  if (!admin.apps.length) {
    return NextResponse.json(
      {
        success: false,
        error: 'Firebase Admin SDK가 설정되지 않았습니다. 환경 변수를 확인해주세요.',
      },
      { status: 500 }
    );
  }

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

