import React, { useEffect, useRef, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import * as S from "./style";
import { favouriteService } from "services/favourite.service";


const UserList = ({ users, isLoading, setUserFilter, userFilter, handleFavClick, fetchMoreUsers }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768 ? true : false);
  const ref = useRef()

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const checkFavUser = (userId, index) => {
    const favUsers = favouriteService.getFavUsers() || []
    const idx = favUsers.findIndex(user => user.login.uuid === userId)

    if (isMobile && idx !== -1) return true

    if (idx !== -1 || index === hoveredUserId) {
      return true
    } else {
      return false
    }
  }

  const checkFavMobile = (userId) => {
    const favUsers = favouriteService.getFavUsers() || []
    const idx = favUsers.findIndex(user => user.login.uuid === userId)

    if (idx !== -1) {
      return true
    } else {
      return false
    }
  }


  function handleWindowSizeChange() {
    setIsMobile(window.innerWidth <= 768 ? true : false);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);

  const handleScroll = (ev) => {
    if (ev.target.scrollHeight - ev.target.scrollTop - ev.target.clientHeight < 1) {
      fetchMoreUsers(users)
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
      <S.List onScroll={handleScroll} ref={ref}>
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
              <S.IconButtonWrapper isVisible={isMobile ? true : checkFavUser(user.login.uuid, index)}>
                <IconButton onClick={() => { handleFavClick(user) }}>
                  {!isMobile && <FavoriteIcon color="error" />}
                  {(isMobile && !checkFavMobile(user.login.uuid)) && <BsHeart style={{ color: '#e57373', fontSize: '1.2rem' }} />}
                  {(isMobile && checkFavMobile(user.login.uuid)) && <BsHeartFill style={{ color: '#e57373', fontSize: '1.2rem' }} />}
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
