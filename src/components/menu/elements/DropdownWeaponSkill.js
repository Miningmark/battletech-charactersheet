// components/Dropdown.js
import styled from "styled-components";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  height: 30px;

  @media (min-width: 500px) {
  }
`;

const DropdownButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 5px;
  margin: 0;
  border: none;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: ${({ $isopen }) => ($isopen ? "block" : "none")};
  position: absolute;
  background: ${({ theme }) => theme.backgroundColor2};
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const DropdownItem = styled.a`
  color: ${({ theme }) => theme.text};
  padding: 12px 16px;
  text-decoration: none;
  display: block;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

export default function Dropdown({ options, onChange, index, value }) {
  const [title, setTitle] = useState(value ? value : options[0]);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(option) {
    setIsOpen(false);
    setTitle(option);
    if (onChange) {
      onChange(index, "skill", option);
    }
  }

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{title}</DropdownButton>
      <DropdownContent $isopen={isOpen && "isOpen"}>
        {isOpen && (
          <>
            {options.map((option, index) => (
              <DropdownItem key={index} onClick={() => handleItemClick(option)}>
                {option}
              </DropdownItem>
            ))}
          </>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
}
