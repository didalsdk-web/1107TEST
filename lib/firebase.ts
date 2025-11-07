import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getAuth, Auth } from 'firebase/auth'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Firebase 앱 초기화 함수 (런타임에 호출)
function getFirebaseApp(): FirebaseApp | null {
  // 환경 변수 체크
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY || !process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    return null
  }

  try {
    if (getApps().length === 0) {
      return initializeApp(firebaseConfig)
    } else {
      return getApps()[0]
    }
  } catch (error) {
    console.error('Firebase 초기화 오류:', error)
    return null
  }
}

// 앱 가져오기 (지연 초기화)
let app: FirebaseApp | null = null

// auth와 db는 지연 초기화
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null

export function getAuthInstance(): Auth | null {
  if (authInstance) return authInstance
  
  if (!app) {
    app = getFirebaseApp()
  }
  
  if (app) {
    authInstance = getAuth(app)
    return authInstance
  }
  
  return null
}

export function getDbInstance(): Firestore | null {
  if (dbInstance) return dbInstance
  
  if (!app) {
    app = getFirebaseApp()
  }
  
  if (app) {
    dbInstance = getFirestore(app)
    return dbInstance
  }
  
  return null
}

// 하위 호환성을 위한 export (런타임에만 초기화)
// 주의: 이 값들은 모듈 로드 시점에 null일 수 있으므로, 
// 가능하면 getAuthInstance()와 getDbInstance()를 직접 사용하는 것을 권장합니다.
export const auth = typeof window !== 'undefined' ? getAuthInstance() : null
export const db = typeof window !== 'undefined' ? getDbInstance() : null
export default app

