import { connect } from "react-redux";
import Todos from "../component/Todos";
import { changeInput, insert, remove, toggle } from "../modules/todos";

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  remove,
  toggle,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      changeInput={changeInput}
      insert={insert}
      remove={remove}
      toggle={toggle}
    />
  );
};

export default connect(
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    remove,
    toggle,
  }
)(TodosContainer);
