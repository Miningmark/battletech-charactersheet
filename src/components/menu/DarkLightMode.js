import styled from "styled-components";

// Import Icons
import IconDark from "/public/assets/icons/dark_mode.svg";
import IconLight from "/public/assets/icons/light_mode.svg";

const ThemeToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 40px;
  height: 40px;

  svg {
    fill: ${({ theme }) => theme.text};
  }
`;

export default function DarkLightMode({ toggleTheme, theme }) {
  return (
    <ThemeToggleButton onClick={toggleTheme} aria-label="Dark / Light mode switch">
      {theme === "light" ? <IconDark /> : <IconLight />}
    </ThemeToggleButton>
  );
}
