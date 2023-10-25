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
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUserContext();

  useEffect(() => {
    const loadNotes = async () => {
      setLoading(true);
      const res = await getUserNotes(user?.id ?? "");
      setNotes(res.notes);
      setLoading(false);
    };
    loadNotes();
  }, [user]);

  return (
    <div className="p-2">
      <div className="flex justify-between p-2 border-b border-b-custom-3">
        <h1 className="text-2xl text-custom-4 font-medium">
          Notes: <span className="text-custom-5">{notes.length}</span>
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
      {!loading ? (
        <div className="grid grid-cols-4 gap-4 py-2 px-10 place-items-center">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      ) : (
        <div className="p-8">
          <p className="text-2xl text-custom-5 text-center font-medium animate-pulse">
            Loading Notes...
          </p>
        </div>
      )}
    </div>
  );
};

export default NotesPage;
