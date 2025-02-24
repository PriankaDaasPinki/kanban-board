import { useEffect, useState } from "react";
import Select from "react-select";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

import "../../CSS/taskStyle.css";
import useCallAPI from "../../HOOKS/useCallAPI";
import { useUser } from "../Authentication/authSlice";
import BoardForAllTasks from "./BoardForAllTasks";

const AllTask = () => {
  const user = useSelector(useUser);
  const activeUserID = user.user.user_id;
  const activeUser = user.user.first_name + " " + user.user.last_name;

  const {
    data,
    loading: userloading,
    fetchData,
  } = useCallAPI("/users/list", []);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
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

      // Ensure active user is in selection by default
      setSelectedUsers((prevSelected) => {
        return prevSelected.length > 0
          ? prevSelected
          : [{ value: activeUserID, label: activeUser }];
      });
    }
  }, [data]);

  const {
    data: fatchedTasks,
    loading,
    getTasksByUsers,
  } = useCallAPI("/tasks/all-tasks/users");

  // Fetch Tasks Based on Selected Users
  const fetchTasks = async (selectedOptions = selectedUsers) => {
    const userIds =
      selectedOptions.length > 0
        ? selectedOptions.map((user) => user.value)
        : [activeUserID];
    await getTasksByUsers(userIds);
  };

  // Handle change event for Select component
  const onChangeHandle = async (selectedOptions) => {
    setSelectedUsers(selectedOptions);
    await fetchTasks(selectedOptions); // Fetch new tasks immediately
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [selectedUsers]);

  // Update tasks as soon as `fatchedTasks` changes
  useEffect(() => {
    if (fatchedTasks) {
      setTasks(fatchedTasks);
    }
  }, [fatchedTasks]);

  // const dateFormate = (dateToFormate) => {
  //   const today = new Date(dateToFormate);
  //   const month = today.getMonth() + 1;
  //   const year = today.getFullYear();
  //   const date = today.getDate();
  //   const formatedDate = month + "/" + date + "/" + year;
  //   return formatedDate;
  // };

  // const handleDragEnd = ({ destination, source, draggableId }) => {
  //   if (!destination) return;
  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return;
  //   }

  //   const start = data.columns[source.droppableId];
  //   const finish = data.columns[destination.droppableId];

  //   if (start === finish) {
  //     const newTaskIds = Array.from(start.taskIds);
  //     newTaskIds.splice(source.index, 1);
  //     newTaskIds.splice(destination.index, 0, draggableId);
  //     setData({
  //       ...data,
  //       columns: {
  //         ...data.columns,
  //         [start.id]: { ...start, taskIds: newTaskIds },
  //       },
  //     });
  //     // const newColumn = {
  //     //   ...start,
  //     //   taskIds: newTaskIds,
  //     // };

  //     // const newState = {
  //     //   ...data,
  //     //   columns: {
  //     //     ...data.columns,
  //     //     [newColumn.id]: newColumn,
  //     //   },
  //     // };

  //     // setData(newState);
  //     return;
  //   }

  //   const startTaskIds = Array.from(start.taskIds);
  //   startTaskIds.splice(source.index, 1);
  //   // const newStart = {
  //   //   ...start,
  //   //   taskIds: startTaskIds,
  //   // };

  //   const finishTaskIds = Array.from(finish.taskIds);
  //   finishTaskIds.splice(destination.index, 0, draggableId);
  //   // const newFinish = {
  //   //   ...finish,
  //   //   taskIds: finishTaskIds,
  //   // };

  //   // const newState = {
  //   //   ...data,
  //   //   columns: {
  //   //     ...data.columns,
  //   //     [newStart.id]: newStart,
  //   //     [newFinish.id]: newFinish,
  //   //   },
  //   // };

  //   // setData(newState);

  //   setData({
  //     ...data,
  //     columns: {
  //       ...data.columns,
  //       [start.id]: { ...start, taskIds: startTaskIds },
  //       [finish.id]: { ...finish, taskIds: finishTaskIds },
  //     },
  //   });
  // };

  console.log("tasks ", tasks);

  return (
    <>
      {/* User Search Dropdown */}
      <div className="d-flex w-100 justify-content-center taskSearchBar">
        <Select
          options={users}
          isMulti
          value={selectedUsers}
          onChange={onChangeHandle}
          placeholder={
            userloading ? "Loading users..." : "Search and select users..."
          }
          className="w-100 pe-1"
        />

        <div className="d-flex align-items-center">
          <button
            onClick={() => fetchTasks(selectedUsers)}
            disabled={loading}
            className="btn btn-danger"
          >
            {loading ? "Loading..." : <CiSearch className="iconStyle" />}
          </button>
        </div>
      </div>

      <BoardForAllTasks tasks={tasks} />
    </>
  );
};

export default AllTask;
