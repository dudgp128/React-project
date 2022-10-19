import React from 'react';
import './TodoListItem.scss';
import cn from 'classnames';
import {
  MdCheckCircleOutline,
  MdCheckCircle,
  MdRemoveCircleOutline,
} from 'react-icons/md';

const TodoListItem = ({ todo, onRemove, onChecked }) => {
  const { id, text, checked } = todo;

  return (
    <div className="TodoListItem">
      <div
        className={cn('checkBox', { checked })}
        onClick={() => onChecked(id)}
      >
        {checked ? <MdCheckCircle /> : <MdCheckCircleOutline />}
        <div className="text">{text}</div>
      </div>
      <button className="remove" onClick={() => onRemove(id)}>
        <MdRemoveCircleOutline />
      </button>
    </div>
  );
};
export default React.memo(TodoListItem);
