import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import Project from "./Project";
import "../../CSS/boardStyle.css";
import ProjectModal from "./modals/ProjectModal";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
// import api from "../Authentication/api"; // Assuming you have api.js file with axios instance
import axios from "axios";
import { API_URL } from "../Authentication/api";

export default function ProjectBoard() {
  const projectsUrl = "/projects/list";
  // const createProjectUrl = "/projects/create";
  // const updateProjectUrl = "/projects/update";
  // const deleteProjectUrl = "/projects";

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null); // Clear previous error if any
    try {
      // const response = await api.get(projectsUrl);
      const response = await axios.get(API_URL + projectsUrl);
      setProjects(response.data.projects); // Assuming the API response has 'projects'
    } catch (err) {
      setError("Failed to fetch projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects(); // Fetch data when the component mounts
  }, []);

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
    setCurrentProject(projectId);
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
                onEdit={() => handleOpenAddEditModal(project)}
                onDelete={() => handleOpenDeleteModal(project.project_id)}
                fetchProjects={fetchProjects}
              />
            ))}
        </div>

        {/* Add/Edit Modal */}
        <ProjectModal
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          project={currentProject}
          fetchProjects={fetchProjects}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          projectId={currentProject}
          fetchProjects={fetchProjects}
        />
      </div>
    </>
  );
}
