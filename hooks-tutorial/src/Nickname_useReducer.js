import { useReducer } from "react";

// 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다.
function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Nickname_useReducer = () => {
  // useReducer('reducer' , 해당 리듀서의 기본값);
  // useReducer 이 Hook을 사용하면 state값과 dispatch 함수를 받아옴.
  // state - 현재 가리키고 있는 상태
  // dispatch - 액션을 발생시키는 함수로, 함수 안에 파라미터로 액션 값을 넣어주면 'reducer'함수가 호출
  // dispathch(e.target) -> reducer(state, e.target)

  const [state, dispatch] = useReducer(reducer, { name: "", nickname: "" });

  const { name, nickname } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <>
      <p>useReducer</p>
      <input onChange={onChange} value={name} name="name" />
      <input onChange={onChange} value={nickname} name="nickname" />
      <p> 이름 {name}</p>
      <p> 닉네임 {nickname}</p>
    </>
  );
};
export default Nickname_useReducer;
