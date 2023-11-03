import { zodResolver } from "@hookform/resolvers/zod";
import { TeamSearchSchema } from "../../lib/validations";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
const SearchTeamForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<z.infer<typeof TeamSearchSchema>>({
    resolver: zodResolver(TeamSearchSchema),
  });

  const onSubmit = (data: z.infer<typeof TeamSearchSchema>) => {
    if (!data.query) {
      navigate(`/teams`);
    } else {
      navigate(`/teams?q=${data.query}`);
    }
  };
  return (
    <div className="bg-custom-3 rounded-sm px-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-between"
      >
        <input
          className="bg-transparent border-none outline-none focus:ring-0 font-medium text-custom-5 placeholder:text-custom-4"
          type="text"
          placeholder="Search Teams..."
          autoComplete="off"
          {...register("query", { required: true })}
        />
        <div className="hidden md:flex items-center gap-1">
          <div className="w-[1px] h-8 bg-custom-4"></div>
          <button>
            <Search color="#5C8374" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchTeamForm;
