# 🔥 빠른 해결 가이드 - Firebase 환경 변수 설정

## 현재 문제
콘솔에 "Firebase 환경 변수가 설정되지 않았습니다" 오류가 표시됩니다.
모든 환경 변수가 `false`로 표시됩니다.

## 해결 방법 (5분 안에 완료)

### 1단계: Vercel Dashboard 접속
1. https://vercel.com/dashboard 접속
2. 프로젝트 `1107-test` 선택

### 2단계: 환경 변수 추가
1. 왼쪽 메뉴에서 **Settings** 클릭
2. **Environment Variables** 클릭
3. 아래 변수들을 **하나씩** 추가:

#### 변수 추가 방법:
- **Key** 입력란에 변수 이름 입력
- **Value** 입력란에 값 입력
- **Environment** 선택: **Production**, **Preview**, **Development** 모두 체크
- **Add** 버튼 클릭

#### 추가할 변수 목록:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `test-11872.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `test-11872` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `test-11872.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `61366963523` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:61366963523:web:48a7bc9d95a71154c7f3f6` |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | `G-QV76678XGG` |

**⚠️ 중요:**
- 각 변수를 **하나씩** 추가하세요
- **Environment**에서 **Production, Preview, Development 모두 선택**하세요
- 총 **7개** 변수를 모두 추가해야 합니다

### 3단계: 재배포 (필수!)
환경 변수 추가 후 **반드시 재배포**해야 합니다:

**방법 1: Vercel Dashboard에서 재배포**
1. **Deployments** 탭 클릭
2. 최신 배포 옆 **"..."** 메뉴 클릭
3. **Redeploy** 선택
4. **Redeploy** 버튼 클릭

**방법 2: Git 푸시로 재배포**
```bash
git commit --allow-empty -m "trigger redeploy"
git push origin main
```

### 4단계: 확인
1. 재배포 완료 후 (약 1-2분 소요)
2. 브라우저에서 `1107-test.vercel.app` 접속
3. **하드 리프레시**: `Ctrl + Shift + R` (또는 `Ctrl + F5`)
4. 개발자 도구 (F12) → Console 탭
5. 오류 메시지가 사라지고 "✅ Firebase 초기화 성공" 메시지가 보이면 성공!

## 체크리스트

- [ ] Vercel Dashboard 접속 완료
- [ ] 7개 환경 변수 모두 추가 완료
- [ ] 각 변수가 Production, Preview, Development 모두에 설정됨
- [ ] 재배포 완료
- [ ] 브라우저 하드 리프레시 완료
- [ ] 콘솔 오류 확인 완료

## 여전히 문제가 발생하는 경우

1. **환경 변수 이름 확인**
   - `NEXT_PUBLIC_` 접두사가 정확한지 확인
   - 대소문자 정확히 일치하는지 확인

2. **재배포 확인**
   - 환경 변수 추가 후 **반드시 재배포** 필요
   - 재배포가 완료되었는지 확인 (Deployments 탭에서)

3. **브라우저 캐시 클리어**
   - `Ctrl + Shift + Delete` → 캐시 삭제
   - 또는 시크릿 모드에서 테스트

4. **Vercel 빌드 로그 확인**
   - Deployments → 최신 배포 → Build Logs
   - 환경 변수 관련 오류가 있는지 확인

## 추가 도움말

- 상세 가이드: `code/docs/vercel-environment-variables.md`
- 단계별 가이드: `code/scripts/vercel-env-setup-guide.md`

