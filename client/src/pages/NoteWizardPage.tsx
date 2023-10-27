import { zodResolver } from "@hookform/resolvers/zod";
import { NewNoteSchema } from "../lib/validations";
import { useForm } from "react-hook-form";
import z from "zod";
import { ChevronLeft } from "lucide-react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  createNote,
  deleteNote,
  getNoteById,
  updateNote,
} from "../api/note.api";
import { useUserContext } from "../contexts/user-context";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

const NoteWizardPage = () => {
  const [search, _] = useSearchParams();

  const { user } = useUserContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const to = search.get("team") ? `/teams/${search.get("team")}` : "/notes";

  const { register, handleSubmit, setValue } = useForm<
    z.infer<typeof NewNoteSchema>
  >({
    resolver: zodResolver(NewNoteSchema),
  });

  const [initial, setInitial] = useState<{
    username: string;
    body: string;
    private: boolean;
  } | null>(null);

  const [loading, setLoading] = useState<{ enabled: boolean; label: string }>({
    enabled: false,
    label: "",
  });

  useEffect(() => {
    if (id) {
      const loadNote = async () => {
        setLoading({ enabled: true, label: "Loading..." });
        const res = await getNoteById(id);
        setValue("private", res.note.private);
        setValue("body", res.note.body);
        setInitial({
          username: res.note.last_user.username,
          body: res.note.body,
          private: res.note.private,
        });
        setLoading({ enabled: false, label: "" });
      };
      loadNote();
    }
  }, []);

  const onSubmit = async (data: z.infer<typeof NewNoteSchema>) => {
    if (
      (!data.body && !id) ||
      (initial?.body === data.body && initial?.private === data.private)
    ) {
      navigate(to);
      return;
    }

    setLoading({ enabled: true, label: "Saving..." });

    if (!data.body && id) {
      const res = await deleteNote(id);
      if (res.deleted) {
        toast.success("Note Deleted Successfully!");
        navigate(to);
      } else {
        toast.error("Failed to Delete Note\nPlease Try Again");
      }
      return;
    }
    if (!id) {
      const res = await createNote({
        ...data,
        author: user?.id ?? "",
        last_user: user?.id ?? "",
        team: search.get("team") ?? null,
      });
      if (res.created) {
        toast.success("New Note Added Successfully!");
        navigate(to);
      } else {
        toast.error("Failed to Add New Note\nPlease Try Again");
      }
    } else {
      const res = await updateNote({
        id,
        data: {
          ...data,
          last_user: user?.id ?? "",
        },
      });
      if (res.updated) {
        toast.success("Note Updated Successfully!");
        navigate(to);
      } else {
        toast.error("Failed to Update Note\nPlease Try Again");
      }
    }
    setLoading({ enabled: false, label: "" });
  };

  return (
    <div className="max-w-xl mx-auto p-4 mt-4 bg-custom-1 rounded-sm shadow-lg border border-gray-950 shadow-custom-1">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center border-b border-b-custom-2 p-0.5">
          <button
            className="group cursor-pointer h-6 flex items-center pb-1"
            type="submit"
            disabled={loading.enabled}
          >
            <ChevronLeft
              size={24}
              color="#5C8374"
              className="transition-transform group-hover:-translate-x-1"
            />
            <p className="text-xl text-custom-4">Back</p>
          </button>
          {loading.enabled ? (
            <div className="pb-0.5 text-lg font-medium text-custom-4 animate-pulse">
              <p>{loading.label}</p>
            </div>
          ) : (
            <>
              {!initial?.private && !loading.enabled && id && (
                <div className="grid place-content-center h-6 pb-1.5">
                  <p className="text-custom-4">
                    Last user:{" "}
                    <span className="font-bold">@{initial?.username}</span>
                  </p>
                </div>
              )}
              <div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    {...register("private")}
                  />
                  <div className="w-11 h-6 bg-custom-2 rounded-full peer peer-focus:ring-0 peer-checked:after:translate-x-full peer-checked:after:border-custom-5 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-custom-5 after:border-custom-5 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-custom-3"></div>
                  <span className="ml-3 font-medium text-custom-4">
                    Read Only
                  </span>
                </label>
              </div>
            </>
          )}
        </div>
        <textarea
          autoFocus
          className="w-full min-h-[60vh] text-lg bg-transparent caret-custom-5 text-custom-5 rounded-sm resize-none border-none outline-none focus:ring-0"
          {...register("body")}
        ></textarea>
      </form>
    </div>
  );
};

export default NoteWizardPage;
