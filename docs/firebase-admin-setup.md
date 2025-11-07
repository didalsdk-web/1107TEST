# Firebase Admin SDK 설정 가이드

## 1단계: Firebase 서비스 계정 키 다운로드

1. [Firebase Console](https://console.firebase.google.com/) 접속
2. 프로젝트 선택: **test-11872**
3. 좌측 메뉴 → ⚙️ **프로젝트 설정**
4. 상단 탭 → **서비스 계정**
5. **"새 비공개 키 생성"** 클릭
6. JSON 파일 다운로드 (예: `test-11872-firebase-adminsdk-xxxxx.json`)

## 2단계: JSON 파일에서 값 추출

다운로드한 JSON 파일을 열면 다음과 같은 구조입니다:

```json
{
  "type": "service_account",
  "project_id": "test-11872",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-xxxxx@test-11872.iam.gserviceaccount.com",
  ...
}
```

## 3단계: .env.local 파일에 추가

`.env.local` 파일에 다음 3개 변수를 추가하세요:

```env
# Firebase Admin SDK (서버 측)
FIREBASE_PROJECT_ID=test-11872
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@test-11872.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

**중요 사항:**
- `FIREBASE_PRIVATE_KEY`는 JSON 파일의 `private_key` 값을 **그대로** 복사
- 따옴표(`"`)로 감싸야 함
- 줄바꿈 문자(`\n`)가 포함되어 있어야 함
- 전체 키를 한 줄로 작성하되, `\n`은 그대로 유지

## 4단계: 확인

설정 후 개발 서버를 재시작하세요:

```bash
npm run dev
```

그리고 GitHub 토큰으로 로그인을 시도해보세요.

## 문제 해결

### "Firebase Admin 초기화 실패" 오류가 발생하면:

1. `.env.local` 파일이 프로젝트 루트(`code/`)에 있는지 확인
2. 환경 변수 이름이 정확한지 확인 (대소문자 구분)
3. `FIREBASE_PRIVATE_KEY`의 따옴표와 줄바꿈 문자 확인
4. 개발 서버 재시작

### JSON 파일을 직접 사용하는 방법 (대안):

만약 환경 변수 설정이 어렵다면, JSON 파일을 직접 사용할 수도 있습니다:

```typescript
// app/api/auth/github-token/route.ts
import serviceAccount from '@/path/to/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
```

하지만 보안상 환경 변수 사용을 권장합니다.

