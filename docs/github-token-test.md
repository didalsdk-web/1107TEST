# GitHub 토큰 테스트 가이드

## 테스트 방법

1. 브라우저에서 `http://localhost:3001` 접속
2. 상단 네비게이션바의 **"로그인"** 버튼 클릭
3. **"GitHub"** 탭 선택
4. GitHub Personal Access Token 입력:
   ```
   [여기에 GitHub 토큰을 입력하세요]
   ```
5. **"GitHub로 로그인"** 버튼 클릭

## 예상 결과

✅ **성공 시:**
- 모달이 닫히고
- 헤더에 GitHub 사용자 정보 표시
- 로그아웃 버튼 표시

❌ **실패 시:**
- 에러 메시지 표시
- 브라우저 콘솔(F12)에서 상세 오류 확인

## 문제 해결

### "Firebase Admin SDK 설정을 찾을 수 없습니다" 오류:
- `code/lib/firebase-service-account.json` 파일이 있는지 확인
- 또는 `.env.local`에 Firebase Admin SDK 환경 변수 설정

### "GitHub API 오류" 오류:
- 토큰이 유효한지 확인
- 토큰에 `read:user`, `user:email` 권한이 있는지 확인

### 서버 오류:
- 개발 서버 콘솔에서 오류 메시지 확인
- `code/app/api/auth/github-token/route.ts` 파일 확인

## 보안 주의사항

⚠️ **중요**: 이 토큰이 노출되었으므로:
1. 테스트 후 GitHub에서 토큰 삭제 권장
2. 새로운 토큰 생성 시 더 안전하게 관리
3. 프로덕션에서는 절대 토큰을 공유하지 마세요

## 다음 단계

토큰으로 로그인이 성공하면:
- Firebase Console에서 사용자 확인
- Firestore에 사용자 데이터 저장 확인

