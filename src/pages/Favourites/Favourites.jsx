
import React, { useEffect, useState } from 'react'
import * as S from "./style";
import Text from "components/Text";
import FavouriteUsers from 'components/FavouriteUsers/FavouriteUsers';
import { favouriteService } from 'services/favourite.service';


export const Favourites = () => {
    const [favUsers, setFavUsers] = useState([])

    useEffect(() => {
        const favUsers = favouriteService.getFavUsers()
        setFavUsers(favUsers)
    }, [])

    const handleFavClick = (user) => {
        const favUsers = favouriteService.getFavUsers() || []
        const idx = favUsers.findIndex(currUser => currUser.login.uuid === user.login.uuid)
        const users = idx === -1 ? favouriteService.addToFavourites(user) : favouriteService.removeFromFavourites(user.login.uuid)
        setFavUsers(users)
    }

    return (
        <S.Fav>
            <S.Content>
                <S.Header>
                    <Text size="48px" bold>
                        PplFinder
                    </Text>
                    {favUsers.length === 0 && <Text size="30px" >
                        No favourites to show
                    </Text>}
                </S.Header>
                <FavouriteUsers users={favUsers} handleFavClick={handleFavClick} />
            </S.Content>
        </S.Fav>
    )
}

