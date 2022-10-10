import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Nickname_useReducer = () => {
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
