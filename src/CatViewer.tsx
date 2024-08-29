import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import { setCount } from "./store/slices/testSlice";

function CatViewer() {
  const { count } = useTypedSelector((state) => state.test);
  const dispatch = useTypedDispatch();

  const onClickButton = (type: string) => {
    if (type === "INCREASE") {
      dispatch(setCount(count + 1));
    } else if (type === "DECREASE") {
      dispatch(setCount(count - 1));
    }
  };

  return (
    <div>
      <h2>{count}</h2>
      <div>
        <button onClick={() => onClickButton("INCREASE")}>더하기</button>
        <button onClick={() => onClickButton("DECREASE")}>빼기</button>
      </div>
    </div>
  );

  // return <div>1번 과제 - CatViewer</div>;
}

export default CatViewer;
