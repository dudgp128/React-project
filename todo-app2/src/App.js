import './App.css';
import TodoTemplate from './components/TodoTemplate';
import { useCallback, useRef, useState } from 'react';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '우아한 테크코스 지원하기',
      checked: false,
    },
    {
      id: 2,
      text: '네이버 블로그 성장일기 업로드하기',
      checked: false,
    },

    {
      id: 3,
      text: '고양이 터널, 장난감 구입하기',
      checked: false,
    },
  ]);

  const nextId = useRef(4);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text: text,
        checked: false,
      };
      setTodos(todos.concat(todo));
      nextId.current += 1;
    },
    [todos],
  );

  const onDelete = useCallback(
    (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos],
  );

  const onChecked = useCallback(
    (id) => {
      setTodos(
        todos.map((todo) =>
          id == todo.id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [todos],
  );

  return (
    <div className="App">
      <TodoTemplate>
        <TodoInsert onInsert={onInsert} />
        <TodoList todos={todos} onRemove={onDelete} onChecked={onChecked} />
      </TodoTemplate>
    </div>
  );
};

export default App;
