# Yess Web Frontend 사전 과제 기반 코드 (CRA 활용)

<br/>

## 사용 기술
- React
- Typescript
- redux, redux-toolkit
- styled-components

<br/>

## 프로젝트 실행
전달 받으신 .env 파일을 프로젝트 루트 디렉터리에 추가한 후 실행해주세요.

```
npm install
npm run start
```


<br/>

## 구현 사항


### Cat Viewer

#### 1. Cat Viewer 구조
- MasonryImageView 컴포넌트 : column 데이터를 받으면 언제나 Masonry 레이아웃을 그려내 다른 곳에서도 재사용이 가능하도록 구현
- useMasonryLayout 커스텀 훅 : 화면 너비에 따라 column 개수를 정하고, 그에 따라 이미지 데이터를 분배하는 역할
- 실제 CatViewer가 있는 CatImages 컴포넌트에서는 서버 데이터 관리만 할 수 있도록 3개의 컴포넌트 역할을 분리


#### 2. Masonry Layout 이미지 뷰 제작

- 요구사항에 맞는 레이아웃을 위해 이미지 뷰가 여러개의 column을 가지도록 구성
- 가로로 진행되는 이미지 순서 유지를 위해 column별로 이미지 데이터를 분류하는 작업 추가
- 이미지의 높이가 전부 다르므로, 한쪽 column이 길어지지 않도록 이미지 분배 시 낮은 높이의 column에 우선적으로 이미지를 분배하도록 처리

#### 3. 반응형 페이지 적용
- 화면 너비에 따라 이미지 뷰의 column 개수를 1~3개로 조정
- 기본 : 3개 / 모바일 : 2개 / 작은 화면 : 1개 (ex. 갤럭시 폴드 화면)

#### 4. 스크롤 페이징 적용
- Intersection Observer를 활용하여 useIntersect 커스텀 훅을 제작하여 사용
- API_KEY는 .env 파일 환경변수로 관리

#### 5. 이미지 확대 기능 및 확대 애니메이션
- 클릭한 이미지 위치에서 확대되며 화면 중심으로 이동하는 애니메이션 추가
- 아래 계산한 값들을 활용해 이미지 확대 시 transform의 translate와 scale을 이용한 애니메이션 적용
- 이미지의 현재 위치에서 중심으로 이동하기 위한 방향 계산, 이미지가 화면 전체를 채우기 위해 확대되어야 하는 비율 계산
- (이미지 확대 모드 종료 애니메이션은 시간이 부족해 구현하지 못했습니다..)
 
#### 6. 서버 에러 핸들링
- 서버 오류 발생 시 Loading Indicator 위치에서 오류 안내 메시지와 오류 사항 표시
- 재시도 버튼을 이용해 이전에 실패한 요청을 다시 요청할 수 있도록 구현

  
#### 7. UI/UX 개선  
- 초기 로딩 속도 개선 : 이미지 첫 요청 시에는 이미지를 15개만 요청하도록 예외처리 (이후 30개씩 요청)
- Skeleton Loading 적용 : api 응답값으로 넘어오는 이미지 너비와, 각 column의 너비를 이용해 렌더링 될 이미지의 높이를 예측해 Skeleton UI 적용
- Loading Indicator 추가 :스크롤 페이징으로 서버 요청 시 스크롤 하단에 Loading Indicator 추가

<br/>


### Working Hour

#### 1. 데이터 수정
- store에 요일별 working hour 데이터를 가지는 기본 구조 설정
  ```
  // 기본 날짜 구조
   MON: {
      id: "MON",
      title: "Monday",
      range: [
        {
          start: { hour: "09", minute: "00" },
          end: { hour: "17", minute: "00" },
        },
      ],
    }
  ```
- 요일별 id와 range의 index 값, range 내부 start,end 값을 활용해 데이터를 추가, 수정, 삭제

#### 2. 데이터 저장
- 새로고침 후에도 데이터 저장을 하기 위해 localStorage에 데이터 저장
- 초기 접속 시 localStorage에 데이터를 확인해 데이터가 없는 경우 initialState를 localStorage에 저장하도록 구현
- 변경 사항이 생기고 update 버튼을 누를 때마다 localStorage에 데이터 새롭게 저장

#### 3. 데이터 변경 감지 
- store에 isEdited 데이터를 활용해 데이터 변경 여부 확인
- 추가, 수정, 삭제 액션이 있을 경우 isEdited를 true 값으로 변경
- isEdited에 따라 cancel과 update 버튼 렌더링 예외처리
- cancel 또는 update 버튼 클릭 시 isEdited true로 변경
- cancel 시에는 localStorage에 저장된 데이터를 반영해 변경 이전 상태로 되돌리기
- update 시에는 localStorage에 현재 데이터 업데이트하여 데이터 저장
#### 4. UI/UX 개선
- 시간 범위가 늘어남에 따라 스크롤이 길어지므로, 버튼이 아래로 내려가 잘 보이지 않는 부분을 개선하기 위해 cancel, update 버튼을 화면 하단 플로팅 버튼으로 변경
- 현재 스크롤 위치를 파악할 수 있도록 버튼을 감싸는 div를 불투명하게 처리 


<br/>

