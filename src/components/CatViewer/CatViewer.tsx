import styled from "styled-components";
// import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
// import { setCount } from "./store/slices/testSlice";
import ImageList from "./ImageList";

function CatViewer() {
  // const { count } = useTypedSelector((state) => state.test);
  // const dispatch = useTypedDispatch();

  // const onClickButton = (type: string) => {
  //   console.log("click");
  //   if (type === "INCREASE") {
  //     dispatch(setCount(count + 1));
  //   } else if (type === "DECREASE") {
  //     dispatch(setCount(count - 1));
  //   }
  // };

  return (
    <Wrap>
      <ContentWrap>
        <ImageList />
        {/* <h2>{count}</h2>
      <div>
        <button onClick={() => onClickButton("INCREASE")}>더하기</button>
        <button onClick={() => onClickButton("DECREASE")}>빼기</button>
      </div> */}
      </ContentWrap>
    </Wrap>
  );

  // return <div>1번 과제 - CatViewer</div>;
}

export default CatViewer;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  border: solid 1px red;
`;

const ContentWrap = styled.div`
  width: 1200px;
  height: 100%;
  border: solid 1px blue;
  overflow-y: scroll;
`;
