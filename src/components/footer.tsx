import React from "react";
import styled from "styled-components";
import GitHubLink from "./githubLink";

const Name = styled.p`
  marginbottom: 0px;
  padding: 10px 0px 0px 0px;
`;

const Wrapper = styled.footer`
  width: 100%;
  position: fixed;
  background-color: #f4f4f4;
  bottom: 0;
`;

const Footer = () => {
  return (
    <Wrapper>
      <GitHubLink />
      <Name>&copy;Ming - Hsuan Yen, 2020</Name>
    </Wrapper>
  );
};

export default Footer;
