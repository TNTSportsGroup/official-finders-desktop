import styled from "styled-components";

interface IHeaderProps {
  color?: string;
  fontSize?: string;
}

export const Header = styled.h1<IHeaderProps>`
  color: ${({ color }) => (color ? color : "white")};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "45px")};
`;
