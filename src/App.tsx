import React, { useState, useEffect, useCallback } from "react";
import UserCard from "./components/user-card";
import { UserModelData } from "./libs/models/user-models/userModelsData";
import VirtualizedList from "./components/user-list/VirtualizedList";
import "./App.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<UserModelData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (loading) return;
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
