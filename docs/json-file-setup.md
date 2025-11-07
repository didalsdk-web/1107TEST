# JSON 파일 직접 사용 가이드

## 1단계: JSON 파일 위치

Firebase 서비스 계정 키 JSON 파일을 다음 위치 중 하나에 넣으세요:

**권장 위치:**
- `code/lib/firebase-service-account.json`
- `code/lib/serviceAccountKey.json`

**또는 프로젝트 루트:**
- `code/firebase-service-account.json`
- `code/serviceAccountKey.json`

## 2단계: 파일 이름

다운로드한 JSON 파일의 이름을 다음 중 하나로 변경하세요:
- `firebase-service-account.json` (권장)
- `serviceAccountKey.json`

## 3단계: 파일 배치

예시:
```
code/
  ├── lib/
  │   ├── firebase-service-account.json  ← 여기에 넣기
  │   └── firebase.ts
  ├── app/
  └── ...
```

## 4단계: 확인

코드는 자동으로 다음 순서로 파일을 찾습니다:
1. 환경 변수 (`.env.local`의 `FIREBASE_PROJECT_ID` 등)
2. `lib/firebase-service-account.json`
3. `lib/serviceAccountKey.json`
4. 프로젝트 루트의 `firebase-service-account.json`
5. 프로젝트 루트의 `serviceAccountKey.json`

## 보안 주의사항

⚠️ **중요**: JSON 파일은 Git에 커밋되지 않도록 `.gitignore`에 추가되어 있습니다.

✅ **확인 방법:**
```bash
git status
```

JSON 파일이 목록에 나타나지 않으면 정상입니다.

## 문제 해결

### "Firebase Admin SDK 설정을 찾을 수 없습니다" 오류:
- JSON 파일이 올바른 위치에 있는지 확인
- 파일 이름이 정확한지 확인
- JSON 파일 형식이 올바른지 확인

### 파일을 찾지 못하는 경우:
- 개발 서버 재시작: `npm run dev`
- 파일 경로 확인: `code/lib/` 폴더에 있는지 확인

