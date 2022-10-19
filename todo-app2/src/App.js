import './App.css';
import TodoTemplate from './components/TodoTemplate';
import { useCallback, useRef, useState } from 'react';
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

const App = () => {
  const [todos, setTodos] = useState(createBulkTodo);

  const nextId = useRef(1501);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };
    setTodos((todos) => {
      todos.concat(todo);
    });
    nextId.current += 1;
  }, []);

  const onDelete = useCallback((id) => {
    setTodos((todos) => {
      todos.filter((todo) => todo.id !== id);
    });
  }, []);

  const onChecked = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) => {
        return todo.id == id ? { ...todo, checked: !todo.checked } : todo;
      }),
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onDelete} onChecked={onChecked} />
    </TodoTemplate>
  );
};

export default App;
