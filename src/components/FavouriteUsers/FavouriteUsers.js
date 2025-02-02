import React, { useEffect, useState } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { favouriteService } from "services/favourite.service";


const FavouriteUsers = ({ users, handleFavClick }) => {
    const [hoveredUserId, setHoveredUserId] = useState();

    const handleMouseEnter = (index) => {
        setHoveredUserId(index);
    };

    const handleMouseLeave = () => {
        setHoveredUserId();
    };

    return (
        <S.FavouriteUsersList>

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
                            <S.IconButtonWrapper isVisible={true}>
                                <IconButton onClick={() => { handleFavClick(user); }}>
                                    <FavoriteIcon color="error" />
                                </IconButton>
                            </S.IconButtonWrapper>
                        </S.User>
                    );
                })}

            </S.List>
        </S.FavouriteUsersList>
    );
};

export default FavouriteUsers;
