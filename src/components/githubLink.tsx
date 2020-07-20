import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 10px;
`;

const GitHubLink = () => {
  return (
    <Wrapper>
      {" "}
      <a href="https://github.com/Conradyen/Path-finding-Visualizer">
        <FontAwesomeIcon icon={faGithub} size="3x" color="#7a7979" />
      </a>
    </Wrapper>
  );
};

export default GitHubLink;
