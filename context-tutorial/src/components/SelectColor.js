import { ColorConsumer } from "../contexts/color";

const colors = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "purple",
  "black",
  "gray",
];

const SelectColor = () => {
  return (
    <>
      <h3> 색상을 선택하세요. </h3>
      <ColorConsumer>
        {({ actions }) => (
          <div style={{ display: "flex" }}>
            {colors.map((color) => {
              return (
                <div
                  key={color}
                  style={{
                    width: "20px",
                    height: "20px",
                    background: color,
                    cursor: "pointer",
                  }}
                  onClick={() => actions.setColor(color)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    actions.setSubColor(color);
                  }}
                ></div>
              );
            })}
          </div>
        )}
      </ColorConsumer>
      <hr />
    </>
  );
};
export default SelectColor;
