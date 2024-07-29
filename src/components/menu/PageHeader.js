import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeToggle from "@/components/menu/DarkLightMode";

// Import Icons
import IconMenu from "/public/assets/icons/menu.svg";

const StyledHeader = styled.header`
  position: relative;
  position: sticky;
  top: 0;
  z-index: 999;
`;

const StyledMenu = styled.nav`
  position: relative;
  width: 100vw;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => theme.backgroundColor2};

  @media (max-width: 800px) {
    display: none;
  }
`;

const MenuLink = styled(Link)`
  text-decoration: none;
  padding: 5px 15px;
  color: ${({ theme, $active }) => ($active == 1 ? theme.primaryColor : theme.secondaryColor)};
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.primaryColor};
    transform: translateY(-3px);
    transition: transform 0.3s ease;
  }

  @media (max-width: 1000px) {
    font-size: 1.2rem;
  }
`;

const HamburgerIcon = styled.div`
  position: fixed;
  right: 0px;
  top: 0px;
  width: 30px;

  display: none;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  background-color: ${({ theme }) => theme.backgroundColor2};
  padding: 10px;
  border-radius: 0 0 0 10px;

  svg {
    fill: ${({ theme }) => theme.text};
  }

  @media (max-width: 800px) {
    display: flex;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 55px;
  right: 0;
  width: 200px;
  background: ${({ theme }) => theme.backgroundColor2};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 600;
  display: flex;
  flex-direction: column;
  font-size: large;
  border-radius: 10px 0 0 10px;
  padding: 5px 0 5px 0;

  @media (min-width: 801px) {
    display: none;
  }
`;

const DarkLightModeWrapper = styled.div`
  position: absolute;
  right: 30px;
`;

const MobileMenuOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default function PageHeader({ toggleTheme, theme }) {
  const router = useRouter();
  const { pathname } = router;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <StyledHeader>
      <StyledMenu>
        <MenuLink href="/" $active={pathname === "/" ? 1 : 0}>
          Home
        </MenuLink>
        <DarkLightModeWrapper>
          <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
        </DarkLightModeWrapper>
      </StyledMenu>

      <HamburgerIcon>
        <IconMenu onClick={toggleMobileMenu} />
        <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      </HamburgerIcon>

      {isMobileMenuOpen && (
        <MobileMenuOverlay onClick={toggleMobileMenu}>
          <MobileMenu onClick={(e) => e.stopPropagation()}>
            <MenuLink href="/" $active={pathname === "/" ? 1 : 0}>
              Home
            </MenuLink>
          </MobileMenu>
        </MobileMenuOverlay>
      )}
    </StyledHeader>
  );
}
