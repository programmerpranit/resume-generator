import Input from "@/components/Input";
import type { IProject } from "@/models/Project";
import type { MongoBase } from "@/types/mongo";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, {
  useState,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from "react";
import { addProject, updateProject } from "./actions";
import { toast } from "react-toastify";

interface ProjectType extends IProject, MongoBase {}

interface AddUpdateProjectProps {
  action: string;
  setAction: Dispatch<SetStateAction<string>>;
}

const AddUpdateProject = ({
  action,
  setAction,
}: AddUpdateProjectProps): JSX.Element => {
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");
  const [live, setLive] = useState<string>("");
  const [github, setGithub] = useState<string>("");
  const [desc1, setDesc1] = useState<string>("");
  const [desc2, setDesc2] = useState<string>("");
  const [desc3, setDesc3] = useState<string>("");

  const { data: project } = useQuery<ProjectType | null>({
    queryKey: ["toupdate"],
    initialData: null,
  });

  const { mutate: addUpdateProject } = useMutation({
    mutationKey: ["project"],
    mutationFn: async () => {
      if (action === "Add") {
        return await addProject(
          name,
          start,
          end,
          live,
          github,
          desc1,
          desc2,
          desc3
        );
      } else if (action === "Update") {
        return await updateProject(
          name,
          start,
          end,
          live,
          github,
          desc1,
          desc2,
          desc3,
          project?._id ?? ""
        );
      }
    },

    onSuccess: (data) => {
      setAction("");
      if (action === "Add") {
        queryClient.setQueryData(["projects"], (oldProjects: ProjectType[]) => [
          ...oldProjects,
          data,
        ]);
      } else {
        void queryClient.invalidateQueries({ queryKey: ["projects"] });
      }
      toast.success("Projects Updated Successfully");
    },
    onError: () => {
      toast.error("Failed to Update Projects");
    },
  });

  useEffect(() => {
    if (project === null) return;

    setName(project.name);
    setStart(project.start);
    setEnd(project.end);
    setLive(project.live);
    setGithub(project.github);
    setDesc1(project.desc1);
    setDesc2(project.desc2);
    setDesc3(project.desc3);
  }, [project]);

  return (
    <div
      key={project?._id}
      className={`fixed right-0 top-0 h-screen w-4/5 duration-300 ${action === "" ? "translate-x-full" : "translate-x-0"} no-scrollbar  bg-black bg-opacity-30`}
    >
      <div className="ml-auto h-full w-3/4 overflow-y-scroll bg-white p-5">
        <div className="flex items-center justify-between">
          <h2>{action} Project </h2>
          <p
            onClick={() => {
              setAction("");
            }}
            className="cursor-pointer text-4xl"
          >
            X
          </p>
        </div>
        <Input
          type="text"
          value={name}
          setValue={setName}
          label="Project title"
          className="mt-5"
        />
        <Input
          type="text"
          value={start}
          setValue={setStart}
          label="Start"
          className="mt-3"
        />
        <Input
          type="text"
          value={end}
          setValue={setEnd}
          label="End"
          className="mt-3"
        />
        <Input
          type="text"
          value={github}
          setValue={setGithub}
          label="Github Link"
          className="mt-3"
        />
        <Input
          type="text"
          value={live}
          setValue={setLive}
          label="Deployed Link"
          className="mt-3"
        />
        <Input
          type="text"
          value={desc1}
          setValue={setDesc1}
          label="Description 1"
          className="mt-3"
        />
        <Input
          type="text"
          value={desc2}
          setValue={setDesc2}
          label="Description 2"
          className="mt-3"
        />
        <Input
          type="text"
          value={desc3}
          setValue={setDesc3}
          label="Description 3"
          className="mt-3"
        />
        <button
          onClick={() => {
            addUpdateProject();
          }}
          className="mt-5 bg-black"
        >
          {action} Project
        </button>
      </div>
    </div>
  );
};

export default AddUpdateProject;
