# 구동 방법
1. git clone https://github.com/wookiya1364/musinsa.git
2. yarn

|환경|설명|
|-----|-----|
|개발|1. yarn dev<br/>2. 크롬 브라우저에서 [http://localhost:5173](http://localhost:5173)|
|프로덕션|1. yarn build<br/>2. yarn preview<br/>3. 크롬 브라우저에서 [http://localhost:4173](http://localhost:4173)|

### 1분16초 앱 사용 gif
![mss](https://github.com/wookiya1364/musinsa/assets/16011536/2c4d6627-e640-4033-a62a-730502dbbff8)

# 구성
#### 무신사 사전과제: React + TypeScript

- components
   - atom
      - button.tsx
      - column.tsx
      - label.tsx
      - row.tsx
   - molecule
      - itemlist.tsx
      - navbutton.tsx
      - search.tsx
   - types
      - type.ts
   - cn.ts
- src
   - App.tsx
   - Header.tsx
   - index.css
   - main.tsx
   - Nav.tsx
- utils
   - useInfiniteScroll.tsx
   - util.ts


|명칭|설명|
|--|--|
|components|모든 컴포넌트 상위 디렉토리|
|components/atom|기본 컴포넌트 디렉토리|
|components/molecule|기본 컴포넌트를 합성한 디렉토리|
|components/types|재사용 타입 디렉토리|
|components/cn.ts|tailwind merge 유틸함수|
|src|메인 앱 디렉토리|
|utils|앱에서 사용하는 custom hook, 유틸함수 디렉토리|


## atom(기본 컴포넌트 디렉토리)
|파일|설명|
|--|--|
|button.tsx|버튼 컴포넌트|
|column.tsx|수직방향의 컨테이너 컴포넌트|
|row.tsx|수평방향의 컨테이너 컴포넌트|
|label.tsx|라벨 컴포넌트|

## molecule(기본 컴포넌트를 합성한 디렉토리)
|파일|설명|
|--|--|
|itemlist.tsx|상품리스트 컴포넌트|
|navbutton.tsx|상품필터링 컴포넌트|
|search.tsx|검색필터링 컴포넌트|

## utils
|파일|설명|
|--|--|
|useInfiniteScroll.tsx|custom hook|
|util.ts|유틸 함수 파일 (pipe, filter ...)|

## types
|파일|설명|
|--|--|
|type.ts|재사용 타입 선언 파일|

## src
|파일|설명|
|--|--|
|Header.tsx|MUSINSA 로고 나타내기 위한 파일|
|Nav.tsx|검색을 위한 필터링 파일|
|App.tsx|무한스크롤이 포함된 상품리스트 파일|
|main.tsx|Header, Nav, App을 조합한 메인 앱 구동 파일|
|index.css|글로벌 css 파일|


## 환경설정
vite.config.ts
- tsconfigPaths 사용
   - tsconfig.json에 paths 명시 (채택)
   - ~~vite.config.ts에 resovle 명시~~ 일반적으로 사용하는 방법이 아니므로 (미채택)


# 선정 이유
|명칭|설명|
|-----|-----|
|atomic, molecule design pattern|웹 개발에 유용한 프론트엔드 디자인패턴 입니다.<br/>적절한 단위로 컴포넌트를 분리하여 재사용할 수 있습니다.|
|React|대다수의 Frontend 개발자가 사용하는 라이브러리입니다.<br/>Vanilla에서 같은 기능을 동작하게 하려면 상대적으로 많은 양의 코드가 필요하므로 시간단축을 위해 사용 했습니다.|
|typescript|정적타입으로 개발하면 다수의 인원이 개발할 때 기능과 컴포넌트에 대한 문서를 작성하지 않아도 대략적인 사용법을 알 수 있으므로 협업에 유리합니다.|
|clsx|css 클래스를 문자열로 연결하는 대신 함수로 제공할 수 있습니다.<br/>특정 조건에 맞춰 조건부로 클래스를 적용하고, 중복을 제거할 수 있습니다.|
|tailwind|css를 component의 style에 작성하게 되면 많은 양의 코드를 작성해야 합니다.<br/>이를 간편하게 작성하기 위해 사용 했습니다.|
|tailwind-merge|재사용 컴포넌트의 일부 css가 변경되어야 할 경우 중복되는 속성 값을 merge하기 위해 사용 했습니다.|