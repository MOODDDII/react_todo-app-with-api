import React, { useState } from 'react';
import classNames from 'classnames';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onDelete: (todoId: number) => void;
  onUpdate: (todoId: number, updates: Partial<Todo>) => void;
  isLoading: boolean;
  isUpdatingStatus: boolean;
  isAdding: boolean;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo: { id, title, completed },
  onDelete,
  onUpdate,
  isLoading,
  isUpdatingStatus,
  isAdding,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleEdit = () => setIsEditing(true);

  const handleBlur = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      onDelete(id);
    } else if (trimmedTitle !== title) {
      onUpdate(id, { title: trimmedTitle });
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(title);
    } else if (e.key === 'Enter') {
      handleBlur();
    }
  };

  const isDeleting = isLoading;
  const isChangingStatus = isUpdatingStatus;

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', { completed, loading: isDeleting || isChangingStatus })}
    >
      <label className="todo__status-label">
        <input
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => onUpdate(id, { completed: !completed })}
          disabled={isDeleting || isChangingStatus}
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
          <span className="todo__title" onDoubleClick={handleEdit}>
            {title}
            {isAdding && !isChangingStatus && <div className="loader loader-margin"></div>}
          </span>

          <button
            type="button"
            className="todo__remove"
            onClick={() => onDelete(id)}
            disabled={isDeleting || isChangingStatus}
            data-cy="TodoDelete"
          >
            {isDeleting || isChangingStatus ? (
              <div className="loader loader-delete"></div>
            ) : (
              '×'
            )}
          </button>
        </>
      )}
    </div>
  );
};
