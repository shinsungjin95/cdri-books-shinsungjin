# CDRI 프론트 사전과제

React와 TypeScript를 기반으로 개발하였으며, 단순한 기능 구현을 넘어 컴포넌트의 재사용성, 상태 관리의 일관성, 데이터 요청의 효율성 및 서비스 확장성을 고려하여 설계하였습니다.

## 1. 프로젝트 개요

- 도서 검색 및 상세 검색
- 최근 검색어 조회 및 삭제
- 도서 상세 정보 조회 및 구매 페이지 이동
- 도서 찜 등록 및 해제
- 찜한 도서 목록 조회
- 무한 스크롤 기반 목록 조회
- 공통 모달, 로딩 및 API 에러 처리

## 2. 기술 스택

| 구분 | 기술 |
| --- | --- |
| Framework / Library | React |
| Language | TypeScript |
| Build Tool | Vite |
| Server State | TanStack Query (React Query) |
| Client State | Redux Toolkit |
| HTTP Client | Axios |
| Routing | React Router DOM |
| Styling | styled-components |
| UI Library | react-select |
| Animation | react-transition-group |
| Storage | LocalStorage |
| Package Manager | Yarn |
| External API | Kakao Book API |

## 3. 실행 방법 및 환경 설정

### 프로젝트 설치

```bash
git clone https://github.com/shinsungjin95/cdri-books-shinsungjin.git

cd cdri-books-shinsungjin

yarn install
```

### 환경 변수 설정

프로젝트 루트 경로에 `.env` 파일을 생성한 후 Kakao REST API Key를 설정합니다.

```env
VITE_KAKAO_REST_API_KEY=XXXXXXXXXXXX
```

실제 API Key가 포함된 `.env` 파일은 `.gitignore`에 등록하여 GitHub 저장소에 포함되지 않도록 관리하였습니다.

### 개발 서버 실행

```bash
yarn dev
```

### 프로덕션 빌드

```bash
yarn build
```

## 4. 프로젝트 폴더 구조

```text
src/
├── api/
│   ├── axios/
│   │   └── instance.ts
│   ├── book/
│   │   ├── hooks.ts
│   │   ├── index.ts
│   │   └── types.ts
│   └── query/
│       ├── client.ts
│       └── provider.tsx
│
├── common/
│   └── components/
│       ├── Button/
│       │   └── index.tsx
│       ├── Header/
│       │   └── index.tsx
│       ├── Loading/
│       │   ├── index.tsx
│       │   ├── LoadingItems.tsx
│       │   └── ScrollLoading.tsx
│       └── Modal/
│           ├── items/
│           │   └── SearchDetailBookModal.tsx
│           ├── controller.tsx
│           ├── hooks.ts
│           ├── index.tsx
│           ├── style.tsx
│           └── types.ts
│
├── constants/
│   ├── index.ts
│   └── Modal.ts
│
├── pages/
│   ├── book/
│   │   ├── components/
│   │   │   ├── BookTitle.tsx
│   │   │   ├── EmptyBook.tsx
│   │   │   ├── ListBookItem.tsx
│   │   │   └── ResultCount.tsx
│   │   ├── list/
│   │   │   └── index.tsx
│   │   └── save/
│   │       └── index.tsx
│   └── error/
│       └── index.tsx
│
├── redux/
│   ├── slice/
│   │   ├── favoriteSlice.ts
│   │   └── modalSlice.ts
│   ├── hook.ts
│   └── store.ts
│
├── routes/
│   ├── root/
│   │   └── index.tsx
│   └── router/
│       └── index.tsx
│
├── styles/
│   ├── global/
│   │   └── index.ts
│   └── theme/
│       ├── index.ts
│       └── type.ts
│
├── utils/
│   └── book/
│       └── index.ts
│
├── App.tsx
└── main.tsx
```

### 주요 디렉터리 역할

