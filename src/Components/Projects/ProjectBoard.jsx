import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";

import Project from "./Project";
import "../../CSS/boardStyle.css";
import ProjectModal from "./modals/ProjectModal";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
import useCallAPI from "../../HOOKS/useCallAPI";
import { FaPlus } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => bgcolorChange(props)};
`;

function bgcolorChange(props) {
  return props.isDragging
    ? "lightgreen"
    : props.isDraggable
    ? props.isBacklog
      ? "#F2D7D5"
      : "#DCDCDC"
    : props.isBacklog
    ? "#F2D7D5"
    : "#fffada";
}

export default function ProjectBoard() {
  const projectsUrl = "/projects/list";

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);

  const { data, loading, error, fetchData } = useCallAPI(projectsUrl, []);
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Update `projects` when `data` changes
  useEffect(() => {
    if (data?.projects) {
      setProjects(data.projects);
    }
  }, [data]);

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
    setCurrentProject({ project_id: projectId });
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentProject(null);
  };

  // Breadcrumb navigation
  const breadcrumbItems = [{ label: "Projects", link: "/project-list" }];

  return (
    <>
      <PageHeaderNav
        pageTitle={""}
        subTitle={""}
        breadcrumbItems={breadcrumbItems}
      />
      <div className="boardStyle" id="elementFull">
        {/* <div className="addTaskDiv">
          <Button
            variant="primary"
            onClick={() =>
              handleOpenAddEditModal({ id: null, title: "", content: "" })
            }
          >
            <MdOutlineAddTask className="addProjectIcon" />
          </Button>
        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="p-5 mt-5">
            <h1>Loading...</h1>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="p-5 mt-5">
            <h1>{error}</h1>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid-container">
          {projects &&
            projects.map((project, key) => (
              <Project
                id={project.project_id}
                key={key}
                projectTitle={project.project_name}
                completed={project.completed}
                moduleNumber={project.module_count}
                onEdit={() => handleOpenAddEditModal(project)}
                onDelete={() => handleOpenDeleteModal(project.project_id)}
                fetchProjects={fetchData} /// fetchProjects={fetchProjects}
              />
            ))}
          <Container
            className="addModule d-flex align-items-center justify-content-center"
            onClick={() =>
              handleOpenAddEditModal({ id: null, title: "", content: "" })
            }
          >
            <FaPlus />
          </Container>
        </div>

        {/* Add/Edit Modal */}
        <ProjectModal
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          project={currentProject}
          fetchProjects={fetchData} /////fetchProjects={fetchProjects}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          projectId={currentProject?.project_id}
          fetchProjects={fetchData} //////fetchProjects={fetchProjects}
        />
      </div>
    </>
  );
}
