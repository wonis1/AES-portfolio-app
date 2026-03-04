# AES Portfolio App

AutoEver 1차 프로젝트 포트폴리오 웹앱입니다.  
프로젝트 목록/상세 조회와 댓글 CRUD 기능을 제공합니다.

## Release

- Current Release: `v1.0.0`
- Release Date: `2026-03-04`

## Tech Stack

- React 19 + TypeScript + Vite
- React Router
- TanStack Query
- Supabase (DB/API)

## Main Features

- 홈 화면 섹션 구성: Intro / About / Skills / Projects / Career
- 프로젝트 카드 목록 조회
- 프로젝트 상세 문서(Markdown) 렌더링
- 댓글 등록/수정/삭제/조회
- 존재하지 않는 경로/프로젝트 Not Found 처리

## Environment Variables

`.env` 파일에 아래 값을 설정해야 합니다.

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

```bash
npm install
npm run dev
```

기본 개발 서버: `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  api/                 # Supabase 연동 및 데이터 조회/수정
  app/                 # 앱 엔트리, 전역 스타일, 라우팅 루트
  assets/              # 이미지, 아이콘, 폰트, 프로젝트 상세 markdown
  components/
    ui/                # 재사용 UI 컴포넌트
    styles/            # UI 컴포넌트 스타일
  pages/
    home/              # 메인 페이지
    projectDetails/    # 프로젝트 상세 + 댓글
    notFound/          # 404 페이지
```

## Data Onboarding

새 프로젝트 데이터 추가는 [PROJECT_ONBOARDING.md](./PROJECT_ONBOARDING.md)를 따릅니다.
