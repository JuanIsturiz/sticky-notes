import { useNavigate } from "react-router-dom";
import { Note } from "../types";

interface NoteCardProps {
  note: Note;
  redirect: string;
}

const formatNote = (body: string) => {
  if (body.includes("\n")) {
    const firstBreakIdx = body.indexOf("\n");

    const title =
      body.substring(0, firstBreakIdx).length > 25
        ? `${body.substring(0, firstBreakIdx).substring(0, 25)}...`
        : body.substring(0, firstBreakIdx);

    const description =
      body.substring(firstBreakIdx, body.length).length > 165
        ? `${body.substring(firstBreakIdx, body.length).substring(0, 165)}...`
        : body.substring(firstBreakIdx, body.length);

    return {
      title,
      description,
    };
  } else {
    if (body.length > 165) {
      return {
        title: "",
        description: `${body.substring(0, 165)}...`,
      };
    } else {
      return {
        title: "",
        description: body.substring(0, 165),
      };
    }
  }
};

const NoteCard: React.FC<NoteCardProps> = ({ note, redirect }) => {
  const navigate = useNavigate();
  const {
    id,
    author,
    body,
    created,
    last_user,
    private: read_only,
    updated,
  } = note;

  const { title, description } = formatNote(body);

  return (
    <div
      className="cursor-pointer h-80 w-80 bg-custom-1 border border-custom-2 p-2 flex flex-col justify-between shadow-md shadow-custom-2 transition-transform hover:scale-95"
      onClick={() => navigate(`/notes${redirect}`)}
    >
      <div>
        <h5 className="text-lg font-medium text-custom-5">{title}</h5>
        <p className="text-custom-4">{description}</p>
      </div>
      <div className="border-t border-t-custom-3 pt-1.5 px-0.5 flex justify-between items-center">
        <p className="text-sm px-1 py-0.5 bg-custom-2 font-medium text-custom-5 rounded-sm">
          {read_only ? "Read Only" : "Public"}
        </p>
        <p className="text-sm font-medium text-custom-5">
          @{last_user.username}
        </p>
        <p className="text-sm font-medium text-custom-5">
          {updated.substring(5)}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
