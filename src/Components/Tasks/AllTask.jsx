import { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import Task from "./Task"; // Assuming Task component is in the same directory
import { API_URL } from "../Authentication/api"; // Adjust based on your project structure
import "../../CSS/taskStyle.css";
import useCallAPI from "../../HOOKS/useCallAPI";

const AllTask = () => {
  const [users, setUsers] = useState([
    { value: 8, label: "piu" }, // Pre-selected User 1
    { value: 17, label: "John Doe" }, // Pre-selected User 2
  ]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const { data, fetchData } = useCallAPI("/users/list", []);
  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Update `projects` when `data` changes
  useEffect(() => {
    if (data?.Users) {
      const userOptions = data.Users.map((user) => ({
        value: user.user_id,
        label: `${user.first_name ? user.first_name : "No Name"} ${
          user.last_name
        }`,
      }));

      setUsers(userOptions);

      // Ensure pre-selected users exist in the fetched list
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((user) =>
          userOptions.some((opt) => opt.value === user.value)
        )
      );
    }
  }, [data]);

  // Fetch Users for Dropdown
  //   useEffect(() => {
  //     const fetchUsers = async () => {
  //       try {
  //         const response = await axios.get(`${API_URL}/users/list`);
  //         const userOptions = response.data.users.map((user) => ({
  //           value: user.user_id,
  //           label: `${user.first_name} ${user.last_name}`,
  //         }));

  //         setUsers(userOptions);

  //         // Ensure pre-selected users exist in the fetched list
  //         setSelectedUsers((prevSelected) =>
  //           prevSelected.filter((user) =>
  //             userOptions.some((opt) => opt.value === user.value)
  //           )
  //         );
  //       } catch (error) {
  //         console.error("Error fetching users:", error);
  //       }
  //     };

  //     fetchUsers();
  //   }, []);

  const {
    data: fatchedTasks,
    loading,
    error,
    getTasksByUsers,
  } = useCallAPI("/tasks/all-tasks/users");

  // Fetch Tasks Based on Selected Users
  const fetchTasks = async () => {
    let userIds = [];
    if (selectedUsers.length === 0) userIds = [17];
    else userIds = selectedUsers.map((user) => user.value);
    await getTasksByUsers(userIds);
    setTasks(fatchedTasks);
  };

  useEffect(() => {
    getTasksByUsers();
  }, [fatchedTasks]);

  // Fetch Tasks Based on Selected Users
  //   const fetchTasks = async () => {
  //     if (selectedUsers.length === 0) return;
  //     // setLoading(true);

  //     const user_ids = selectedUsers.map((user) => user.value);
  //     console.log("user_ids: ", user_ids);

  //     try {
  //       const response = await axios.post(`${API_URL}/tasks/all-tasks/users`, {
  //         user_ids: user_ids ? user_ids : 17,
  //       });

  //       setTasks(response.data.tasks);
  //     } catch (error) {
  //       console.error("Error fetching tasks:", error);
  //       setTasks([]);
  //     } finally {
  //       //   setLoading(false);
  //     }
  //   };

  console.log("fatchedTasks : ", fatchedTasks);
  console.log("Tasks : ", tasks);

  return (
    <div className="task-page">
      <h2>Task Management</h2>

      {/* User Search Dropdown */}
      <Select
        options={users}
        isMulti
        value={selectedUsers}
        onChange={setSelectedUsers}
        placeholder="Search and select users..."
      />

      <button onClick={fetchTasks} disabled={loading} className="fetch-btn">
        {loading ? "Loading..." : "Fetch Tasks"}
      </button>

      <button onClick={() => setSelectedUsers([])} className="clear-btn">
        Clear Selection
      </button>

      {/* Display Tasks */}
      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div className="m-5">
              <p>{task.task_name} is task name</p>
              {/* <p>{task.description}</p> */}
            </div>
            // <Task key={task.task_id} task={task} index={index} />
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default AllTask;
