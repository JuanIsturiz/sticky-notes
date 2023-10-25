import { useEffect, useState } from "react";
import { useUserContext } from "../contexts/user-context";
import { getUserNotes } from "../api/note.api";
import { Note } from "../types";
import NoteCard from "../components/NoteCard";
import { StickyNote } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotesPage = () => {
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Array<Note>>([]);

  const { user } = useUserContext();

  useEffect(() => {
    const loadNotes = async () => {
      const res = await getUserNotes(user?.id ?? "");
      setNotes(res.notes);
    };
    loadNotes();
  }, [user]);

  return (
    <div className="p-2">
      <div className="flex justify-between p-2 border-b border-b-custom-3">
        <h1 className="text-2xl text-custom-5 font-medium">
          Notes {notes.length}
        </h1>
        <div
          className="group cursor-pointer flex items-center gap-1 py-1 px-2 bg-custom-3 rounded transition-colors hover:bg-custom-4"
          onClick={() => navigate("/notes/new")}
        >
          <StickyNote
            size={24}
            color="#d1d5db"
            className="group-hover:invert"
          />
          <p className="text-gray-300 text-lg font-medium group-hover:invert">
            New Note
          </p>
        </div>
      </div>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesPage;
