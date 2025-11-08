# Vercel 환경 변수 확인 방법

## 방법 1: Vercel Dashboard에서 확인 (가장 확실)

1. [Vercel Dashboard](https://vercel.com/dashboard) 접속
2. 프로젝트 `1107-test` 선택
3. **Settings** → **Environment Variables** 클릭
4. 다음 변수들이 모두 설정되어 있는지 확인:

### 필수 Firebase Client 변수 (7개)
- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY`
- ✅ `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- ✅ `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- ✅ `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_APP_ID`
- ✅ `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### 필수 Firebase Admin SDK 변수 (3개)
- ✅ `FIREBASE_PROJECT_ID`
- ✅ `FIREBASE_CLIENT_EMAIL`
- ✅ `FIREBASE_PRIVATE_KEY`

**총 10개의 환경 변수가 모두 설정되어 있어야 합니다.**

---

## 방법 2: 배포된 사이트에서 확인

1. 브라우저에서 `1107-test.vercel.app` 접속
2. 개발자 도구 (F12) → Console 탭 열기
3. 다음 오류가 **없어야** 합니다:
   - ❌ `Cannot read properties of null (reading 'onAuthStateChanged')`
   - ❌ `Firebase: Error (auth/invalid-api-key)`
   - ❌ `Firebase 환경 변수가 설정되지 않았습니다`

4. 정상 작동 확인:
   - ✅ 페이지가 정상적으로 로드됨
   - ✅ 로그인 버튼 클릭 시 모달이 열림
   - ✅ 콘솔에 Firebase 관련 오류가 없음

---

## 방법 3: Vercel CLI로 확인 (로그인 필요)

```bash
# 1. Vercel CLI 로그인
vercel login

# 2. 환경 변수 목록 확인
vercel env ls

# 3. 특정 환경 변수 확인
vercel env ls NEXT_PUBLIC_FIREBASE_API_KEY
```

---

## 빠른 확인 체크리스트

- [ ] Vercel Dashboard에서 10개 환경 변수 모두 확인
- [ ] 각 변수가 Production, Preview, Development 모두에 설정되어 있는지 확인
- [ ] 최신 배포가 환경 변수 추가 후에 이루어졌는지 확인
- [ ] 배포된 사이트에서 콘솔 오류 없음
- [ ] 로그인 기능이 정상 작동함

---

## 문제 해결

### 환경 변수가 설정되지 않은 경우
1. Vercel Dashboard → Settings → Environment Variables
2. 누락된 변수 추가
3. Deployments → 최신 배포 → Redeploy

### 환경 변수는 설정했지만 오류가 계속되는 경우
1. 환경 변수 추가 후 **반드시 재배포** 필요
2. Deployments 탭에서 "Redeploy" 클릭
3. 또는 Git에 새로운 커밋 푸시

### 여전히 오류가 발생하는 경우
1. 브라우저 콘솔에서 정확한 오류 메시지 확인
2. 환경 변수 값이 올바른지 확인 (특히 `FIREBASE_PRIVATE_KEY`)
3. Vercel 배포 로그 확인 (Deployments → 최신 배포 → Build Logs)

