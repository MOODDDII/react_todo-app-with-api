import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onUpdate: (todoId: number, updates: Partial<Todo>) => void;
  isLoading: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo: { id, title, completed },
  onDelete,
  onUpdate,
  isLoading,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => setIsEditing(true);

  const handleBlur = () => {
    if (editTitle.trim() === title) {
      setIsEditing(false);
      return;
    }
    if (!editTitle.trim()) {
      onDelete(id);
    } else {
      onUpdate(id, { title: editTitle.trim() });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    } else if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed, loading: isLoading })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onUpdate(id, { completed: !completed })}
          disabled={isLoading}
        />
      </label>

      {isEditing ? (
        <input
          type="text"
          className="todo__edit"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <>
          <span
            className="todo__title"
            onDoubleClick={handleEdit}
          >
            {title}
          </span>
          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(id)}
            disabled={isLoading}
          >
            ×
          </button>
        </>
      )}

      {isLoading && <div className="loader"></div>}
    </div>
  );
};
