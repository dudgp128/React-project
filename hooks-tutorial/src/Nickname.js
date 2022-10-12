import { useEffect, useState } from "react";

const Nickname = () => {
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");

  //useEffect : 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정

  // 특정 값('name')이 업데이트 될 때만 실행하고 싶을때,
  // useEffect의 두 번째 파라미터로 전달되는 배열 안에 검사하고 싶은 값 입력(['name'])
  useEffect(() => {
    console.log("effect");
    console.log({ name, nickname });
    // 컴포넌트가 언마운트 되기전, 업데이트 되기 직전에 어떠한 작업을 수행하고 싶다면
    // 뒷정리 함수를 "반환(return)" 해 주어야 함.
    return () => {
      console.log("cleanup");
      console.log({ name, nickname });
    };
  }, [name]);

  const changeName = (e) => {
    setName(e.target.value);
  };

  const changeNickName = (e) => {
    setNickName(e.target.value);
  };

  return (
    <>
      <input onChange={changeName} value={name} />
      <input onChange={changeNickName} value={nickname} />
      <p> 이름 {name}</p>
      <p> 닉네임 {nickname}</p>
    </>
  );
};
export default Nickname;
