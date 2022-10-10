import { useState } from "react";

const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h1>현재 카운터 값은 {number}입니다.</h1>
      <button onClick={() => setNumber(number - 1)}>-1</button>
      <button onClick={() => setNumber(number + 1)}>+1</button>
    </>
  );
};
export default Counter;
