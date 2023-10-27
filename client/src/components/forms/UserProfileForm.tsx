import { useNavigate } from "react-router-dom";
import z from "zod";
import { UserProfileSchema } from "../../lib/validations";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../contexts/user-context";
import { useEffect, useRef, useState } from "react";
import { ImageOff } from "lucide-react";
import { updateProfile } from "../../api/user.api";
import toast from "react-hot-toast";
const UserProfileForm = () => {
  const navigate = useNavigate();
  const { user, profile, setProfile } = useUserContext();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<z.infer<typeof UserProfileSchema>>({
    resolver: zodResolver(UserProfileSchema),
  });
  const [image, setImage] = useState<{ url: string; name: string } | null>(
    null
  );
  useEffect(() => {
    if (!profile) {
      setValue("first_name", "");
      setValue("last_name", "");
      setValue("bio", "");
      setValue("image", undefined);
      return;
    }
    if (profile.image) {
      setImage({ url: profile.image, name: "Your Profile Picture" });
    }
    setValue("first_name", profile?.first_name ?? "");
    setValue("last_name", profile?.last_name ?? "");
    setValue("bio", profile?.bio ?? "");
    setValue("image", profile?.image ?? "");
  }, [profile]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onSubmit = async (data: z.infer<typeof UserProfileSchema>) => {
    const res = await updateProfile({
      ...data,
      id: user?.id ?? "",
      image: image?.url ?? undefined,
    });
    if (res.updated) {
      setProfile(res.profile);
      navigate("/profile");
      toast.success("Profile Updated Successfully");
    } else {
      reset();
      setImage(null);
      toast.error("Failed to Update Profile\nPlease Try Again");
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label htmlFor="image" className="text-gray-300 font-medium mb-1">
            Profile Picture
          </label>
          <div className="flex gap-4 items-center">
            {image && (
              <img
                src={image.url}
                alt="Selected image"
                className="rounded-full w-32 border-2 border-custom-3"
              />
            )}
            {!image && <ImageOff size={96} color="#5C8374" />}
            <div className="space-y-2">
              {image && <p className="text-xl text-gray-300">{image.name}</p>}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-custom-2 text-lg text-gray-300 font-medium py-1.5 px-3 rounded-sm hover:opacity-90"
              >
                {image ? "Update Image" : "Upload Image"}
              </button>
            </div>
          </div>
          <Controller
            control={control}
            name={"image"}
            rules={{ required: "Recipe picture is required" }}
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <input
                  {...field}
                  value={value?.fileName}
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(event) => {
                    if (!event.target.files) return;
                    const fileReader = new FileReader();
                    const file = event.target.files[0];
                    fileReader.onload = async (event) => {
                      const imageDataUrl =
                        event.target?.result?.toString() || "";
                      setImage({ url: imageDataUrl, name: file.name });
                      onChange(file);
                    };
                    fileReader.readAsDataURL(file);
                  }}
                  type="file"
                  id="picture"
                />
              );
            }}
          />
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.image?.message?.toString()}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="first" className="text-gray-300 font-medium mb-1">
            First Name
          </label>
          <input
            id="first"
            type="text"
            placeholder="John"
            className="text-white bg-custom-2 p-1.5 border-none outline-none rounded-sm focus:ring-0"
            {...register("first_name", { required: true })}
          />
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.first_name?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="last" className="text-gray-300 font-medium mb-1">
            Last Name
          </label>
          <input
            id="last"
            type="text"
            placeholder="Doe"
            className="text-white bg-custom-2 p-1.5 border-none outline-none rounded-sm focus:ring-0"
            {...register("last_name", { required: true })}
          />
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.last_name?.message}
          </span>
        </div>
        <div className="flex flex-col">
          <label htmlFor="bio" className="text-gray-300 font-medium mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            rows={5}
            placeholder="I'm a web developer..."
            className="text-white bg-custom-2 p-1.5 border-none outline-none rounded-sm focus:ring-0"
            {...register("bio")}
          ></textarea>
          <span className="text-sm font-medium text-red-500 mt-1 ml-1">
            {errors.bio?.message}
          </span>
        </div>
        <button className="w-2/3 py-1.5 px-3 mt-2 bg-custom-4 font-bold text-lg mx-auto rounded-sm transition-opacity hover:opacity-80">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfileForm;
