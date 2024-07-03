import { useRef, useState } from 'react'
import { cn } from './lib/utils.ts'

type TodoType = {
  id: number
  text: string
  completed: boolean
}

const TodoApp = () => {
  const [todos, setTodos] = useState<TodoType[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const addTodo = () => {
    if (inputRef.current) {
      setTodos([
        ...todos,
        { id: Date.now(), text: inputRef.current.value, completed: false },
      ])
      inputRef.current.value = ''
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="mx-auto my-0 max-w-[600px] p-5">
      <h1>Todo App</h1>
      <div className="my-2 flex justify-between bg-gray-100">
        <input
          type="text"
          data-testid="todo-input"
          ref={inputRef}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Enter a new todo"
          className="mr-4 flex flex-1 rounded-sm border border-gray-500 p-1"
        />
        <button
          onClick={addTodo}
          className="ml-2 rounded-md bg-gray-900 p-2 text-white"
        >
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="my-1 flex items-center"
            data-testid="todo-item"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid="todo-toggle"
            />
            <span
              className={cn([
                'ml-2 flex flex-1',
                todo.completed ? 'line-through decoration-1' : 'decoration-0',
              ])}
            >
              {todo.text}
            </span>
            <button
              className="leading-1 rounded-md bg-red-700 p-1 font-light text-white"
              onClick={() => deleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TodoApp
