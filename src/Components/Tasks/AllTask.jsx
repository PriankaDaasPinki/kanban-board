import { useEffect, useLayoutEffect, useState } from "react";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";

import "../../CSS/taskStyle.css";
import useCallAPI from "../../HOOKS/useCallAPI";
import { useSelector } from "react-redux";
import { useUser } from "../Authentication/authSlice";

const AllTask = () => {
  // Get the logged-in user from Redux
  const user = useSelector(useUser);
  const activeUserID = user.user.user_id;
  const activeUser = user.user.first_name + " " + user.user.last_name;

  const {
    data,
    loading: userloading,
    fetchData,
  } = useCallAPI("/users/list", []);
  const [users, setUsers] = useState([
    { value: null, label: userloading && "loading..." },
  ]);
  const [selectedUsers, setSelectedUsers] = useState([
    { value: activeUserID, label: userloading ? "loading..." : activeUser },
  ]);
  const [tasks, setTasks] = useState([]);
  //   const [loading, setLoading] = useState(false);

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
        prevSelected?.filter((user) =>
          userOptions.some((opt) => opt.value === user.value)
        )
      );
    }
  }, [data]);

  const {
    data: fatchedTasks,
    loading,
    error,
    getTasksByUsers,
  } = useCallAPI("/tasks/all-tasks/users");

  // Fetch Tasks Based on Selected Users
  const fetchTasks = async (selectedOptions = selectedUsers) => {
    let userIds =
      selectedOptions?.length === 0
        ? [activeUserID]
        : selectedOptions.map((user) => user.value);
    await getTasksByUsers(userIds);
  };

  // Handle change event for Select component
  const onChangeHandle = async (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    await fetchTasks(selectedOptions); // Fetch new tasks immediately
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Update tasks as soon as `fatchedTasks` changes
  useEffect(() => {
    if (fatchedTasks) {
      setTasks(fatchedTasks);
    }
  }, [fatchedTasks]);

  

  return (
    <div className="task-page">
      {/* User Search Dropdown */}
      <div className="d-flex w-100 justify-content-center p-2">
        <Select
          options={users}
          isMulti
          value={selectedUsers}
          onChange={onChangeHandle}
          placeholder="Search and select users..."
          className="w-100"
        />

        <button
          onClick={fetchTasks}
          disabled={loading}
          className="btn btn-danger px-4"
        >
          {loading ? "Loading..." : <CiSearch />}
        </button>

        {/* <button onClick={() => setSelectedUsers([])} className="clear-btn">
          Clear Selection
        </button> */}
      </div>

      {/* Display Tasks */}
      <div className="task-list">
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks?.length > 0 ? (
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
