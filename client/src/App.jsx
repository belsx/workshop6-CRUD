import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const API_URL = "http://localhost:7070/notes";

  const updateNotes = () => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Ошибка получения данных:", error));
  };

  useEffect(() => {
    updateNotes();
  }, []);

  // Добавить новую заметку
  const addNote = () => {
    if (!content) return;
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: 0,
        content: content,
      }),
    })
      .then(() => {
        updateNotes();
        setContent("");
      })
      .catch((error) => console.error("Ошибка добавления записи:", error));
  };

  // Удалить заметку
  const deleteNote = (id) => {
    fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        updateNotes();
      })
      .catch((error) => console.error("Ошибка удаления записи:", error));
  };

  return (
    <div className="app">
      <div className="note-form">
        <textarea
          placeholder="Новая заметка"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addNote}>Добавить</button>
        <button onClick={updateNotes}>Обновить</button>
      </div>
      <div className="note-grid">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} deleteNote={deleteNote} />
        ))}
      </div>
    </div>
  );
}

const NoteCard = ({ note, deleteNote }) => {
  return (
    <div className="note-card">
      <p>{note.content}</p>
      <button onClick={() => deleteNote(note.id)}>Удалить</button>
    </div>
  );
};

export default App;