| 디렉터리 | 역할 |
| --- | --- |
| `api/axios` | Axios 인스턴스 및 공통 HTTP 요청 설정 관리 |
| `api/book` | 도서 검색 API 요청 함수, Query Hook 및 데이터 타입 관리 |
| `api/query` | QueryClient 설정, 캐싱 정책, 공통 API 에러 처리 및 Provider 관리 |
| `common/components` | 애플리케이션 전역에서 재사용 가능한 공통 UI 컴포넌트 관리 |
| `constants` | 라우팅 경로, 스토리지 키, API 에러 메시지 및 모달 호출 설정 관리 |
| `pages/book/components` | 도서 검색 및 찜 목록 페이지에서 공통으로 사용하는 도메인 전용 컴포넌트 관리 |
| `pages/book/list` | 일반 검색, 상세 검색, 최근 검색어 및 도서 검색 결과 관리 |
| `pages/book/save` | 찜한 도서 목록 조회 및 찜 상태 관리 |
| `pages/error` | 라우팅 오류에 대한 에러 페이지 관리 |
| `redux` | Redux Store, 타입이 지정된 Redux Hook 및 전역 상태 관리 |
| `routes` | 페이지 라우팅 설정 및 공통 레이아웃 관리 |
| `styles` | 전역 스타일, 디자인 테마 및 스타일 타입 관리 |
| `utils/book` | 최근 검색어, 도서 식별, 찜 상태 변경 및 LocalStorage 관련 공통 로직 관리 |


### 디렉터리 설계 방향

기능과 책임을 기준으로 디렉터리를 구분하여 코드의 가독성과 유지보수성을 고려하였습니다.

- **API 계층 분리**: HTTP 통신 설정, 도메인별 API 요청, 서버 상태 관리 설정을 각각 분리하였습니다.
- **공통 UI와 도메인 UI 분리**: 서비스 전역에서 사용하는 컴포넌트는 `common/components`에서 관리하고, 도서 기능에 종속적인 컴포넌트는 `pages/book/components`에서 관리하였습니다.
- **상태 관리 영역 분리**: 서버 상태는 React Query, 전역 클라이언트 상태는 Redux Toolkit을 사용하여 각 상태의 책임을 명확히 구분하였습니다.
- **데이터 처리 로직 공통화**: 검색 기록 및 찜 관련 데이터 처리 로직을 유틸리티로 분리하여 페이지 내부의 중복 코드를 줄였습니다.
- **설정 및 상수 중앙화**: 반복적으로 사용되는 설정값과 상수를 한곳에서 관리하여 변경 시 수정 범위를 최소화하였습니다.

이를 통해 새로운 페이지나 API가 추가되더라도 기존 공통 구조를 재사용할 수 있으며, 특정 기능의 변경이 다른 영역에 미치는 영향을 최소화할 수 있도록 설계하였습니다.

## 5. 라이브러리 선택 이유

### React Query — 서버 상태 관리

서버에서 가져오는 데이터와 클라이언트 내부에서 관리하는 상태의 역할을 명확히 분리하기 위해 React Query를 사용하였습니다.

- Query Key 기반 API 응답 캐싱
- 검색 조건 및 페이지별 데이터 관리
- 캐시 유효 시간 설정을 통한 불필요한 API 요청 감소
- API 요청 상태 및 에러 상태 관리
- 이전 페이지 데이터 유지를 통한 자연스러운 목록 조회
- AbortSignal을 활용한 API 요청 취소 지원

API 응답 데이터를 별도의 전역 스토어에 중복 저장하지 않고 React Query에서 관리하도록 구성하였습니다.

### Redux Toolkit — 클라이언트 상태 관리

여러 페이지에서 공통으로 접근해야 하는 모달 및 찜 상태를 중앙에서 관리하기 위해 Redux Toolkit을 사용하였습니다.

- Slice 단위의 상태 및 액션 관리
- 컴포넌트 간 불필요한 Props Drilling 방지
- 페이지 간 일관된 찜 상태 유지
- 전역 모달 호출 및 종료 처리
- TypeScript 기반의 타입 안정성 확보

