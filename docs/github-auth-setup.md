# GitHub 토큰 인증 설정 가이드

## 1. Firebase Admin SDK 설정

### Firebase 콘솔에서 서비스 계정 키 다운로드:

1. Firebase Console → 프로젝트 설정 → 서비스 계정
2. "새 비공개 키 생성" 클릭
3. JSON 파일 다운로드 (안전하게 보관!)

### 환경 변수 설정 (.env.local)

```env
# Firebase Client (기존)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=test-11872.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=test-11872
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=test-11872.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=61366963523
NEXT_PUBLIC_FIREBASE_APP_ID=1:61366963523:web:48a7bc9d95a71154c7f3f6
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-QV76678XGG

# Firebase Admin SDK (서버 측)
FIREBASE_PROJECT_ID=test-11872
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@test-11872.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**중요**: `FIREBASE_PRIVATE_KEY`는 다운로드한 JSON 파일의 `private_key` 값을 그대로 복사하세요. 줄바꿈 문자(`\n`)가 포함되어 있어야 합니다.

---

## 2. GitHub Personal Access Token 생성

### GitHub에서 토큰 생성:

1. GitHub 로그인 → 우측 상단 프로필 클릭 → **Settings**
2. 좌측 메뉴 하단 → **Developer settings**
3. **Personal access tokens** → **Tokens (classic)**
4. **Generate new token (classic)** 클릭
5. Note: "BOOSTCAMP App" (원하는 이름)
6. Expiration: 원하는 만료 기간 선택
7. 권한 선택:
   - ✅ `read:user` - 사용자 정보 읽기
   - ✅ `user:email` - 이메일 주소 읽기
8. **Generate token** 클릭
9. **토큰 복사** (한 번만 표시되므로 안전하게 보관!)

토큰 형식: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

---

## 3. 사용 방법

1. 웹사이트에서 "로그인" 버튼 클릭
2. "GitHub" 탭 선택
3. 생성한 GitHub Personal Access Token 입력
4. "GitHub로 로그인" 클릭

---

## 4. 보안 주의사항

⚠️ **절대 공유하지 마세요:**
- GitHub Personal Access Token
- Firebase 서비스 계정 키
- `.env.local` 파일

✅ **권장 사항:**
- GitHub 토큰에 만료 시간 설정
- 최소한의 권한만 부여
- 프로덕션에서는 환경 변수를 안전하게 관리
- 토큰이 노출되면 즉시 GitHub에서 삭제

---

## 5. 문제 해결

### "Firebase Admin 초기화 실패" 오류:
- `.env.local` 파일의 `FIREBASE_PRIVATE_KEY` 확인
- 줄바꿈 문자(`\n`)가 올바르게 포함되어 있는지 확인
- 따옴표로 감싸져 있는지 확인

### "GitHub API 오류" 오류:
- GitHub 토큰이 유효한지 확인
- 필요한 권한(`read:user`, `user:email`)이 있는지 확인
- 토큰이 만료되지 않았는지 확인

### "인증 실패" 오류:
- 서버 로그 확인 (`console.error` 출력)
- Firebase 프로젝트 설정 확인
- 네트워크 연결 확인

