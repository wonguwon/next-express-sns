# node-sns

Next.js와 Express 기반의 풀스택 SNS 웹 애플리케이션입니다.

## 기술 스택

### Frontend
- **Next.js** 11 — SSR 및 라우팅
- **React** 17 + **Redux** + **Redux-Saga** — 상태 관리 및 비동기 처리
- **Ant Design** 4 — UI 컴포넌트
- **styled-components** — 커스텀 스타일링

### Backend
- **Node.js** + **Express** 4 — REST API 서버 (포트 3065)
- **Sequelize** 6 + **MySQL2** — ORM 및 데이터베이스
- **bcrypt** — 비밀번호 암호화
- **cors** — CORS 처리

## 프로젝트 구조

```
NodeBird-sns/
├── front/                  # Next.js 프론트엔드
│   ├── components/         # 재사용 컴포넌트
│   ├── pages/              # 페이지 라우트
│   ├── reducers/           # Redux 리듀서
│   ├── sagas/              # Redux-Saga 비동기 처리
│   ├── store/              # Redux 스토어 설정
│   └── hooks/              # 커스텀 훅
└── back/                   # Express 백엔드
    ├── models/             # Sequelize 모델 (User, Post, Comment, Image, Hashtag)
    ├── routes/             # API 라우터
    └── config/             # DB 설정
```

## 주요 기능

- 회원가입 / 로그인 / 로그아웃
- 게시글 작성 / 수정 / 삭제
- 댓글 작성
- 이미지 업로드 및 슬라이드 뷰
- 팔로우 / 언팔로우
- 해시태그
- 무한 스크롤

## 시작하기

### 사전 요구사항

- Node.js
- MySQL

### 백엔드 실행

```bash
cd back
npm install
# back/config/config.json에 DB 접속 정보 설정
npm run dev
```

백엔드 서버는 `http://localhost:3065`에서 실행됩니다.

### 프론트엔드 실행

```bash
cd front
npm install
npm run dev
```

프론트엔드는 `http://localhost:3060`에서 실행됩니다.

### DB 설정

`back/config/config.json`의 `development` 항목에 MySQL 접속 정보를 입력합니다.

```json
{
  "development": {
    "username": "root",
    "password": "your_password",
    "database": "your_database",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```
