import { useReducer, useState } from "react";

// 리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 action 값을
// 전달받아 새로운 상태를 반환하는 함수
// 새로운 상태를 만들 때는 반드시 불변성을 지켜야함.
function reducer(state, action) {
  switch (action.type) {
    case "DECREMENT":
      return { value: state.value - 1 };

    case "INCREMENT":
      return { value: state.value + 1 };

    default:
      return state;
  }
}

const Counter = () => {
  // useReducer(리듀서 함수, 해당 리듀서의 기본값)
  // state는 현재 가리키고 있는 상태
  // dispatch는 액션을 발생시키는 함수, dispatch(action)은 함수 안에 파라미터로 액션 값을 넣어주면 -> 리듀서 함수 호출
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <>
      <p>useReducer</p>
      <h1>현재 카운터 값은 {state.value}입니다.</h1>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-1</button>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+1</button>
    </>
  );
};
export default Counter;
