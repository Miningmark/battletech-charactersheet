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
  width: 90%;
  max-width: 1600px;
  box-sizing: border-box;
  padding: 0 10px;
`;

export const Columns2 = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: 20px;

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr; /* Two equal-width columns for screens wider than 1000px */
  }
`;

export const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
`;

export const StyledTableHead = styled.thead`
  th {
    font-weight: bold;
    padding: 5px;
    z-index: 1;
    width: 30px; /* Feste Breite der Spalten */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
  }
`;

export const StyledTableBody = styled.tbody`
  td {
    padding: 5px;
    max-width: 30px; /* Maximale Breite der Zellen */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
    text-align: center;
  }
`;
