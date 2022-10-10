import { useEffect, useState } from "react";

const Nickname = () => {
  const [name, setName] = useState("");
  const [nickname, setNickName] = useState("");

  useEffect(() => {
    console.log("effect");
    console.log({ name, nickname });
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
