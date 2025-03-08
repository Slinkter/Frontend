import React from "react";
import SectionTitle from "./otros/SectionTitle";
import { projects } from "./data";
import ProjectsCard from "./otros/ProjectsCard";

const Projects = () => {
  return (
    <section className="py-20 ">
      <SectionTitle text="web creations" />
      <div className="pt-16 grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => {
          return <ProjectsCard key={project.id} {...project} />;
        })}
      </div>
    </section>
  );
};

export default Projects;
