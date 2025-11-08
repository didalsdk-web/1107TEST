# Edge 브라우저 오류 해결 가이드

Edge 브라우저에서 "Application error: a client-side exception has occurred" 오류가 발생하는 경우 해결 방법입니다.

## 원인

1. **브라우저 캐시 문제**: Edge가 오래된 JavaScript 번들을 캐시하고 있을 수 있습니다.
2. **환경 변수 로딩 문제**: 빌드 시점과 런타임의 환경 변수 불일치
3. **Service Worker 캐시**: PWA나 Service Worker가 활성화된 경우

## 해결 방법

### 방법 1: Edge 브라우저 캐시 클리어 (가장 빠른 해결)

1. **Edge 브라우저 열기**
2. **Ctrl + Shift + Delete** 키 누르기
3. **캐시된 이미지 및 파일** 선택
4. **지금 지우기** 클릭
5. 페이지 새로고침 (F5 또는 Ctrl + R)

또는:

1. **F12** 키로 개발자 도구 열기
2. **네트워크** 탭 클릭
3. **캐시 비활성화** 체크박스 선택
4. 페이지 새로고침

### 방법 2: 시크릿 모드에서 테스트

1. **Ctrl + Shift + N** (또는 Edge 메뉴 → 새 InPrivate 창)
2. `1107-test.vercel.app` 접속
3. 정상 작동하는지 확인

시크릿 모드에서 작동하면 캐시 문제입니다.

### 방법 3: 하드 리프레시

1. **Ctrl + Shift + R** (또는 **Ctrl + F5**)
2. 또는 **Shift + 새로고침 버튼** 클릭

### 방법 4: Edge 설정 초기화

1. Edge 설정 → **개인 정보, 검색 및 서비스**
2. **인터넷 사용 기록 삭제** 클릭
3. **캐시된 이미지 및 파일** 선택
4. **지금 지우기**

### 방법 5: Vercel 재배포

캐시 문제가 아니라면:

1. Vercel Dashboard → 프로젝트
2. **Deployments** 탭
3. 최신 배포 → **"..."** 메뉴 → **Redeploy**

## 확인 사항

### 1. 환경 변수 확인
- Vercel Dashboard → Settings → Environment Variables
- 모든 `NEXT_PUBLIC_*` 변수가 설정되어 있는지 확인
- 환경 변수 추가 후 **반드시 재배포** 필요

### 2. 브라우저 콘솔 확인
1. **F12** → **Console** 탭
2. 다음 오류가 있는지 확인:
   - `Cannot read properties of null`
   - `Firebase: Error (auth/invalid-api-key)`
   - `Firebase 환경 변수가 설정되지 않았습니다`

### 3. 네트워크 탭 확인
1. **F12** → **Network** 탭
2. 페이지 새로고침
3. JavaScript 파일들이 최신 버전인지 확인
4. 404 오류나 로딩 실패가 있는지 확인

## 예방 방법

1. **정기적인 캐시 클리어**: 개발 중에는 캐시를 비활성화하는 것이 좋습니다.
2. **하드 리프레시 사용**: 변경사항 확인 시 Ctrl + Shift + R 사용
3. **시크릿 모드 테스트**: 배포 후 시크릿 모드에서 테스트하여 캐시 문제 확인

## 추가 디버깅

### Edge 개발자 도구에서 확인

1. **F12** → **Console** 탭
2. 다음 명령어로 환경 변수 확인:
```javascript
// Firebase 초기화 확인
console.log('API Key:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log('Project ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)
```

### Vercel 배포 로그 확인

1. Vercel Dashboard → **Deployments**
2. 최신 배포 클릭
3. **Build Logs** 확인
4. 환경 변수 관련 오류가 있는지 확인

## 여전히 문제가 발생하는 경우

1. **다른 브라우저에서 테스트** (Chrome, Firefox)
2. **다른 네트워크에서 테스트** (모바일 핫스팟 등)
3. **Vercel 지원팀에 문의**

## 참고

- Chrome에서는 정상 작동하지만 Edge에서만 문제가 발생하면 **캐시 문제**일 가능성이 높습니다.
- Error Boundary가 추가되어 오류 발생 시 더 명확한 메시지를 볼 수 있습니다.