서버 상태는 React Query, 전역 클라이언트 상태는 Redux Toolkit, 컴포넌트 내부에서만 필요한 상태는 useState로 관리하여 각 상태의 책임을 분리하였습니다.

### Axios — HTTP 통신

API 요청 설정을 공통화하고 통신 영역과 UI 영역의 의존성을 줄이기 위해 Axios를 사용하였습니다.

- Base URL 및 인증 헤더 공통 관리
- 요청 Timeout 설정
- API 응답 타입 지정
- React Query와 연계한 요청 취소 및 에러 처리

Axios는 HTTP 통신을 담당하고, 요청 상태와 캐싱 및 에러 관리는 React Query에서 담당하도록 역할을 구분하였습니다.

### styled-components — 스타일 및 디자인 시스템

컴포넌트 단위의 스타일 관리와 디자인 일관성을 확보하기 위해 styled-components를 사용하였습니다.

- 컴포넌트 단위 스타일 관리
- Theme 기반 색상 및 공통 디자인 속성 관리
- Props에 따른 동적 스타일 적용
- 공통 UI 컴포넌트의 재사용성 확보

### React Router DOM — 라우팅 및 검색 상태 관리

페이지 이동뿐만 아니라 URL 기반의 검색 조건 관리를 위해 사용하였습니다.

검색 조건을 URL Query Parameter에 저장하여 새로고침이나 브라우저 탐색 이후에도 검색 상태를 복원할 수 있도록 구성하였습니다.

### react-select / react-transition-group

- **react-select**: 상세 검색 셀렉트 박스의 상태 관리 및 디자인 커스터마이징
- **react-transition-group**: 모달의 진입 및 종료 애니메이션과 종료 시점에 따른 데이터 정리

## 6. 주요 아키텍처 설계

### 6-1. 서버 상태와 클라이언트 상태 분리

데이터의 성격에 따라 상태 관리 방식을 구분하였습니다.

```text
서버 데이터
└── React Query
    ├── 도서 검색 결과
    ├── API 응답 캐시
    ├── 요청 상태
    └── 에러 상태

전역 클라이언트 상태
└── Redux Toolkit
    ├── 모달 목록
    └── 찜한 도서 목록

페이지 및 컴포넌트 상태
└── useState
    ├── 검색어 입력
    ├── 상세 검색 조건
    ├── 도서 상세보기 상태
    └── 무한 스크롤 페이지 및 누적 목록

검색 조건
└── URL Query Parameter

영속성 데이터
└── LocalStorage
    ├── 최근 검색어
    └── 찜한 도서
```

모든 상태를 전역 스토어에서 관리하기보다 실제 사용 범위와 데이터의 특성에 따라 관리 영역을 구분하였습니다.

### 6-2. 전역 모달 시스템

개별 페이지에서 모달 UI와 열림 상태를 반복적으로 구현하는 대신, 애플리케이션 전역에서 모달을 호출하고 관리할 수 있는 공통 모달 시스템을 설계하였습니다.

```text
페이지 / 컴포넌트
        ↓
     useModal
        ↓
    Redux Store
        ↓
  ModalController
        ↓
   Modal Component
```

#### 주요 설계 특징

- 배열 기반의 모달 상태 관리
- 고유 ID를 활용한 개별 모달 식별
- 다중 모달 및 중첩 모달 지원
- 최상위 모달, 특정 모달, 전체 모달 종료 지원
- 공통 확인창 및 커스텀 모달 지원
- 모달별 크기, 위치, 메시지 및 콜백 설정
- 모달 종료 애니메이션 및 종료 이후 데이터 정리

모달을 배열 기반의 스택 구조로 관리하여 고정된 Depth에 제한되지 않고 다중 모달을 구성할 수 있도록 설계하였습니다.

