// components/Dropdown.js
import styled from "styled-components";
import { useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const DropdownContent = styled.div`
  display: ${({ $isopen }) => ($isopen ? "block" : "none")};
  position: absolute;
  background: ${({ theme }) => theme.backgroundColor2};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
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

export default function Dropdown({ options, onChange }) {
  const [title, setTitle] = useState("select skill");
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(option) {
    setIsOpen(false);
    setTitle(option);
    if (onChange) {
      onChange(option);
    }
  }

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{title}</DropdownButton>
      <DropdownContent $isopen={isOpen && "isOpen"}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleItemClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
}
