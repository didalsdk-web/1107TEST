# GitHub 로그인 기능 복구 가이드

이 문서는 보관 중인 GitHub 로그인 기능을 다시 활성화하는 방법을 안내합니다.

## 📋 현재 상태

**보관된 파일들:**
- ✅ `hooks/use-github-auth.ts` - GitHub 인증 React Hook
- ✅ `app/api/auth/github-token/route.ts` - GitHub 토큰 인증 API Route
- ✅ `docs/github-*.md` - 관련 문서들

**비활성화된 부분:**
- ❌ Header 컴포넌트의 GitHub 탭 UI
- ❌ GitHub 토큰 입력 폼
- ❌ GitHub 로그인 핸들러

---

## 🔧 복구 단계

### 1단계: Header 컴포넌트 수정

`components/header.tsx` 파일을 열고 다음을 수정:

#### 1-1. Import 추가
```typescript
// 주석 해제
import { useGitHubAuth } from "@/hooks/use-github-auth"
```

#### 1-2. State 추가
```typescript
// 주석 해제
const [githubToken, setGithubToken] = useState("")
```

#### 1-3. Hook 사용
```typescript
// 주석 해제
const { loginWithGitHubToken: loginWithGitHub, user: githubUser } = useGitHubAuth()
const currentUser = githubUser || user
const isUserAuthenticated = !!currentUser
```

#### 1-4. 탭 레이아웃 변경
```typescript
// grid-cols-2를 grid-cols-3로 변경
<TabsList className="grid w-full grid-cols-3 bg-[#2c2c54]">
```

#### 1-5. GitHub 탭 추가
```typescript
// GitHub TabsTrigger 주석 해제
<TabsTrigger 
  value="github" 
  className="data-[state=active]:bg-primary data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-white/60 data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-white/10 transition-colors"
>
  GitHub
</TabsTrigger>
```

#### 1-6. GitHub TabsContent 추가
```typescript
// GitHub TabsContent 주석 해제
<TabsContent value="github" className="mt-4">
  {/* ... GitHub 토큰 입력 폼 ... */}
</TabsContent>
```

#### 1-7. 핸들러 함수 추가
```typescript
// handleGitHubLogin 함수 주석 해제
const handleGitHubLogin = async (e: React.FormEvent) => {
  // ... 기존 코드 ...
}
```

#### 1-8. 사용자 인증 로직 변경
```typescript
// isAuthenticated를 isUserAuthenticated로 변경
{isUserAuthenticated ? (
  // ...
) : (
  // ...
)}
```

---

### 2단계: 환경 변수 확인

Vercel Dashboard에서 다음 환경 변수가 설정되어 있는지 확인:

**필수 환경 변수:**
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

**설정 방법:**
1. Vercel Dashboard → 프로젝트 → Settings → Environment Variables
2. 위 변수들이 Production, Preview, Development에 모두 설정되어 있는지 확인
3. 없으면 추가 후 재배포

---

### 3단계: 테스트

1. **로컬 테스트:**
   ```bash
   npm run dev
   ```

2. **GitHub 토큰 생성:**
   - GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - "Generate new token (classic)" 클릭
   - 권한 선택: `read:user`, `user:email`
   - 토큰 생성 후 복사

3. **로그인 테스트:**
   - 웹사이트에서 "로그인" 버튼 클릭
   - "GitHub" 탭 선택
   - 생성한 토큰 입력
   - "GitHub로 로그인" 클릭

---

## ⚠️ 주의사항

### 보안
- GitHub Personal Access Token은 민감한 정보입니다
- 토큰은 서버 사이드에서만 처리되어야 합니다
- 클라이언트에 토큰이 저장되지 않도록 주의

### Firebase Admin SDK
- GitHub 인증을 사용하려면 Firebase Admin SDK가 필요합니다
- 환경 변수가 올바르게 설정되어 있어야 합니다
- 자세한 설정은 `docs/firebase-admin-setup.md` 참고

### API Route
- `/api/auth/github-token` API Route가 정상 작동해야 합니다
- 서버 사이드에서만 실행되므로 빌드 시 오류가 없어야 합니다

---

## 🔍 문제 해결

### 문제: "Firebase Admin SDK가 설정되지 않았습니다"
**해결:**
1. Vercel 환경 변수 확인
2. `FIREBASE_PRIVATE_KEY`에 `\n` 문자가 올바르게 포함되어 있는지 확인
3. 재배포

### 문제: "GitHub 인증 실패"
**해결:**
1. GitHub 토큰이 유효한지 확인
2. 토큰에 `read:user`, `user:email` 권한이 있는지 확인
3. 토큰이 만료되지 않았는지 확인

### 문제: 탭이 표시되지 않음
**해결:**
1. `grid-cols-2`를 `grid-cols-3`로 변경했는지 확인
2. GitHub TabsTrigger 주석이 해제되었는지 확인
3. 브라우저 캐시 클리어

---

## 📚 관련 문서

- `docs/github-auth-setup.md` - GitHub 인증 설정 가이드
- `docs/github-token-auth-implementation.md` - 구현 상세 설명
- `docs/firebase-admin-setup.md` - Firebase Admin SDK 설정
- `docs/github-auth-removal-analysis.md` - 제거 분석 문서

---

## ✅ 체크리스트

복구 완료 후 확인:

- [ ] Header 컴포넌트에 GitHub 탭이 표시됨
- [ ] GitHub 토큰 입력 폼이 정상 작동
- [ ] GitHub 로그인 성공
- [ ] 사용자 정보가 올바르게 표시됨
- [ ] 로그아웃 기능 정상 작동
- [ ] Vercel 환경 변수 설정 완료
- [ ] 프로덕션 배포 테스트 완료

---

**마지막 업데이트:** 2024년 (GitHub 인증 기능 보관 시점)

