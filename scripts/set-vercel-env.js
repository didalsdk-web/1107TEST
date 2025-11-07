#!/usr/bin/env node

/**
 * Vercel 환경 변수 설정 스크립트
 * 
 * 사용법: node scripts/set-vercel-env.js
 */

const { execSync } = require('child_process');

const envVars = {
  // Firebase Client 설정
  'NEXT_PUBLIC_FIREBASE_API_KEY': 'AIzaSyArYOgefr-JAtJGA1mbCAhtzrxDbR7d2SY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN': 'test-11872.firebaseapp.com',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID': 'test-11872',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET': 'test-11872.firebasestorage.app',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID': '61366963523',
  'NEXT_PUBLIC_FIREBASE_APP_ID': '1:61366963523:web:48a7bc9d95a71154c7f3f6',
  'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID': 'G-QV76678XGG',
  
  // Firebase Admin SDK 설정
  'FIREBASE_PROJECT_ID': 'test-11872',
  'FIREBASE_CLIENT_EMAIL': 'firebase-adminsdk-fbsvc@test-11872.iam.gserviceaccount.com',
  'FIREBASE_PRIVATE_KEY': '-----BEGIN PRIVATE KEY-----\\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2XCLhXEHFdhX5\\nlvAxg8LbB2U+VDmd4SFovgsWaXU+n9UqrdlH5OVP79ithiVPJkkROh4lrlbzCCJL\\nKGmR+qAJUcuvFpaffmwlHZ7cj33eGg8X3j1VlagorcLWFuM/Z6hWzJHOwozDNXlB\\nvbIER2jbFyN5qrJa6KyQIAOVOBIfKe99hqQ65LtnFV9e1owrVztIg7FAoh1OBemk\\nw2FnsqwyRWTh8JuGtUF6oU8ylWixKNtERZppMd+jKzsYhx73zC+UUaPrHyINIBbx\\nERSwndgB0FsPRHfTbJrune700TVWEJcpjZIhgroXtFXH5I3Aez5Icl4PSDy4Djo/\\nUWYT9qjtAgMBAAECggEAFzywWSUnYGEGtdIs8zJF/yD3HrUezmZkmnM0+HshrIQz\\nZofWmxmousHmS14/nNFVGDPeqZCIldlgfVE9+pMEF4vrt3jaYqJ6Z1RZ7OL/9/A8\\nIh94k1JJpj1WCW/LL0YnJkBVCBK0Wx+SPvVMHM14qApPw+4jYgAqFQdvTXFipcO8\\nJx5YL1Djs8y8jla/F40m7guyJUG7wGknySVkaKP8PfWCdGlPqBxjxfZ0gHfPzt61\\nda5mqQCfrqRt8pA/weprHsSQYF3wNB/MtA0Qc0gMZmsJTcXOWnaWZCMObf03KGjM\\n+r2i2zMISrvnL7rOI1y3XNt5+pDOqLgHUe2i86vl5QKBgQDYcq7sAw16RiRzMRl4\\nqMJfIAbHU6zz4xrwver448oLJ+Ipuv/K7q96cHToCkvLWfK6ZeuIvoAYw03dCAZY\\nCp7r/057JZs5F0lBg31olQG5/5yyLFWoOpoHNixCFShAEDt1eAlh3c/hubJ1aKQ9\\nmXJseie+MSW3o5/o+KkrwIJajwKBgQDXrtTrssPhP9PxU46+R6+Ltp21chiZRfs+\\nerg78R7UqlKKw/5U409SijZh2z3tNOxcwam7HYT4CXXL9oBmPErAxXzTF8ie/OPG\\ngO1iV18vUHs3j4xATqOmD4VuLsqc4A8mTkRoZhjRwL27mOneuUtB5MQ86XvXdt+t\\ns8J44ihywwKBgQDEqw+9atioLWuZLxfRxqU2Acem/aS8xbII5MfH9lHy6P5apIsf\\nPNk9C0luPUy5LLWcIFdvHIkP9wWcvFnnTV8xV/1bb8Qmj74ERRGCIUI8WsFqM1Zx\\nUS37N4HnWYoFC7q69aKwxfbJRw2cGMSDJBYP8r6B1e5LeeUmriookvbeiQKBgAVM\\nbDqmF53O/ZvuG5GdHTjncZRliykoyPVN+nyufb1nucNi8TqQowA6GP/qbOkI5c2Z\\njFvma7/UK6qpEZpxXLzDnT9qVCljuQzFWg+Saeo1pfFFe4KQ7ABGXVbJm3yjHHwq\\nbA/MgkuU2pRjO0uXbbverNt6OOqgJvqTcfGaTLgVAoGAZpPK8yzHrS4XWHE5xHUw\\noIGxXEE0xB2FH1OSUOUOGp3PE/8ZzcBjSBhEhwClDaUquadxUaoAmXn1qFDPiSp7\\nYljQCoGsk8WokoWbFgU8HyoeikJPFE42kvLAtnygEBWLkpjy7/ErLj6uuULyXL8v\\nk20kKGs4gdaChWnemIEqegw=\\n-----END PRIVATE KEY-----\\n',
};

console.log('🚀 Vercel 환경 변수 설정 시작...\n');

// 환경 변수 설정
for (const [key, value] of Object.entries(envVars)) {
  try {
    console.log(`📝 설정 중: ${key}...`);
    
    // Production, Preview, Development 모두에 설정
    const environments = ['production', 'preview', 'development'];
    
    for (const env of environments) {
      try {
        // 기존 변수 삭제 (있을 경우)
        try {
          execSync(`vercel env rm ${key} ${env} --yes`, { stdio: 'ignore' });
        } catch (e) {
          // 변수가 없으면 무시
        }
        
        // 새 변수 추가
        const command = `echo "${value}" | vercel env add ${key} ${env}`;
        execSync(command, { stdio: 'inherit' });
        console.log(`  ✅ ${env} 환경에 설정 완료`);
      } catch (error) {
        console.error(`  ❌ ${env} 환경 설정 실패:`, error.message);
      }
    }
    
    console.log(`✅ ${key} 설정 완료\n`);
  } catch (error) {
    console.error(`❌ ${key} 설정 실패:`, error.message);
  }
}

console.log('🎉 모든 환경 변수 설정 완료!');
console.log('\n📦 재배포를 시작합니다...\n');

// 재배포
try {
  execSync('vercel --prod', { stdio: 'inherit' });
  console.log('\n✅ 재배포 완료!');
} catch (error) {
  console.error('\n❌ 재배포 실패:', error.message);
  console.log('\n💡 Vercel Dashboard에서 수동으로 재배포해주세요.');
}

