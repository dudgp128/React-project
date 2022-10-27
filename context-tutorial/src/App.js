import "./App.css";
import ColorBox from "./components/ColorBox.js";
import SelectColor from "./components/SelectColor";
import ColorContext, { ColorProvider } from "./contexts/color";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColor />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
