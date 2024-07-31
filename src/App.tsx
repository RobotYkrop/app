import React, { useState, useEffect, useCallback } from "react";
import UserCard from "./components/user-card";
import { UserModelData } from "./libs/models/user-models/userModelsData";
import VirtualizedList from "./components/user-list/VirtualizedList";
import "./App.css";
/**
 * Main App component that fetches and displays a list of users with virtualization.
 */
const App = () => {
  /**
   * State for storing fetched users.
   */
  const [users, setUsers] = useState<UserModelData[]>([]);

  /**
   * State for storing the current page number for pagination.
   */
  const [page, setPage] = useState(1);

  /**
   * State for tracking the loading status of fetch requests.
   */
  const [loading, setLoading] = useState(false);

  /**
   * Fetches a list of users from the API.
   *
   * This function sends a request to the API to fetch user data for the specified page.
   * It updates the state with the new list of users and handles loading state.
   *
   * @async
   * @function
   * @param {number} page - The page number to fetch.
   * @returns {Promise<void>} A promise that resolves when the fetch is complete.
   */
  const fetchUsers = useCallback(async () => {
    if (loading) return; // Prevent multiple requests if already loading or no more data
    setLoading(true);
    try {
      const response = await fetch(
        `https://randomuser.me/api/?page=${page}&results=20`
      );
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, ...data.results]);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  
  /**
   * Handle scroll event to load more users when nearing the bottom of the page.
   */
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  /**
   * Render a user item.
   * @param {UserModelData} user - The user data to render.
   */
  const renderItem = (user: UserModelData) => (
    <UserCard key={user.email} user={user} />
  );

  return (
    <div className="app">
      <h1>User List</h1>
      <VirtualizedList
        itemCount={users.length}
        itemSize={200}
        items={users}
        renderItem={renderItem}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default App;
