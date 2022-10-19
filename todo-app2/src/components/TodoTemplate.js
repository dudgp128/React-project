import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
  return (
    <div className="TodoTemplate">
      <header>일정 관리</header>
      <div className="content">{children}</div>
    </div>
  );
};
export default TodoTemplate;
