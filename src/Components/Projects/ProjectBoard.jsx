import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjects } from "./ProjectSlice";
import Project from "./Project";
import "../../CSS/boardStyle.css";
import ProjectModal from "./modals/ProjectModal";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";

export default function ProjectBoard() {
  const dispatch = useDispatch();
  const { isLoading, projects, error } = useSelector(
    (state) => state.projectsReducer
  );
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  // Fetch projects on mount
  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Open Add/Edit Modal
  const handleOpenAddEditModal = (project) => {
    setCurrentProject(project);
    setShowAddEditModal(true);
  };

  // Close Add/Edit Modal
  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setCurrentProject(null);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (projectId) => {
    setCurrentProject({ id: projectId });
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentProject(null);
  };

  // const pageTitle = (titleFromProject) => {
  //   console.log("titleFromProject " + titleFromProject);
  // };

  const breadcrumbItems = [{ label: "Projects", link: "/project-list" }];

  return (
    <>
      <PageHeaderNav
        pageTitle={""}
        subTitle={""}
        breadcrumbItems={breadcrumbItems}
      />
      <div className="boardStyle" id="elementFull">
        <div className="addTaskDiv">
          <Button
            variant="primary"
            onClick={() =>
              handleOpenAddEditModal({ id: null, title: "", content: "" })
            }
          >
            <MdOutlineAddTask className="addProjectIcon" />
          </Button>
        </div>

        {isLoading && (
          <div className="p-5 mt-5">
            <h1>Loading......</h1>
          </div>
        )}
        {error && (
          <div className="p-5 mt-5">
            <h1>{error}</h1>
          </div>
        )}

        <div className="grid-container">
          {projects &&
            projects.map((project, key) => (
              <Project
                key={project.id}
                id={project.id}
                index={key}
                projectTitle={project.title}
                completed={project.completed}
                onEdit={() => handleOpenAddEditModal(project)}
                onDelete={() => handleOpenDeleteModal(project.id)}
              />
            ))}
        </div>

        {/* Add/Edit Modal */}
        <ProjectModal
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          project={currentProject}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          projectId={currentProject?.id}
        />
      </div>
    </>
  );
}
