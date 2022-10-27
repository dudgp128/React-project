import ColorContext, { ColorConsumer } from "../contexts/color";
import { useContext } from "react";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color,
        }}
      ></div>
      <div
        style={{
          width: "50px",
          height: "50px",
          background: state.subcolor,
        }}
      ></div>
    </>
  );
};
export default ColorBox;
