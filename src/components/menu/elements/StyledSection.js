import styled from "styled-components";

const StyledSection = styled.section`
  border: 2px solid ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  padding: 1.1rem 0.5rem;
  width: calc(100% - 2rem);

  position: relative;

  @media (min-width: 500px) {
    padding: 1.1rem;
  }
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

export default function StyledSectionComponent({ children }) {
  return (
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
      {children}
    </StyledSection>
  );
}
