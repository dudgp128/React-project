import TodoListItem from './TodoListItem';

const TodoList = ({ todos, onRemove, onChecked }) => {
  return (
    <div className="TodoList">
      {todos.map((todo) => (
        <TodoListItem
          todo={todo}
          key={todo.id}
          onRemove={onRemove}
          onChecked={onChecked}
        />
      ))}
    </div>
  );
};
export default TodoList;
