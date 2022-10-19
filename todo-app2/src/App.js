import './App.css';
import TodoTemplate from './components/TodoTemplate';
import { useCallback, useReducer, useRef } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodo() {
  const array = [];

  for (let i = 0; i < 1500; i++) {
    array.push({
      id: i,
      text: `할 일  ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action) {
  switch (action.type) {
    case 'INSERT':
      return todos.concat(action.todo);
    case 'DELETE':
      return todos.filter((todo) => todo.id !== action.id);
    case 'CHECKED':
      return todos.map((todo) =>
        todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
      );
    default:
      return todos;
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodo);

  const nextId = useRef(1501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    dispatch({ type: 'INSERT', todo: todo });
    nextId.current += 1;
  }, []);

  const onDelete = useCallback((id) => {
    dispatch({ type: 'DELELTE', id: id });
  }, []);

  const onChecked = useCallback((id) => {
    dispatch({ type: 'CHECKED', id: id });
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onDelete} onChecked={onChecked} />
    </TodoTemplate>
  );
};

export default App;
