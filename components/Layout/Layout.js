// import { Main } from "next/document";
import Navigation from "../Navigation/Navigation";
import styled from "styled-components";

const Main = styled.main`
  display: grid;
  gap: 0.5rem;
  margin-top: 5rem;
  padding: 0.5rem;
  position: relative;
  width: 100%;
  justify-content: center;
`;

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Main>{children}</Main>
    </>
  );
}
