import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";


const Notemodel = ({
  setIsModelOpen,
  addNote,
  currentNote,
  editNote,
 
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote._id, title, description);
      toast.success("Update Notes Successfully");
      setIsModelOpen(false);
    } else {
      addNote(title, description);
      toast.success("Notes Add Successfully");
      setIsModelOpen(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      onClick={() => setIsModelOpen(false)}
    >
      <div
        className="bg-white p-8 rounded-md md:w-[50%]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          {currentNote ? "Edit Notes" : "Add Notes"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title here ..."
              className="w-full border-none bg-slate-300 outline-none p-3 shadow-slate-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              className="w-full border-none bg-slate-300 outline-none p-10 shadow-slate-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="bg-violet-600 text-white font-bold p-3 w-full"
            >
              {currentNote ? "EDIT NOTE" : "ADD NOTE"}
            </button>
          </div>

          <p
            onClick={() => setIsModelOpen(false)}
            className="mt-5 text-red-500 cursor-pointer text-center font-semibold"
          >
            Close
          </p>
        </form>
      </div>
    </div>
  );
};

export default Notemodel;
