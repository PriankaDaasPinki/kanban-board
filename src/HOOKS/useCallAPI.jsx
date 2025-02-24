import { useState } from "react";
import { API_URL } from "../Components/Authentication/api";
import axios from "axios";

/**
 * useCRUD: A reusable CRUD hook for API interactions
 * @param {string} baseUrl - The base URL for the API endpoint
 * @param {Object} defaultData - Default data for the hook's state
 * @returns {Object} - CRUD operations and states
 */
const useCallAPI = (baseUrl, defaultData = []) => {
  const [data, setData] = useState(defaultData); // Store fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  console.log("loading ", loading);
  // Fetch data from the API

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${API_URL.replace(/\/$/, "")}/${baseUrl.replace(/^\//, "")}`
      );
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // // Fetch data when the hook is mounted
  // useEffect(() => {
  //   let isMounted = true;

  //   const fetchDataSafe = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const response = await axios.get(`${API_URL.replace(/\/$/, "")}/${baseUrl.replace(/^\//, "")}`);
  //       if (isMounted) setData(response.data);
  //     } catch (err) {
  //       if (isMounted) setError(err.response?.data?.message || err.message);
  //     } finally {
  //       if (isMounted) setLoading(false);
  //     }
  //   };

  //   fetchDataSafe();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [baseUrl]);

  const getTasksByUsers = async (userIds) => {
    if (!userIds || userIds.length === 0) return; // Avoid unnecessary requests

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL.replace(/\/$/, "")}/${baseUrl.replace(/^\//, "")}`,
        { user_ids: userIds } // Send as an array
      );
      setData(response.data?.tasks || []); // Update state with tasks or empty array
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError(error.response?.data?.message || error.message);
      setData([]); // Reset tasks on error
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    getTasksByUsers,
  };
};

export default useCallAPI;
