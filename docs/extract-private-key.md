# Firebase Private Key 추출 가이드

## JSON 파일에서 Private Key 추출하기

### 1단계: JSON 파일 열기
1. 다운로드한 파일: `test-11872-firebase-adminsdk-fbsvc-d1284f2d82.json`
2. 메모장 또는 텍스트 에디터로 열기

### 2단계: private_key 값 찾기
JSON 파일은 다음과 같은 구조입니다:

```json
{
  "type": "service_account",
  "project_id": "test-11872",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2XCLhXEHFdhX5\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@test-11872.iam.gserviceaccount.com",
  ...
}
```

### 3단계: private_key 값 복사
1. `"private_key":` 다음의 값 찾기
2. **따옴표 안의 값 전체** 복사
   - 시작: `-----BEGIN PRIVATE KEY-----`
   - 끝: `-----END PRIVATE KEY-----\n`
   - **따옴표(`"`)는 제외하고 값만 복사**

### 4단계: Vercel에 입력
1. Vercel Dashboard → Settings → Environment Variables
2. Key: `FIREBASE_PRIVATE_KEY`
3. Value: 복사한 값 붙여넣기
4. Environment: Production, Preview, Development 모두 선택
5. Add 클릭

## 주의사항

- ✅ **따옴표 제외**: `"private_key": "값"` 에서 따옴표는 제외하고 값만 복사
- ✅ **전체 키 복사**: `-----BEGIN PRIVATE KEY-----` 부터 `-----END PRIVATE KEY-----` 까지 전체
- ✅ **줄바꿈 유지**: 여러 줄로 되어 있어도 그대로 복사 (Vercel이 자동 처리)
- ❌ **따옴표 포함 금지**: `"-----BEGIN..."` 처럼 따옴표 포함하지 말 것

## 예시

복사할 값 예시:
```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2XCLhXEHFdhX5
lvAxg8LbB2U+VDmd4SFovgsWaXU+n9UqrdlH5OVP79ithiVPJkkROh4lrlbzCCJL
...
-----END PRIVATE KEY-----
```

이 전체를 Vercel의 Value 필드에 붙여넣으면 됩니다.

