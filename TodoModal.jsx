import { useState } from "react";

export default function TodoModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleCreate = () => {
    if (!title || !status || !deadline) {
      alert("Все поля обязательны");
      return;
    }

    onCreate({ title, status, deadline });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3 align="center">Добавить новую задачу</h3>
        <label>Описание
        <input
          placeholder="Название задачи"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        </label>
        <label>Статус
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
        >
          <option value="">Выберите статус</option>
          <option value="Новая">Новая</option>
          <option value="В работе">В работе</option>
          <option value="Готово">Готово</option>
        </select>
        </label>
        <label>Дедлайн
        <input type="date"
            placeholder="Дедлайн"
          
          value={deadline}
          onChange={e => setDeadline(e.target.value)}
        />
        </label>
        <div className="modal-actions">
            <div className="center">
                <button className="add-btn" onClick={handleCreate} align="center">Добавить задачу </button>
            </div>
        </div>
      </div>
    </div>
  );
}
