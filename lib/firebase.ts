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
  // 클라이언트 사이드에서만 실행
  if (typeof window === 'undefined') {
    return null
  }

  // 환경 변수 체크 (런타임에 확인)
  // Next.js는 NEXT_PUBLIC_* 변수를 빌드 시점에 번들에 포함시킵니다
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
  const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID

  if (!apiKey || !projectId) {
    console.error('❌ Firebase 환경 변수가 설정되지 않았습니다.')
    console.error('설정된 환경 변수:', {
      hasApiKey: !!apiKey,
      hasProjectId: !!projectId,
      hasAuthDomain: !!authDomain,
      hasStorageBucket: !!storageBucket,
      hasMessagingSenderId: !!messagingSenderId,
      hasAppId: !!appId,
    })
    console.error('Vercel Dashboard → Settings → Environment Variables에서 다음 변수들을 설정해주세요:')
    console.error('- NEXT_PUBLIC_FIREBASE_API_KEY')
    console.error('- NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN')
    console.error('- NEXT_PUBLIC_FIREBASE_PROJECT_ID')
    console.error('- NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET')
    console.error('- NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID')
    console.error('- NEXT_PUBLIC_FIREBASE_APP_ID')
    console.error('- NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID')
    console.error('환경 변수 설정 후 반드시 재배포가 필요합니다.')
    return null
  }

  try {
    if (getApps().length === 0) {
      // 모든 필수 환경 변수 확인
      if (!authDomain || !storageBucket || !messagingSenderId || !appId) {
        console.error('❌ Firebase 환경 변수가 불완전합니다. 모든 필수 변수를 설정해주세요.')
        return null
      }

      // 환경 변수를 다시 확인하여 동적으로 구성
      const config = {
        apiKey: apiKey,
        authDomain: authDomain,
        projectId: projectId,
        storageBucket: storageBucket,
        messagingSenderId: messagingSenderId,
        appId: appId,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || '',
      }
      
      console.log('✅ Firebase 초기화 시도 중...')
      const app = initializeApp(config)
      console.log('✅ Firebase 초기화 성공')
      return app
    } else {
      return getApps()[0]
    }
  } catch (error: any) {
    console.error('❌ Firebase 초기화 오류:', error)
    console.error('오류 상세:', error.message)
    // 에러를 다시 throw하지 않고 null 반환하여 앱이 크래시되지 않도록 함
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

