# Vercel Environment Variables 설정 가이드

## Vercel에 설정해야 할 환경 변수

Vercel Dashboard → 프로젝트 → Settings → Environment Variables에서 다음 변수들을 추가하세요.

---

## 1. Firebase Client 설정 (클라이언트 측)

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `test-11872.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `test-11872` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `test-11872.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `61366963523` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:61366963523:web:48a7bc9d95a71154c7f3f6` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-QV76678XGG` |

---

## 2. Firebase Admin SDK 설정 (서버 측 - GitHub 토큰 인증용)

| Key | Value |
|-----|-------|
| `FIREBASE_PROJECT_ID` | `test-11872` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@test-11872.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2XCLhXEHFdhX5\nlvAxg8LbB2U+VDmd4SFovgsWaXU+n9UqrdlH5OVP79ithiVPJkkROh4lrlbzCCJL\nKGmR+qAJUcuvFpaffmwlHZ7cj33eGg8X3j1VlagorcLWFuM/Z6hWzJHOwozDNXlB\nvbIER2jbFyN5qrJa6KyQIAOVOBIfKe99hqQ65LtnFV9e1owrVztIg7FAoh1OBemk\nw2FnsqwyRWTh8JuGtUF6oU8ylWixKNtERZppMd+jKzsYhx73zC+UUaPrHyINIBbx\nERSwndgB0FsPRHfTbJrune700TVWEJcpjZIhgroXtFXH5I3Aez5Icl4PSDy4Djo/\nUWYT9qjtAgMBAAECggEAFzywWSUnYGEGtdIs8zJF/yD3HrUezmZkmnM0+HshrIQz\nZofWmxmousHmS14/nNFVGDPeqZCIldlgfVE9+pMEF4vrt3jaYqJ6Z1RZ7OL/9/A8\nIh94k1JJpj1WCW/LL0YnJkBVCBK0Wx+SPvVMHM14qApPw+4jYgAqFQdvTXFipcO8\nJx5YL1Djs8y8jla/F40m7guyJUG7wGknySVkaKP8PfWCdGlPqBxjxfZ0gHfPzt61\nda5mqQCfrqRt8pA/weprHsSQYF3wNB/MtA0Qc0gMZmsJTcXOWnaWZCMObf03KGjM\n+r2i2zMISrvnL7rOI1y3XNt5+pDOqLgHUe2i86vl5QKBgQDYcq7sAw16RiRzMRl4\nqMJfIAbHU6zz4xrwver448oLJ+Ipuv/K7q96cHToCkvLWfK6ZeuIvoAYw03dCAZY\nCp7r/057JZs5F0lBg31olQG5/5yyLFWoOpoHNixCFShAEDt1eAlh3c/hubJ1aKQ9\nmXJseie+MSW3o5/o+KkrwIJajwKBgQDXrtTrssPhP9PxU46+R6+Ltp21chiZRfs+\nerg78R7UqlKKw/5U409SijZh2z3tNOxcwam7HYT4CXXL9oBmPErAxXzTF8ie/OPG\ngO1iV18vUHs3j4xATqOmD4VuLsqc4A8mTkRoZhjRwL27mOneuUtB5MQ86XvXdt+t\ns8J44ihywwKBgQDEqw+9atioLWuZLxfRxqU2Acem/aS8xbII5MfH9lHy6P5apIsf\nPNk9C0luPUy5LLWcIFdvHIkP9wWcvFnnTV8xV/1bb8Qmj74ERRGCIUI8WsFqM1Zx\nUS37N4HnWYoFC7q69aKwxfbJRw2cGMSDJBYP8r6B1e5LeeUmriookvbeiQKBgAVM\nbDqmF53O/ZvuG5GdHTjncZRliykoyPVN+nyufb1nucNi8TqQowA6GP/qbOkI5c2Z\njFvma7/UK6qpEZpxXLzDnT9qVCljuQzFWg+Saeo1pfFFe4KQ7ABGXVbJm3yjHHwq\nbA/MgkuU2pRjO0uXbbverNt6OOqgJvqTcfGaTLgVAoGAZpPK8yzHrS4XWHE5xHUw\noIGxXEE0xB2FH1OSUOUOGp3PE/8ZzcBjSBhEhwClDaUquadxUaoAmXn1qFDPiSp7\nYljQCoGsk8WokoWbFgU8HyoeikJPFE42kvLAtnygEBWLkpjy7/ErLj6uuULyXL8v\nk20kKGs4gdaChWnemIEqegw=\n-----END PRIVATE KEY-----\n` |

**⚠️ 중요**: `FIREBASE_PRIVATE_KEY`는 전체 키를 한 줄로 입력하되, `\n` 문자는 그대로 유지해야 합니다.

---

## Vercel 설정 방법

### 1. Vercel Dashboard 접속
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 선택 또는 새 프로젝트 생성

### 2. Environment Variables 추가
1. 프로젝트 → **Settings** → **Environment Variables**
2. 각 변수를 하나씩 추가:
   - **Key**: 위의 Key 값 입력
   - **Value**: 위의 Value 값 입력
   - **Environment**: 
     - `NEXT_PUBLIC_*` 변수: Production, Preview, Development 모두 선택
     - 서버 측 변수: Production, Preview, Development 모두 선택

### 3. 배포
환경 변수 추가 후:
- 새 배포를 트리거하거나
- 기존 배포를 재배포

---

## 환경 변수 확인

배포 후 다음을 확인하세요:
- ✅ Firebase Authentication 작동
- ✅ Firestore 데이터 저장 작동
- ✅ GitHub 토큰 인증 작동

---

## 보안 주의사항

⚠️ **절대 공유하지 마세요:**
- `FIREBASE_PRIVATE_KEY` (서비스 계정 키)
- GitHub Personal Access Token (사용자가 입력)

✅ **권장 사항:**
- Vercel의 Environment Variables는 암호화되어 저장됩니다
- 프로덕션 환경에서만 필요한 변수는 Production 환경에만 설정
- 정기적으로 키를 로테이션하세요