또한 React 컴포넌트와 콜백 함수처럼 직렬화할 수 없는 데이터는 별도의 Registry에서 관리하고, Redux에는 직렬화 가능한 모달 상태를 저장하도록 분리하였습니다.

이를 통해 Redux의 직렬화 원칙을 유지하면서 다양한 형태의 모달을 공통된 방식으로 호출할 수 있도록 구현하였습니다.

API 에러 알림 또한 동일한 모달 시스템을 활용하여 처리하며, 향후 확인창이나 알림창이 필요한 기능에서도 기존 모달 구조를 재사용할 수 있습니다.

### 6-3. 공통 API 및 에러 처리

API 요청 설정과 에러 처리 로직을 중앙에서 관리하도록 구성하였습니다.

```text
Page Component
       ↓
React Query Hook
       ↓
  API Function
       ↓
Axios Instance
       ↓
 Kakao Book API
```

React Query의 QueryCache 및 MutationCache를 활용하여 API 에러를 공통 처리하고, 에러 유형에 따른 메시지를 전역 모달을 통해 사용자에게 전달하도록 구성하였습니다.

- 네트워크 연결 오류
- 요청 시간 초과
- API 인증 오류
- 잘못된 요청
- API 요청 한도 초과
- 서버 오류

페이지마다 동일한 에러 처리 로직을 반복적으로 작성하지 않아도 되며, 새로운 API가 추가되더라도 기존 공통 에러 처리 구조를 활용할 수 있습니다.

### 6-4. 공통 로딩 시스템

React Query의 요청 상태를 기반으로 전역 로딩 UI를 관리하도록 구성하였습니다.

API 요청마다 개별적으로 로딩 상태를 선언하고 변경하는 방식 대신, 공통 로딩 컴포넌트에서 요청 상태를 확인하도록 설계하였습니다.

- useIsFetching 및 useIsMutating 기반 요청 상태 확인
- 일정 시간 이상 지속되는 요청에 대한 전역 로딩 표시
- 기존 데이터가 존재하는 백그라운드 요청의 전역 로딩 제외
- 무한 스크롤 전용 로딩 UI 분리

짧은 요청마다 로딩 UI가 반복적으로 노출되는 현상을 줄이고, 추가 목록을 조회할 때 기존 화면의 사용 흐름을 방해하지 않도록 구성하였습니다.

## 7. 주요 기능 및 구현 방식

### 7-1. URL 기반 도서 검색

검색어와 상세 검색 조건을 URL Query Parameter로 관리하였습니다.

```text
일반 검색
/book-list?query=XXXX

제목 검색
/book-list?query=XXXX&target=title

저자명 검색
/book-list?query=XXXX&target=person

출판사 검색
/book-list?query=XXXX&target=publisher
```

입력 중인 검색어와 실제 API 요청에 사용되는 검색어를 분리하여 입력값이 변경될 때마다 불필요한 API 요청이 발생하지 않도록 구현하였습니다.

- Enter 입력 시 일반 검색 실행
- 제목, 저자명, 출판사 기준 상세 검색
- 새로고침 이후 검색 조건 복원
- 상세 검색 모달 재호출 시 이전 검색 조건 복원
- 일반 검색과 상세 검색 조건 분리
- 상세 검색 유형 변경 시 입력값 초기화
- 검색 조건 변경 시 목록 및 페이지 초기화

별도의 전역 상태나 스토리지에 검색 조건을 중복 저장하지 않고 URL을 검색 상태의 기준으로 활용하였습니다.

### 7-2. 무한 스크롤 및 데이터 캐싱

요구사항의 10개 단위 조회 조건을 유지하면서, 별도의 페이지 이동 없이 연속적으로 도서를 탐색할 수 있도록 무한 스크롤 방식을 적용하였습니다.

IntersectionObserver를 활용하여 목록 하단 요소가 화면에 진입했을 때 다음 페이지를 조회하도록 구현하였습니다.

#### 주요 구현 사항

