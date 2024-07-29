import styled from "styled-components";
import { useState } from "react";

const StyledSection = styled.section`
  border: 2px solid ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 90%;
  max-width: 85vw;

  position: relative;
`;
const Corner = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.backgroundColor1};
  ${({ $position }) => {
    switch ($position) {
      case "top-left":
        return `
          top: -2px;
          left: -2px;
        `;
      case "top-right":
        return `
          top: -2px;
          right: -2px;
        `;
      case "bottom-left":
        return `
          bottom: -2px;
          left: -2px;
        `;
      case "bottom-right":
        return `
          bottom: -2px;
          right: -2px;
        `;
      default:
        return "";
    }
  }}
`;

const GradientLine = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    ${({ $topleft }) => ($topleft ? "135deg" : "45deg")},
    transparent calc(50% - 3px),
    ${({ theme }) => theme.text} 50%,
    transparent calc(50% + 3px)
  );
`;

const Columns2 = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* Default to one column */
  margin: 0 10px;

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr; /* Two equal-width columns for screens wider than 1000px */
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-spacing: 0;
`;
const StyledTableHead = styled.thead`
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

const StyledTableBody = styled.tbody`
  td {
    padding: 5px;
    max-width: 30px; /* Maximale Breite der Zellen */
    white-space: nowrap; /* Verhindert Zeilenumbrüche */
    overflow: hidden;
    text-overflow: ellipsis; /* Fügt "..." hinzu, wenn Text abgeschnitten wird */
  }
`;

export default function NewCharacter() {
  return (
    <>
      <h1>New Character</h1>
      <div>
        <Columns2>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <StyledSection>
              <Corner $position="top-left">
                <GradientLine $topleft={"topleft"} />
              </Corner>
              <Corner $position="top-right">
                <GradientLine />
              </Corner>
              <Corner $position="bottom-left">
                <GradientLine />
              </Corner>
              <Corner $position="bottom-right">
                <GradientLine $topleft={"topleft"} />
              </Corner>
              <div>
                <h2>PERSONAL DATA</h2>
                <p>
                  Name: <input type="text" />
                </p>
                <p>
                  Height: <input type="text" />
                </p>
                <p>
                  Hair: <input type="text" />
                </p>
                <p>
                  Weight: <input type="text" />
                </p>
                <p>
                  Eyes: <input type="text" />
                </p>
                <p>
                  Player: <input type="text" />
                </p>
                <p>
                  Affiliation: <input type="text" />
                </p>
                <p>
                  Extra: <input type="text" />
                </p>
              </div>
            </StyledSection>

            <StyledSection>
              <Corner $position="top-left">
                <GradientLine $topleft={"topleft"} />
              </Corner>
              <Corner $position="top-right">
                <GradientLine />
              </Corner>
              <Corner $position="bottom-left">
                <GradientLine />
              </Corner>
              <Corner $position="bottom-right">
                <GradientLine $topleft={"topleft"} />
              </Corner>
              <h2>ATTRIBUTES</h2>

              <table>
                <thead>
                  <tr>
                    <th>Attribute</th>
                    <th>Score</th>
                    <th>Link</th>
                    <th>XP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>STR</td>
                    <td>1</td>
                    <td>STR</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>BOD</td>
                    <td>1</td>
                    <td>STR</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>RFL</td>
                    <td>1</td>
                    <td>RFL</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>DEX</td>
                    <td>1</td>
                    <td>DEX</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>INT</td>
                    <td>1</td>
                    <td>INT</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>WIL</td>
                    <td>1</td>
                    <td>WIL</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>CHA</td>
                    <td>1</td>
                    <td>CHA</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                  <tr>
                    <td>EDG</td>
                    <td>1</td>
                    <td>EDG</td>
                    <td>
                      <input type="number" min="0" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </StyledSection>
          </div>

          <StyledSection>
            <Corner $position="top-left">
              <GradientLine $topleft={"topleft"} />
            </Corner>
            <Corner $position="top-right">
              <GradientLine />
            </Corner>
            <Corner $position="bottom-left">
              <GradientLine />
            </Corner>
            <Corner $position="bottom-right">
              <GradientLine $topleft={"topleft"} />
            </Corner>
            <h2>COMBAT DATA</h2>
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Condition Monitor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Standard Damage:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Fatigue Damage:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">
                    Stun: <input type="checkbox" /> Unconscious: <input type="checkbox" />
                  </td>
                </tr>
                <tr>
                  <th colSpan="2">Movement (Meters per Turn)</th>
                </tr>
                <tr>
                  <td>Walk:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Run/Evade:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Sprint:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Climb:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Crawl:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>Swim:</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              </tbody>
            </table>

            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Perso. Armor</th>
                  <th>Location</th>
                  <th>Armor Type</th>
                  <th>BAR (M/B/E/X)</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              </StyledTableBody>
            </StyledTable>

            <h3>Weapon</h3>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th></th>
                  <th>Skill</th>
                  <th>AP/BD</th>
                  <th>Range</th>
                  <th>Ammo</th>
                  <th>Notes</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                <tr>
                  <td>Martial Arts</td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>Melee</td>
                  <td>N/A</td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
              </StyledTableBody>
            </StyledTable>
          </StyledSection>
        </Columns2>

        <StyledSection>
          <Corner $position="top-left">
            <GradientLine $topleft={"topleft"} />
          </Corner>
          <Corner $position="top-right">
            <GradientLine />
          </Corner>
          <Corner $position="bottom-left">
            <GradientLine />
          </Corner>
          <Corner $position="bottom-right">
            <GradientLine $topleft={"topleft"} />
          </Corner>
          <h2>TRAITS (PERSONAL)</h2>

          <StyledTable>
            <StyledTableHead>
              <tr>
                <th>Trait</th>
                <th>TP</th>
                <th>Page Ref.</th>
                <th>XP</th>
              </tr>
            </StyledTableHead>
            <StyledTableBody>
              <tr>
                <td>Compulsion/Xenophobia</td>
                <td>1</td>
                <td>text</td>
                <td>
                  <input type="number" />
                </td>
              </tr>
            </StyledTableBody>
          </StyledTable>
        </StyledSection>
      </div>
      <br />
    </>
  );
}
