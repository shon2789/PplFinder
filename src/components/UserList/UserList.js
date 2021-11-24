import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { favouriteService } from "services/favourite.service";


const UserList = ({ users, isLoading, setUserFilter, userFilter, handleFavClick }) => {
  const [hoveredUserId, setHoveredUserId] = useState();

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const checkFavUser = (userId, index) => {
    const favUsers = favouriteService.getFavUsers() || []
    const idx = favUsers.findIndex(user => user.login.uuid === userId)

    if (idx !== -1 || index === hoveredUserId) {
      return true
    } else {
      return false
    }
  }



  return (
    <S.UserList>
      <S.Filters>
        <CheckBox userFilter={userFilter} setUserFilter={setUserFilter} value="BR" label="Brazil" />
        <CheckBox userFilter={userFilter} setUserFilter={setUserFilter} value="AU" label="Australia" />
        <CheckBox userFilter={userFilter} setUserFilter={setUserFilter} value="CA" label="Canada" />
        <CheckBox userFilter={userFilter} setUserFilter={setUserFilter} value="DE" label="Germany" />
        <CheckBox userFilter={userFilter} setUserFilter={setUserFilter} value="ES" label="Spain" />
      </S.Filters>
      <S.List>
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <S.UserPicture src={user?.picture.large} alt="" />
              <S.UserInfo>
                <Text size="22px" bold>
                  {user?.name.title} {user?.name.first} {user?.name.last}
                </Text>
                <Text size="14px">{user?.email}</Text>
                <Text size="14px">
                  {user?.location.street.number} {user?.location.street.name}
                </Text>
                <Text size="14px">
                  {user?.location.city} {user?.location.country}
                </Text>
              </S.UserInfo>
              <S.IconButtonWrapper isVisible={checkFavUser(user.login.uuid, index)}>
                <IconButton onClick={() => { handleFavClick(user); }}>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
