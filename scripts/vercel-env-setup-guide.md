# Vercel 환경 변수 설정 및 재배포 가이드

## 방법 1: Vercel Dashboard에서 설정 (권장)

### 1단계: Vercel Dashboard 접속
1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 `1107-test` 선택

### 2단계: 환경 변수 추가
1. **Settings** → **Environment Variables** 클릭
2. 아래 변수들을 하나씩 추가:

#### Firebase Client 설정 (모두 Production, Preview, Development 선택)

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `test-11872.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `test-11872` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `test-11872.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `61366963523` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:61366963523:web:48a7bc9d95a71154c7f3f6` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-QV76678XGG` |

#### Firebase Admin SDK 설정 (모두 Production, Preview, Development 선택)

| Key | Value |
|-----|-------|
| `FIREBASE_PROJECT_ID` | `test-11872` |
| `FIREBASE_CLIENT_EMAIL` | `firebase-adminsdk-fbsvc@test-11872.iam.gserviceaccount.com` |
| `FIREBASE_PRIVATE_KEY` | 아래 전체 키 복사 |

**FIREBASE_PRIVATE_KEY 값:**
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2XCLhXEHFdhX5
lvAxg8LbB2U+VDmd4SFovgsWaXU+n9UqrdlH5OVP79ithiVPJkkROh4lrlbzCCJL
KGmR+qAJUcuvFpaffmwlHZ7cj33eGg8X3j1VlagorcLWFuM/Z6hWzJHOwozDNXlB
vbIER2jbFyN5qrJa6KyQIAOVOBIfKe99hqQ65LtnFV9e1owrVztIg7FAoh1OBemk
w2FnsqwyRWTh8JuGtUF6oU8ylWixKNtERZppMd+jKzsYhx73zC+UUaPrHyINIBbx
ERSwndgB0FsPRHfTbJrune700TVWEJcpjZIhgroXtFXH5I3Aez5Icl4PSDy4Djo/
UWYT9qjtAgMBAAECggEAFzywWSUnYGEGtdIs8zJF/yD3HrUezmZkmnM0+HshrIQz
ZofWmxmousHmS14/nNFVGDPeqZCIldlgfVE9+pMEF4vrt3jaYqJ6Z1RZ7OL/9/A8
Ih94k1JJpj1WCW/LL0YnJkBVCBK0Wx+SPvVMHM14qApPw+4jYgAqFQdvTXFipcO8
Jx5YL1Djs8y8jla/F40m7guyJUG7wGknySVkaKP8PfWCdGlPqBxjxfZ0gHfPzt61
da5mqQCfrqRt8pA/weprHsSQYF3wNB/MtA0Qc0gMZmsJTcXOWnaWZCMObf03KGjM
+r2i2zMISrvnL7rOI1y3XNt5+pDOqLgHUe2i86vl5QKBgQDYcq7sAw16RiRzMRl4
qMJfIAbHU6zz4xrwver448oLJ+Ipuv/K7q96cHToCkvLWfK6ZeuIvoAYw03dCAZY
Cp7r/057JZs5F0lBg31olQG5/5yyLFWoOpoHNixCFShAEDt1eAlh3c/hubJ1aKQ9
mXJseie+MSW3o5/o+KkrwIJajwKBgQDXrtTrssPhP9PxU46+R6+Ltp21chiZRfs+
erg78R7UqlKKw/5U409SijZh2z3tNOxcwam7HYT4CXXL9oBmPErAxXzTF8ie/OPG
gO1iV18vUHs3j4xATqOmD4VuLsqc4A8mTkRoZhjRwL27mOneuUtB5MQ86XvXdt+t
s8J44ihywwKBgQDEqw+9atioLWuZLxfRxqU2Acem/aS8xbII5MfH9lHy6P5apIsf
PNk9C0luPUy5LLWcIFdvHIkP9wWcvFnnTV8xV/1bb8Qmj74ERRGCIUI8WsFqM1Zx
US37N4HnWYoFC7q69aKwxfbJRw2cGMSDJBYP8r6B1e5LeeUmriookvbeiQKBgAVM
bDqmF53O/ZvuG5GdHTjncZRliykoyPVN+nyufb1nucNi8TqQowA6GP/qbOkI5c2Z
jFvma7/UK6qpEZpxXLzDnT9qVCljuQzFWg+Saeo1pfFFe4KQ7ABGXVbJm3yjHHwq
bA/MgkuU2pRjO0uXbbverNt6OOqgJvqTcfGaTLgVAoGAZpPK8yzHrS4XWHE5xHUw
oIGxXEE0xB2FH1OSUOUOGp3PE/8ZzcBjSBhEhwClDaUquadxUaoAmXn1qFDPiSp7
YljQCoGsk8WokoWbFgU8HyoeikJPFE42kvLAtnygEBWLkpjy7/ErLj6uuULyXL8v
k20kKGs4gdaChWnemIEqegw=
-----END PRIVATE KEY-----
```

**⚠️ 중요**: `FIREBASE_PRIVATE_KEY`는 위의 전체 키를 그대로 복사하여 붙여넣으세요. 줄바꿈(`\n`)은 자동으로 처리됩니다.

### 3단계: 재배포
환경 변수 추가 후:
1. **Deployments** 탭으로 이동
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **"Redeploy"** 선택
4. 또는 Git에 새로운 커밋을 푸시하면 자동으로 재배포됩니다

---

## 방법 2: Vercel CLI 사용 (고급)

### 1단계: Vercel CLI 로그인
```bash
vercel login
```
브라우저에서 인증 완료

### 2단계: 환경 변수 설정
각 변수를 하나씩 설정:
```bash
# Firebase Client
echo "AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY" | vercel env add NEXT_PUBLIC_FIREBASE_API_KEY production
echo "test-11872.firebaseapp.com" | vercel env add NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN production
# ... (나머지 변수들도 동일하게)
```

### 3단계: 재배포
```bash
vercel --prod
```

---

## 확인 방법

배포 완료 후:
1. 브라우저에서 `1107-test.vercel.app` 접속
2. 개발자 도구 콘솔 확인 (오류 없어야 함)
3. 로그인 기능 테스트
4. 문의 폼 제출 테스트

