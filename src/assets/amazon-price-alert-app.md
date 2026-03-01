# Amazon 가격 알림 앱 (React Native)

## 📌 프로젝트 개요

Amazon 상품의 가격 변동을 자동으로 감지하고  
사용자가 설정한 목표 가격에 도달하면 푸시 알림을 보내주는 모바일 앱입니다.

사용자는 상품 URL과 목표 가격만 입력합니다.  
가격 조회, 목표가 도달 판단, 알림 발송은 모두 서버에서 처리됩니다.

---

## 🎯 개발 목적

Amazon은 가격 변동이 매우 잦습니다.

- 시즌 할인
- 재고 변화
- 환율 영향

예를 들어 100달러짜리 상품이 79달러로 떨어져도  
사용자가 매일 직접 확인하지 않으면 놓칠 수 있습니다.

이 프로젝트는 "가격 감시 자동화"를 목표로 설계되었습니다.

---

## 🏗 전체 아키텍처

React Native App  
→ Supabase Auth (로그인)  
→ API Gateway → AWS Lambda  
→ Supabase DB  
→ EventBridge Cron (10분마다 가격 조회)  
→ 목표가 도달 시 Firebase Cloud Messaging 발송  
→ 앱에서 푸시 수신  

프론트엔드는 입력 및 실시간 UI 반영을 담당하고,  
비즈니스 로직은 모두 백엔드에서 처리하도록 책임을 분리했습니다.

---

## 🛠 사용 기술

### Frontend
- React Native
- Supabase Auth
- Supabase Realtime
- Firebase Cloud Messaging
- React Navigation

### Backend (연동 구조 이해)
- AWS Lambda
- API Gateway
- EventBridge Cron
- Supabase
- FCM

---

## 👨‍💻 내가 구현한 기능 (Frontend)

### 1. 인증 시스템
- 이메일/비밀번호 회원가입
- 로그인
- 세션 유지
- 로그아웃 처리

### 2. FCM 연동
- 앱 실행 시 디바이스 토큰 발급
- 토큰을 서버에 전달
- 목표가 도달 시 푸시 알림 수신

### 3. 상품 등록 화면
- Amazon 상품 URL 입력
- 목표 가격 설정
- API Gateway로 POST 요청

### 4. 목표가 설정 관리
- threshold 수정
- 알림 on/off 토글
- 기존 설정값 로딩

### 5. 실시간 가격 반영
- Supabase Realtime 구독
- price_history 변경 시 UI 즉시 업데이트

---

## 🗄 데이터 구조 (개념)

### users
- id
- email

### products
- id
- user_id
- url
- current_price
- threshold
- notification_enabled

### price_history
- id
- product_id
- price
- created_at

---

## ⚙ 트러블슈팅

### 1. FCM 토큰 갱신 문제
앱 재설치 시 토큰이 변경되어 알림이 발송되지 않는 문제가 발생했습니다.  
→ 기존 토큰 갱신 로직을 추가하여 해결했습니다.

### 2. Realtime 중복 구독
Subscription cleanup을 하지 않아 중복 렌더링 발생  
→ useEffect cleanup 처리로 해결

### 3. 중복 API 요청
빠른 연속 클릭 시 중복 요청 발생  
→ 로딩 상태 및 debounce 처리

---

## 📈 확장 가능성

- Keepa API 연동
- 가격 그래프 시각화
- 다국가 Amazon 지원
- 가격 예측 모델 도입

---

## 🧠 프로젝트 특징

- 단순 CRUD 앱이 아닌 이벤트 기반 아키텍처
- 모바일 푸시 알림 전체 플로우 구현 경험
- 실시간 데이터 흐름 설계
- 서버리스 구조 이해

---

## 🔚 정리

사용자는 “목표 가격 설정”만 합니다.  
이후의 가격 감시와 알림은 시스템이 자동으로 처리합니다.

이 프로젝트를 통해  
모바일 앱 + 서버리스 아키텍처 + 실시간 데이터 흐름을  
실무 수준으로 경험했습니다.