import React, { useCallback } from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
import { List } from 'react-virtualized';
import { MdOutlet } from 'react-icons/md';

const TodoList = ({ todos, onRemove, onChecked }) => {
  const rowRenderer = useCallback(
    ({ index, key, style }) => {
      const todo = todos[index];

      return (
        <TodoListItem
          todo={todo}
          key={key}
          style={style}
          onRemove={onRemove}
          onChecked={onChecked}
        />
      );
    },
    [onRemove, onChecked, todos],
  );

  return (
    <List
      className="TodoList"
      width={483}
      height={484}
      rowCount={todos.length}
      rowHeight={56}
      rowRenderer={rowRenderer}
      list={todos}
      style={{ outline: 'none' }}
    />
  );
};
export default React.memo(TodoList);
