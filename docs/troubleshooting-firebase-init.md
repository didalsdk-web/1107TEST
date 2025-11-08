# Firebase 초기화 오류 해결 가이드

## 문제 상황
환경 변수를 설정하고 재배포했지만 여전히 "Firebase가 초기화되지 않았습니다" 오류가 발생합니다.

## 확인 사항

### 1. 환경 변수 설정 확인

Vercel Dashboard에서 확인:
1. **Settings** → **Environment Variables**
2. 다음 7개 변수가 모두 있는지 확인:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

3. 각 변수의 **Environment** 확인:
   - ✅ **Production** 체크되어 있는지
   - ✅ **Preview** 체크되어 있는지
   - ✅ **Development** 체크되어 있는지

### 2. 재배포 확인

환경 변수 추가 후 **반드시 재배포**가 필요합니다:

1. **Deployments** 탭 클릭
2. 최신 배포 확인
3. 환경 변수 추가 **이후**에 배포가 되었는지 확인
4. 환경 변수 추가 이전 배포라면:
   - 최신 배포 → **"..."** 메뉴 → **Redeploy** 클릭
   - 또는 Git에 새로운 커밋 푸시

### 3. 브라우저 캐시 클리어

1. **하드 리프레시**: `Ctrl + Shift + R` (또는 `Ctrl + F5`)
2. 또는 **시크릿 모드**에서 테스트
3. 또는 **캐시 삭제**:
   - `Ctrl + Shift + Delete`
   - "캐시된 이미지 및 파일" 선택
   - "지금 지우기"

### 4. 콘솔에서 환경 변수 확인

브라우저 개발자 도구 (F12) → Console 탭에서:

```javascript
// 환경 변수 확인
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
```

**예상 결과:**
- ✅ 정상: 실제 값이 표시됨
- ❌ 오류: `undefined` 표시됨

### 5. Vercel 빌드 로그 확인

1. Vercel Dashboard → **Deployments**
2. 최신 배포 클릭
3. **Build Logs** 확인
4. 환경 변수 관련 오류가 있는지 확인

## 해결 방법

### 방법 1: 환경 변수 재확인 및 재배포

1. Vercel Dashboard → Settings → Environment Variables
2. 각 변수 클릭하여 값 확인
3. 값이 올바른지 확인
4. **Deployments** → 최신 배포 → **Redeploy**

### 방법 2: 환경 변수 삭제 후 재추가

1. 기존 환경 변수 삭제
2. 새로 추가 (이름과 값 정확히 확인)
3. 재배포

### 방법 3: Git 커밋으로 재배포 트리거

```bash
git commit --allow-empty -m "trigger redeploy for env vars"
git push origin main
```

### 방법 4: 환경 변수 이름 확인

**정확한 이름 확인:**
- ✅ `NEXT_PUBLIC_FIREBASE_API_KEY` (올바름)
- ❌ `NEXT_PUBLIC_FIREBASE_APIKEY` (잘못됨)
- ❌ `FIREBASE_API_KEY` (잘못됨 - `NEXT_PUBLIC_` 접두사 필요)

## 체크리스트

- [ ] 7개 환경 변수 모두 설정됨
- [ ] 각 변수가 Production, Preview, Development 모두에 설정됨
- [ ] 환경 변수 값이 올바름 (오타 없음)
- [ ] 환경 변수 추가 후 재배포 완료
- [ ] 브라우저 하드 리프레시 완료
- [ ] 콘솔에서 환경 변수 값 확인 완료

## 추가 디버깅

### Next.js 빌드 확인

Vercel 빌드 로그에서:
- `NEXT_PUBLIC_*` 변수가 빌드 시점에 포함되었는지 확인
- 빌드 오류가 없는지 확인

### 네트워크 탭 확인

1. 개발자 도구 → **Network** 탭
2. 페이지 새로고침
3. JavaScript 파일들이 최신 버전인지 확인
4. 404 오류가 없는지 확인

## 여전히 문제가 발생하는 경우

1. **Vercel 지원팀 문의**
2. **환경 변수 스크린샷 확인** (값은 가리기)
3. **빌드 로그 전체 확인**

