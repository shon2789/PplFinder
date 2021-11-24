import styled from "styled-components";

export const FavouriteUsersList = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 0.5rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  // padding: 0.5rem;
  gap: 35px;
  width: 100%;
  height: calc(100vh - 270px);
  margin-block-start: 30px;
  overflow-y: auto;
`;

export const User = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 0.5rem;
  @media (min-width: 768px) {
      &:hover{
          background-color: #000;
          border-radius: 15px;
        }
    }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-height: 128px;
  gap: 2px;
  overflow: hidden;
  
`;

export const UserPicture = styled.img`
  border-radius: 45%;
  width: 70px;
  height: 70px;
  align-self: center;
  object-fit: cover;
  
  @media (min-width: 450px) {
    width: 100px;
    height: 100px;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const IconButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
`;

export const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  & > * {
    margin-inline-end: 8px;
  }
`;
