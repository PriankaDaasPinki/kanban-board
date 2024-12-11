import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdOutlineAddTask } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { fetchModules } from "./ModuleSlice";
import Module from "./Module";
import "../../CSS/boardStyle.css";
import DeleteModal from "./modals/DeleteModal";
import PageHeaderNav from "../Common/Header/PageHeaderNav";
// eslint-disable-next-line
import AddModule from "./modals/New_Module_Modal";
import { useParams } from "react-router-dom";
import ModulePageHeader from "../Common/Header/Module_Page_Header/ModulePageHeader";

export default function ModuleBoard() {
  const dispatch = useDispatch();
  const { isLoading, modules, error } = useSelector(
    (state) => state.modulesReducer
  );
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentModule, setCurrentModule] = useState(null);
  // const [currentModule, setCurrentModule] = useState(null);

  // Fetch modules on mount
  useEffect(() => {
    dispatch(fetchModules());
  }, [dispatch]);

  // Open Add/Edit Modal
  const handleOpenAddEditModal = (module) => {
    console.log(module);
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
    setCurrentModule({ id: moduleId });
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
              handleOpenAddEditModal({ id: null, title: "", content: "" })
            }
          >
            <MdOutlineAddTask className="addModuleIcon" />
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
          {modules &&
            modules.map((module, key) => (
              <>
                <Module
                  id={module.id}
                  projectName={name}
                  position={key}
                  moduleTitle={module.title}
                  completed={module.completed}
                  onEdit={() => handleOpenAddEditModal(module)}
                  onDelete={() => handleOpenDeleteModal(module.id)}
                />
              </>
            ))}
        </div>

        {/* Add/Edit Modal */}
        <AddModule
          show={showAddEditModal}
          onClose={handleCloseAddEditModal}
          module={currentModule}
        />

        {/* Delete Warning Modal */}
        <DeleteModal
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          moduleId={currentModule?.id}
        />
      </div>
    </>
  );
}
