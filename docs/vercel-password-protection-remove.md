# Vercel 배포 보호 제거 가이드

Vercel 로그인 페이지가 나타나는 문제를 해결하는 방법입니다.

## 원인

Vercel의 **Deployment Protection** 또는 **Password Protection**이 활성화되어 있을 때 발생합니다.

## 해결 방법

### 방법 1: Vercel Dashboard에서 제거 (권장)

1. **Vercel Dashboard 접속**
   - https://vercel.com/dashboard
   - 프로젝트 `1107-test` 선택

2. **Settings → Deployment Protection**
   - 왼쪽 메뉴에서 **Settings** 클릭
   - **Deployment Protection** 섹션 찾기

3. **보호 설정 확인 및 제거**
   - **Password Protection**이 활성화되어 있는지 확인
   - 활성화되어 있다면 **비활성화** 또는 **Remove** 클릭
   - **Vercel Authentication**이 활성화되어 있는지 확인
   - 활성화되어 있다면 **비활성화**

4. **변경사항 저장**
   - 설정 변경 후 자동으로 적용됩니다
   - 페이지 새로고침하여 확인

### 방법 2: Vercel CLI로 확인

```bash
# 프로젝트 설정 확인
vercel project ls

# 배포 보호 설정 확인 (프로젝트 설정 파일 확인)
```

### 방법 3: 프로젝트 설정 확인

Vercel Dashboard에서:
1. **Settings → General**
2. **Deployment Protection** 섹션 확인
3. 모든 보호 옵션이 **비활성화**되어 있는지 확인

## 설정 옵션 설명

### Password Protection
- 배포에 비밀번호를 설정하여 접근 제한
- **비활성화 권장** (공개 사이트의 경우)

### Vercel Authentication
- Vercel 계정 로그인을 통한 접근 제한
- **비활성화 권장** (공개 사이트의 경우)

### Preview Deployment Protection
- Preview 배포만 보호 (Production은 공개)
- 필요에 따라 설정

## 확인 방법

설정 변경 후:
1. 브라우저에서 `1107-test.vercel.app` 접속
2. 로그인 페이지 없이 바로 홈페이지가 표시되는지 확인
3. 시크릿 모드에서도 테스트 (캐시 문제 제외)

## 주의사항

- **개발/테스트 환경**에서는 보호를 비활성화하는 것이 일반적입니다
- **프로덕션 환경**에서도 공개 사이트라면 보호를 비활성화해야 합니다
- 보호가 필요한 경우, 특정 경로만 보호하는 방법을 고려하세요

## 추가 확인 사항

만약 위 방법으로 해결되지 않는다면:

1. **Vercel Team 설정 확인**
   - Team Settings → Security
   - Team-level 보호 설정 확인

2. **도메인 설정 확인**
   - Settings → Domains
   - 커스텀 도메인 사용 시 별도 설정 확인

3. **Vercel 지원팀 문의**
   - 문제가 계속되면 Vercel 지원팀에 문의

