import React from "react";
import styled from "styled-components";
import Footer from "../Footer";

const Container = styled.div`
  max-width: calc(1280 + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

const Layout: React.FC<any> = ({ children }) => {
  return (
    <>
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
