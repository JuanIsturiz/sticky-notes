import { useNavigate } from "react-router-dom";
import { Note } from "../types";

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    body,
    created,
    last_user,
    private: read_only,
    team,
    updated,
  } = note;
  return (
    <div className="border h-56" onClick={() => navigate(`/notes/${id}`)}>
      {body}
    </div>
  );
};

export default NoteCard;
