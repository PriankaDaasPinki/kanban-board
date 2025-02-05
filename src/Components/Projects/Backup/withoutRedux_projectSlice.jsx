import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-api-url.com"; // replace with your actual API URL
const projectsUrl = API_URL + "/projects/list";
const createProjectUrl = API_URL + "/projects/create";
const updateProjectUrl = API_URL + "/projects/update";
const deleteProjectUrl = API_URL + "/projects";

// Main component for managing projects
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(projectsUrl);
      setProjects(res.data.projects);
      setError(null);
    } catch (err) {
      setError("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (newProject) => {
    setLoading(true);
    try {
      const res = await axios.post(createProjectUrl, newProject);
      setProjects((prevProjects) => [...prevProjects, res.data.project]);
      setError(null);
    } catch (err) {
      setError("Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProject = async (id, updatedData) => {
    setLoading(true);
    try {
      const res = await axios.put(`${updateProjectUrl}/${id}`, updatedData);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === id ? res.data.project : project
        )
      );
      setError(null);
    } catch (err) {
      setError("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${deleteProjectUrl}/${id}`);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      setError(null);
    } catch (err) {
      setError("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  // Fetch projects when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div>
      <h1>Projects List</h1>

      {/* Loading & Error States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* List of Projects */}
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span>{project.title}</span>
            <button onClick={() => handleUpdateProject(project.id, { title: "Updated Title" })}>Update</button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add New Project */}
      <button onClick={() => handleCreateProject({ title: "New Project", description: "New Project Description" })}>
        Add New Project
      </button>
    </div>
  );
};

export default Projects;