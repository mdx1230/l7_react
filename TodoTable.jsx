export default function TodoTable({ todos, onDelete, onUpdate }) {
    if (todos.length === 0) {
      return <p>Задач пока нет</p>;
    }
  
    const isDone = (status) => status === "Готово";
  
    return (
      <table>
        <thead>
          <tr>
            <th>Описание</th>
            <th>Статус</th>
            <th>Дедлайн</th>
            <th></th>
          </tr>
        </thead>
  
        <tbody>
          {todos.map(todo => {
            const done = isDone(todo.status);
  
            return (
              <tr key={todo.id}>
                <td>
                  <input
                    defaultValue={todo.title}
                    onBlur={e =>
                      onUpdate(todo.id, "title", e.target.value)
                    }
                  />
                </td>
  
                <td>
                  <select
                    defaultValue={todo.status}
                    className={done ? "status-done" : "status-active"}
                    onBlur={e =>
                      onUpdate(todo.id, "status", e.target.value)
                    }
                  >
                    <option value="Новая">Новая</option>
                    <option value="В работе">В работе</option>
                    <option value="Готово">Готово</option>
                  </select>
                </td>
  
                <td>
                  <input
                    type="date"
                    defaultValue={todo.deadline}
                    className={done ? "deadline-done" : "deadline-active"}
                    onBlur={e =>
                      onUpdate(todo.id, "deadline", e.target.value)
                    }
                  />
                </td>
                <td width={20}>
                
                  <button
                    className="delete-btn"
                    onClick={() => onDelete(todo.id)}
                  >
                    🗑
                  </button>
                  </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
