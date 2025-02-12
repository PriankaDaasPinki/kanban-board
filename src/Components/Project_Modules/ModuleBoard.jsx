// /* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

import "../../CSS/boardStyle.css";

import Module from "./Module";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
import AddModule from "./modals/New_Module_Modal";
import ModulePageHeader from "../Common/Header/Module_Page_Header/ModulePageHeader";

import { API_URL } from "../Authentication/api";

export default function ModuleBoard() {
  const location = useLocation();
  console.log("location of module board", location);
  const project_id = location.state?.id; // Access the passed value

  const projectModuleUrl = `/project_module/${project_id}`;

  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch projects
  const fetchProject_Module = async () => {
    setLoading(true);
    setError(null); // Clear previous error if any
    try {
      const response = await axios.get(API_URL + projectModuleUrl);
      setModules(response.data.project_modules);
    } catch (err) {
      setError("Failed to fetch project module.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProject_Module(); // Fetch data when the component mounts
    // eslint-disable-next-line
  }, []);

  // Open Add/Edit Modal
  const handleOpenAddEditModal = (module) => {
    setCurrentModule(module);
    setShowAddEditModal(true);
  };

  // Close Add/Edit Modal
  const handleCloseAddEditModal = () => {
    setShowAddEditModal(false);
    setCurrentModule(null);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (moduleId) => {
    setCurrentModule({ module_id: moduleId });
    setShowDeleteModal(true);
  };

  // Close Delete Modal
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setCurrentModule(null);
  };

  const breadcrumbItems = [
    // { label: <FaHome className="nav-icon" />, link: "/" },
    { label: "Projects", link: "/project-list" },
    { label: "Modules", link: "#" },
  ];

  const { name } = useParams();

  return (
    <>
      <PageHeaderNav
        pageTitle={name}
        subTitle={"Project Details"}
        breadcrumbItems={breadcrumbItems}
      />
      <ModulePageHeader />
      <div className="boardStyle" id="elementFull">
        <div className="addTaskDiv">
          <Button
            variant="primary"
            onClick={() =>
              handleOpenAddEditModal({
                id: "",
                module_name: "",
                description: "",
                content: "",
              })
            }
          >
            <MdOutlineAddTask className="addModuleIcon" />
          </Button>
        </div>

        {loading && (
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
          {modules.length > 0 ? (
            modules &&
            modules.map((module, key) => (
              <>
                <Module
                  moduleId={module.module_id}
                  projectName={name}
                  project_id={project_id}
                  position={key}
                  moduleTitle={module.module_name}
                  completed={module.completed}
                  onEdit={() => handleOpenAddEditModal(module)}
                  onDelete={() => handleOpenDeleteModal(module.module_id)}
                />
              </>
            ))
          ) : (
            <h3 className="pt-5">No Module Found for project - {name}</h3>
          )}
        </div>

        {/* Add/Edit Modal */}
        <AddModule
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          module={currentModule}
          project_id={project_id}
          fetchProject_Module={fetchProject_Module}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          moduleId={currentModule?.module_id}
          fetchProject_Module={fetchProject_Module}
        />
      </div>
    </>
  );
}
