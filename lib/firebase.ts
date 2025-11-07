import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Firebase 앱 초기화 (빌드 시점 오류 방지)
let app: ReturnType<typeof initializeApp> | null = null

// 환경 변수가 있고, 클라이언트 사이드이거나 서버 사이드에서만 초기화
const hasFirebaseConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
                          process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID

if (hasFirebaseConfig) {
  try {
    if (getApps().length === 0) {
      app = initializeApp(firebaseConfig)
    } else {
      app = getApps()[0]
    }
  } catch (error) {
    // 빌드 시점 오류는 무시 (런타임에 다시 시도)
    if (typeof window !== 'undefined') {
      console.error('Firebase 초기화 오류:', error)
    }
  }
}

// auth와 db는 앱이 있을 때만 생성
export const auth = app ? getAuth(app) : (null as any)
export const db = app ? getFirestore(app) : (null as any)
export default app

