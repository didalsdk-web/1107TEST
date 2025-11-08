# Vercel 환경 변수 확인 체크리스트

## 확인 방법

### 1. Vercel Dashboard 접속
1. https://vercel.com/dashboard 접속
2. 프로젝트 `1107-test` 선택
3. **Settings** → **Environment Variables** 클릭

### 2. 필수 환경 변수 확인

다음 **7개** Firebase Client 변수가 모두 설정되어 있는지 확인:

#### ✅ 필수 변수 목록:

| # | Key | Value 예시 | 상태 |
|---|-----|-----------|------|
| 1 | `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY` | ⬜ |
| 2 | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `test-11872.firebaseapp.com` | ⬜ |
| 3 | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `test-11872` | ⬜ |
| 4 | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `test-11872.firebasestorage.app` | ⬜ |
| 5 | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `61366963523` | ⬜ |
| 6 | `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:61366963523:web:48a7bc9d95a71154c7f3f6` | ⬜ |
| 7 | `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-QV76678XGG` | ⬜ |

### 3. 각 변수 확인 사항

각 변수를 클릭하여 다음을 확인:

- ✅ **Key 이름이 정확한지** (대소문자, 언더스코어 정확히)
- ✅ **Value 값이 올바른지**
- ✅ **Environment 설정**:
  - ✅ Production 체크
  - ✅ Preview 체크
  - ✅ Development 체크

### 4. Firebase Admin SDK 변수 (선택사항 - GitHub 토큰 인증용)

| # | Key | 상태 |
|---|-----|------|
| 1 | `FIREBASE_PROJECT_ID` | ⬜ |
| 2 | `FIREBASE_CLIENT_EMAIL` | ⬜ |
| 3 | `FIREBASE_PRIVATE_KEY` | ⬜ |

## 빠른 확인 체크리스트

- [ ] 7개 `NEXT_PUBLIC_FIREBASE_*` 변수 모두 존재
- [ ] 각 변수가 Production, Preview, Development 모두에 설정됨
- [ ] 변수 이름에 오타 없음 (특히 `NEXT_PUBLIC_` 접두사 확인)
- [ ] 변수 값이 올바름 (공백, 따옴표 없음)
- [ ] 환경 변수 추가 후 재배포 완료

## 문제 발견 시

### 변수가 없는 경우
1. 누락된 변수 추가
2. 재배포 (Deployments → 최신 배포 → Redeploy)

### 변수 이름이 잘못된 경우
1. 잘못된 변수 삭제
2. 올바른 이름으로 재추가
3. 재배포

### Environment가 일부만 선택된 경우
1. 변수 클릭 → Edit
2. Production, Preview, Development 모두 체크
3. Save
4. 재배포

## 확인 후 다음 단계

환경 변수가 모두 설정되어 있다면:
1. **재배포 확인**: 환경 변수 추가 후 재배포가 되었는지 확인
2. **브라우저 테스트**: `1107-test.vercel.app` 접속
3. **하드 리프레시**: `Ctrl + Shift + R`
4. **콘솔 확인**: F12 → Console에서 Firebase 오류 확인

## 참고 문서

- 상세 가이드: `code/docs/vercel-environment-variables.md`
- 빠른 해결: `code/QUICK_FIX.md`
- 문제 해결: `code/docs/troubleshooting-firebase-init.md`

