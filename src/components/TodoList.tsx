import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  tempTodo: Todo | null;
  onDeleteTodo: (todoId: number) => Promise<void>;
  onUpdateTodo: (todoId: number, updates: Partial<Todo>) => Promise<void>;
  loadingTodoIds: number[];
  onAddTodo: (title: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  tempTodo,
  onDeleteTodo,
  onUpdateTodo,
  loadingTodoIds,
}) => {
  const [updatingStatusTodoId, setUpdatingStatusTodoId] = useState<number | null>(null);
  const [isAdding] = useState(false);

  const handleToggleStatus = async (todoId: number, currentStatus: boolean) => {
    setUpdatingStatusTodoId(todoId);
    await onUpdateTodo(todoId, { completed: !currentStatus });
    setUpdatingStatusTodoId(null);
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDeleteTodo}
          onUpdate={() => handleToggleStatus(todo.id, todo.completed)}
          isLoading={loadingTodoIds.includes(todo.id)}
          isUpdatingStatus={updatingStatusTodoId === todo.id}
          isAdding={isAdding}
        />
      ))}

      {tempTodo && (
        <TodoItem
          todo={tempTodo}
          onDelete={() => {}}
          onUpdate={() => {}}
          isLoading={true}
          isAdding={true}
          isUpdatingStatus={false}
        />
      )}
    </section>
  );
};
