import styled from "styled-components";

//Import Icons
import DeleteIcon from "/public/assets/icons/delete.svg";

const StyledDeleteButton = styled.button`
  background-color: var(--danger);
  border-radius: var(--border-radius-small);
  box-shadow: none;
  width: 26px;
  height: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;

  @media (min-width: 500px) {
    width: 30px;
    height: 30px;
  }

  svg {
    width: 20px;
    height: 20px;

    @media (min-width: 500px) {
      width: 26px;
      height: 26px;
    }
  }
`;

export default function DeleteButton({ onClick }) {
  return (
    <>
      <StyledDeleteButton onClick={onClick}>
        <DeleteIcon />
      </StyledDeleteButton>
    </>
  );
}
