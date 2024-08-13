import styled from "styled-components";

export const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-x: hidden;
`;

export const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 98%;
  max-width: 1600px;
  box-sizing: border-box;
  padding: 0 10px;
`;

export const Columns2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (min-width: 1000px) {
    flex-direction: row;
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const StyledTableHead = styled.thead`
  th {
    font-weight: bold;
    padding: 0;
    z-index: 1;
    width: 20px; /* Feste Breite der Spalten */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */

    @media (min-width: 700px) {
      margin: 5px;
    }

    @media (min-width: 500px) {
      margin: 2px;
    }
  }
`;

export const StyledTableBody = styled.tbody`
  td {
    padding: 0;
    max-width: 100px; /* Maximale Breite der Zellen */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
    text-align: center;

    @media (min-width: 700px) {
      margin: 5px;
    }

    @media (min-width: 500px) {
      margin: 2px;
    }
  }
`;

const StyledInput = styled.input`
  margin: 0;

  ${({ $controllelements }) =>
    $controllelements &&
    `&::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }`}

  @media (min-width: 700px) {
    margin: 5px;
  }

  @media (min-width: 500px) {
    margin: 2px;
  }
`;

export const StyledXSmallInput = styled(StyledInput)`
  width: 14px;

  @media (min-width: 600px) {
    width: 20px;
  }
`;

export const StyledSmallInput = styled(StyledInput)`
  width: 38px;

  @media (min-width: 600px) {
    width: 60px;
  }
`;

export const StyledNormalInput = styled(StyledInput)`
  width: 55px;

  @media (min-width: 600px) {
    width: 100px;
  }
`;

export const StyledLargeInput = styled(StyledInput)`
  width: 100px;

  @media (min-width: 600px) {
    width: 160px;
  }
`;