- API 요청당 10개의 도서 조회
- IntersectionObserver 기반 다음 페이지 조회
- API 응답의 is_end 값을 활용한 조회 종료 판단
- 요청 진행 중 중복 페이지 조회 방지
- 기존 목록에 신규 조회 데이터 누적
- 검색 조건 변경 시 페이지 및 목록 초기화
- 동일 페이지 데이터의 중복 누적 방지

React Query의 keepPreviousData를 활용하여 다음 페이지를 요청하는 동안 기존 응답 데이터를 유지하고, isPlaceholderData를 통해 실제 신규 응답과 이전 데이터를 구분하도록 구현하였습니다.

이를 통해 추가 데이터를 조회할 때 검색 결과 수가 일시적으로 초기화되거나 이전 데이터가 목록에 중복 반영되는 현상을 방지하였습니다.

또한 Query Key와 캐시 유효 시간 설정을 통해 동일한 검색 조건에 대한 불필요한 네트워크 요청을 줄일 수 있도록 구성하였습니다.

### 7-3. 최근 검색어 관리

최근 검색어는 LocalStorage에 저장하여 브라우저 종료 및 재시작 이후에도 기존 검색 기록을 확인할 수 있도록 구현하였습니다.

- 최대 8개의 최근 검색어 관리
- 신규 검색어 기준 최신순 정렬
- 동일 검색어 중복 저장 방지
- 최대 저장 개수 초과 시 오래된 검색어 제거
- 최근 검색어 개별 삭제
- 최근 검색어 클릭 시 재검색
- 외부 영역 클릭 및 Escape 입력 시 목록 닫기

직접 입력한 일반 검색어만 검색 기록에 반영하며, 상세 검색 및 기존 검색 기록을 통한 재검색은 최근 검색어에 다시 저장하지 않도록 구분하였습니다.

검색어 추가, 삭제, 조회 및 저장 로직은 공통 유틸리티 함수로 분리하여 UI 컴포넌트와 데이터 처리 로직의 책임을 구분하였습니다.

### 7-4. 찜 상태 관리 및 데이터 영속성

찜한 도서 목록은 Redux Toolkit을 활용하여 중앙에서 관리하고, LocalStorage와 연동하여 데이터의 영속성을 확보하였습니다.

```text
찜 등록 / 해제
       ↓
공통 updateFavorite 함수
       ↓
Redux Store 상태 갱신
       ↓
LocalStorage 저장
```

#### 주요 구현 사항

- 검색 페이지와 찜 목록 페이지 간 상태 동기화
- 찜 등록 및 해제 로직 공통화
- ISBN 기반 도서 식별 및 중복 등록 방지
- 찜 등록 시점의 도서 데이터 저장
- 브라우저 재시작 이후 찜 데이터 복원
- 전역 상태 기반 찜한 도서 수 조회
- 찜 목록의 10개 단위 무한 스크롤

찜한 도서의 전체 데이터를 저장하여 찜 목록 페이지에서 별도의 API 요청 없이 도서 정보를 조회할 수 있도록 구성하였습니다.

또한 찜 상태 변경과 LocalStorage 저장을 하나의 공통 함수에서 처리하여 페이지별로 동일한 로직을 반복 작성하지 않도록 설계하였습니다.

중앙에서 찜 상태를 관리하기 때문에 향후 헤더의 찜 개수 표시나 다른 페이지에서의 찜 기능 추가에도 기존 상태를 활용할 수 있습니다.

### 7-5. 공통 스토리지 유틸리티

최근 검색어와 찜 목록에서 반복적으로 사용되는 LocalStorage 접근 로직을 공통화하였습니다.

- Generic을 활용한 데이터 타입 지정
- JSON 직렬화 및 역직렬화 공통 처리
- 스토리지 접근 및 데이터 변환 오류 처리
- 스토리지 Key 상수 관리
- 기본값을 활용한 초기 데이터 조회

각 기능에서 LocalStorage에 직접 접근하는 대신 공통 유틸리티를 사용하여 저장 방식의 일관성과 재사용성을 확보하였습니다.

