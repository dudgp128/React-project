import logo from "./logo.svg";
import "./App.css";
import Counter from "./component/Counter";
import Todos from "./component/Todos";
import CounterContainer from "./containers/CounterContainer";
import TodosContainer from "./modules/TodosContainer";

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
};

export default App;
