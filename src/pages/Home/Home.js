import React, { useEffect, useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const { users, isLoading, setUsers, fetchUsers } = usePeopleFetch();
  const [userFilter, setUserFilter] = useState({ country: [] })

  useEffect(() => {
    fetchUsers(userFilter.country)
  }, [userFilter])

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList userFilter={userFilter} setUserFilter={setUserFilter} users={users} isLoading={isLoading} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
