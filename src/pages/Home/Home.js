import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";
import { favouriteService } from "services/favourite.service";

const Home = () => {
  const { users, isLoading, setUsers, fetchUsers } = usePeopleFetch();
  const [userFilter, setUserFilter] = useState({ country: [] })

  useEffect(() => {
    fetchUsers(userFilter.country)
  }, [userFilter])


  const handleFavClick = (user) => {
    const favUsers = favouriteService.getFavUsers() || []
    const idx = favUsers.findIndex(currUser => currUser.login.uuid === user.login.uuid)
    idx === -1 ? favouriteService.addToFavourites(user) : favouriteService.removeFromFavourites(user.login.uuid)
  }

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList handleFavClick={handleFavClick} userFilter={userFilter} setUserFilter={setUserFilter} users={users} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
