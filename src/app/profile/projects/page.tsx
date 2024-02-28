import React from "react";
import ProjectsPage from "./ProjectsPage";
import { getUserProjects } from "./actions";

const Projects = async (): Promise<JSX.Element> => {
  const projects = await getUserProjects();

  return <ProjectsPage />;
};

export default Projects;
