# J.ONE GOLF PWA

확정 구조
1. HOME — 사용자가 지정한 원본 이미지 + 프로필 요약
2. LESSON & TOUR — 한 페이지
3. BOOKING — 예약 신청
4. ADMIN — 관리자 페이지

관리자 데모 로그인
- ID: admin
- PW: 1234

현재 1차 구현은 localStorage 기반입니다.
다음 실배포 단계에서는 Supabase 연결을 권장합니다:
- 관리자 인증
- 예약 데이터 실시간 저장
- 여러 기기 동기화
- 사진/콘텐츠 업로드 및 관리

중요: `assets/home-hero.png`는 사용자가 지정한 원본 파일을 그대로 사용했습니다.
