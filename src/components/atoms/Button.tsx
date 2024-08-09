import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.secondaryHover};
  }
  transition: all 0.3s ease-in-out;
`;

export default Button;
