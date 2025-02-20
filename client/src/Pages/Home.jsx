import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Notemodel from "../Components/Notemodel";
import { fetchNotes, addNote, editNote, deleteNote } from "../api/api";

const Home = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const { data } = await fetchNotes();
        setNotes(data.notes);
      } catch (error) {
        toast.error("Failed to fetch notes");
      }
    };
    loadNotes();
  }, []);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) ||
      note.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAddNote = async (title, description) => {
    try {
      await addNote({ title, description });
      toast.success("Note added successfully");
      setIsModelOpen(false);
    } catch (error) {
      toast.error("Failed to add note");
    }
  };

  const handleEditNote = async (id, title, description) => {
    try {
      await editNote(id, { title, description });
      toast.success("Note updated successfully");
      setIsModelOpen(false);
    } catch (error) {
      toast.error("Failed to update note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    <div className="p-5">
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-slate-100 text-blue-500 w-full p-2 rounded-md border-0 outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
        {filteredNotes.map((note) => (
          <div
            key={note._id}
            className="bg-violet-100 p-5 rounded-lg shadow-md"
          >
            <h1 className="text-2xl font-bold">Title: {note.title}</h1>
            <p className="text-violet-700">Description: {note.description}</p>
            <div className="flex justify-end gap-2 mt-3">
              <button
                onClick={() => {
                  setCurrentNote(note);
                  setIsModelOpen(true);
                }}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => setIsModelOpen(true)}
        className="fixed bottom-4 right-4 bg-violet-600 text-white p-4 rounded-full text-3xl"
      >
        +
      </button>

      {isModelOpen && (
        <Notemodel
          setIsModelOpen={setIsModelOpen}
          addNote={handleAddNote}
          currentNote={currentNote}
          editNote={handleEditNote}
        />
      )}
    </div>
  );
};

export default Home;
