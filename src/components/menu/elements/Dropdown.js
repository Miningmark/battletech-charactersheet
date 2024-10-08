// components/Dropdown.js
import styled from "styled-components";
import { useEffect, useState } from "react";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  min-width: 150px;
  height: 30px;

  @media (min-width: 500px) {
    width: 200px;
  }
`;

const DropdownButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 5px;
  margin: 0;
  border: none;
  cursor: pointer;
  min-width: 100%;
`;

const DropdownContent = styled.div`
  display: ${({ $isopen }) => ($isopen ? "block" : "none")};
  position: absolute;
  background: ${({ theme }) => theme.backgroundColor2};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const DropdownSearch = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  border-radius: 4px;
  margin-bottom: 8px;
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

export default function Dropdown({ options, onChange, defaultOption, index, value }) {
  const [title, setTitle] = useState(defaultOption ? defaultOption : "Select an option");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (value === null) {
      setTitle("Select an option");
    }
  }, [value]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleItemClick(option) {
    setIsOpen(false);
    setTitle(option.name);
    if (onChange) {
      if (index != null) {
        onChange({ option, index });
      } else {
        onChange(option);
      }
    }
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownContainer>
      <DropdownButton onClick={toggleDropdown}>{title}</DropdownButton>
      <DropdownContent $isopen={isOpen && "isOpen"}>
        {isOpen && (
          <>
            {options.length > 5 && (
              <DropdownSearch
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <DropdownItem key={index} onClick={() => handleItemClick(option)}>
                  {option.name}
                </DropdownItem>
              ))
            ) : (
              <DropdownItem>No options found</DropdownItem>
            )}
          </>
        )}
      </DropdownContent>
    </DropdownContainer>
  );
}
