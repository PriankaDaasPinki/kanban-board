import { useState, useEffect } from "react";

/**
 * useCRUD: A reusable CRUD hook for API interactions
 * @param {string} baseUrl - The base URL for the API endpoint
 * @param {Object} defaultData - Default data for the hook's state
 * @returns {Object} - CRUD operations and states
 */
const useCRUD = (baseUrl, defaultData = []) => {
  const [data, setData] = useState(defaultData); // Store fetched data
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create new data
  const createData = async (newItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!response.ok) {
        throw new Error(`Failed to create item: ${response.statusText}`);
      }
      const createdItem = await response.json();
      setData((prevData) => [...prevData, createdItem]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update existing data
  const updateData = async (id, updatedItem) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!response.ok) {
        throw new Error(`Failed to update item: ${response.statusText}`);
      }
      const updatedData = await response.json();
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? updatedData : item))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete data
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when the hook is mounted
  useEffect(() => {
    fetchData();
  }, [baseUrl]);

  return { data, loading, error, fetchData, createData, updateData, deleteData };
};

export default useCRUD;