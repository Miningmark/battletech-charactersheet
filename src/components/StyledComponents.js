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
    padding: 5px;
    z-index: 1;
    width: 20px; /* Feste Breite der Spalten */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
  }
`;

export const StyledTableBody = styled.tbody`
  td {
    padding: 5px;
    max-width: 100px; /* Maximale Breite der Zellen */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
    text-align: center;
  }
`;
