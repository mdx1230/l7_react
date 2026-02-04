import { useEffect, useState } from "react";
import TodoModal from "./components/TodoModal";
import TodoTable from "./components/TodoTable";

function App() {
  const [todos, setTodos] = useState(() => {
    try{

    
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
    }
    catch(e)
    {
      console.error("Ошибка локального хранилища",e);
      localStorage.removeItem("todos");
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const updateTodo = (id, field, value) => {
    if (!value.trim()) return;

    setTodos(todos.map(t =>
      t.id === id ? { ...t, [field]: value } : t
    ));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return todo.status !== "Готово";
    if (filter === "done") return todo.status === "Готово";
    return true;
  });

  return (
    <div className="app">
      {/* 🔝 Фильтры */}
      <div className="filter-bar">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          Все задачи
        </button>

        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Активные
        </button>

        <button
          className={filter === "done" ? "active-filter" : ""}
          onClick={() => setFilter("done")}
        >
          Выполненные
        </button>
      </div>

      <h1></h1>

      <TodoTable
        todos={filteredTodos}
        onDelete={deleteTodo}
        onUpdate={updateTodo}
      />

      <div className="center">
        <button className="add-btn" onClick={() => setIsOpen(true)}>
          Добавить задачу
        </button>
      </div>

      {isOpen && (
        <TodoModal
          onClose={() => setIsOpen(false)}
          onCreate={addTodo}
        />
      )}
    </div>
  );
}

export default App;
