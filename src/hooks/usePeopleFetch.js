import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers(countries, isMore = false) {
    setIsLoading(true);
    const response = await axios.get(`https://randomuser.me/api/?results=25&page=1&nat=${countries?.join()}`);
    setIsLoading(false);
    if (!isMore) {
      setUsers(response.data.results);
    } else {
      setUsers(prevState => { return [...prevState, ...response.data.results] });
    }
  }

  return { users, isLoading, fetchUsers, setUsers };
};
