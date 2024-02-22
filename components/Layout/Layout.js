// import { Main } from "next/document";
import Navigation from "../Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      {/* <Main>{children}</Main> */}
    </>
  );
}
