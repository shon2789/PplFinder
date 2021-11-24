import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { favouriteService } from "services/favourite.service";

const Home = () => {
  const { users, isLoading, fetchUsers } = usePeopleFetch();
  const [userFilter, setUserFilter] = useState({ country: [] })
  const [favUsers, setFavUsers] = useState(favouriteService.getFavUsers())

  useEffect(() => {
    fetchUsers(userFilter.country)
  }, [userFilter])


  const handleFavClick = (user) => {
    const idx = favUsers.findIndex(currUser => currUser.login.uuid === user.login.uuid)
    const updatedFavUsers = idx === -1 ? favouriteService.addToFavourites(user) : favouriteService.removeFromFavourites(user)

    setFavUsers(updatedFavUsers)
  }

  const fetchMoreUsers = () => {
    fetchUsers(userFilter.country, true)
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="48px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList fetchMoreUsers={fetchMoreUsers} handleFavClick={handleFavClick} userFilter={userFilter} setUserFilter={setUserFilter} users={users} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
