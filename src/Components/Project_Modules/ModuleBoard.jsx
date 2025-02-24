// /* eslint-disable */
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import "../../CSS/boardStyle.css";

import Module from "./Module";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
import AddModule from "./modals/New_Module_Modal";
import ModulePageHeader from "../Common/Header/Module_Page_Header/ModulePageHeader";
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

export default function ModuleBoard() {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  const [modules, setModules] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const location = useLocation();
  const project_id = location.state?.id; // Access the passed value

  const projectModuleUrl = `/project_module/${project_id}`;
  const { data, loading, error, fetchData } = useCallAPI(projectModuleUrl, []);
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Update `module` when `data` changes
  useEffect(() => {
    if (data) {
      setModules(data.project_modules);
    }
  }, [data]);

  console.log("data  ", data);

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
        {/* <div className="addTaskDiv">
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
        </div> */}

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
          {modules?.length > 0 ? (
            <>
              {module && modules?.map((module, key) => (
              <>
                <Module
                  moduleId={module?.module_id}
                  projectName={name}
                  project_id={project_id}
                  position={key}
                  moduleTitle={module.module_name}
                  completed={module.completed}
                  taskNumber={module.task_count}
                  onEdit={() => handleOpenAddEditModal(module)}
                  onDelete={() => handleOpenDeleteModal(module?.module_id)}
                />
              </>
              ))}
              <Container
                className="addModule d-flex align-items-center justify-content-center"
                onClick={() =>
                  handleOpenAddEditModal({
                    id: "",
                    module_name: "",
                    description: "",
                    content: "",
                  })
                }
              >
                <FaPlus />
              </Container>
            </>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h3 className="pt-5">No Module Found for project - {name}</h3>
              <Container
                className="addModule w-100"
                onClick={() =>
                  handleOpenAddEditModal({
                    id: "",
                    module_name: "",
                    description: "",
                    content: "",
                  })
                }
              >
                <FaPlus />
              </Container>
            </div>
          )}
        </div>

        {/* Add/Edit Modal */}
        <AddModule
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          module={currentModule}
          project_id={project_id}
          fetchProject_Module={fetchData} ///fetchProject_Module={fetchProject_Module}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          moduleId={currentModule?.module_id}
          fetchProject_Module={fetchData} //fetchProject_Module={fetchProject_Module}
        />
      </div>
    </>
  );
}