### 7-6. 공통 UI 컴포넌트 설계

여러 페이지에서 반복적으로 사용되는 UI 요소를 공통 컴포넌트로 구성하였습니다.

| 컴포넌트 | 역할 |
| --- | --- |
| `Button` | 버튼 크기, 색상, 테두리, 모서리 및 너비 설정 |
| `Header` | 공통 헤더 및 현재 페이지 활성화 처리 |
| `Modal` | 확인창 및 커스텀 모달 공통 관리 |
| `Loading` | 전역 로딩 UI |
| `ScrollLoading` | 무한 스크롤 전용 로딩 UI |
| `ListBookItem` | 도서 정보, 상세보기, 찜 및 구매 기능 |
| `ResultCount` | 검색 결과 및 찜한 도서 수 표시 |
| `BookTitle` | 도서 페이지 공통 타이틀 |
| `EmptyBook` | 데이터가 없는 경우의 공통 UI |

특히 검색 페이지와 찜 목록 페이지에서 동일한 ListBookItem 컴포넌트를 사용하여 UI와 사용자 인터랙션의 일관성을 유지하였습니다.

컴포넌트의 표시 상태와 이벤트를 Props로 전달받도록 구성하여 페이지별 데이터 관리 로직과 UI 구현을 분리하였습니다.

## 8. 성능 및 사용자 경험 개선

| 개선 항목 | 적용 방식 |
| --- | --- |
| 불필요한 API 요청 감소 | React Query 캐싱 및 캐시 유효 시간 설정 |
| 입력 중 API 요청 방지 | 입력 상태와 실제 검색 조건 분리 |
| 불필요한 재조회 방지 | Window Focus 자동 재조회 비활성화 |
| 요청 취소 지원 | AbortSignal과 Axios 연동 |
| 목록 조회 효율성 | IntersectionObserver 기반 무한 스크롤 |
| 중복 요청 방지 | 요청 상태 및 마지막 페이지 확인 |
| 이전 데이터 유지 | keepPreviousData 활용 |
| 중복 데이터 반영 방지 | isPlaceholderData 및 페이지 단위 목록 갱신 |
| 찜 목록 API 요청 제거 | Redux 및 LocalStorage 기반 데이터 조회 |
| 로딩 UI 깜빡임 완화 | 지연 로딩 및 추가 조회 로딩 분리 |
| 초기 코드 로딩 부담 완화 | 페이지 단위 Lazy Loading 및 Suspense |
| 유지보수성 개선 | 공통 컴포넌트, 유틸리티 및 상수 관리 |

불필요한 메모이제이션을 일괄적으로 적용하기보다 상태의 관리 범위, API 요청 시점, 데이터 캐싱 및 컴포넌트의 책임 분리를 중심으로 최적화를 고려하였습니다.

## 9. 프로젝트를 진행하며 중점적으로 고려한 부분

이번 프로젝트에서는 요구사항을 충족하는 것뿐만 아니라 실제 서비스의 기능 확장 및 유지보수 상황을 고려하여 개발하였습니다.

특히 반복적으로 사용되는 모달, 로딩, 에러 처리, 스토리지 접근 등의 기능을 공통화하고, 페이지에서는 해당 페이지의 비즈니스 로직과 화면 구현에 집중할 수 있도록 구성하였습니다.

또한 서버 상태와 클라이언트 상태를 분리하고, 검색 조건은 URL을 기준으로 관리함으로써 데이터의 중복 관리와 상태 불일치 가능성을 줄이고자 하였습니다.

기능의 규모가 크지 않더라도 향후 새로운 페이지와 API가 추가될 때 기존 구조를 활용할 수 있도록 재사용성과 확장성을 고려하였으며, 불필요하게 복잡한 구조보다는 각 기능의 책임이 명확하고 이해하기 쉬운 코드를 작성하는 데 중점을 두었습니다.