import React from "react";
import "./App.css";
import Graph from "./components/Graph";
import Label from "./components/label";
import Controller from "./components/Controller";
import Footer from "./components/footer";
import styled from "styled-components";

const Title = styled.div`
  margin-top: 10px;
  font-family: "Anton", sans-serif;
  font-size: 50px;
`;

function App() {
  return (
    <div className="App">
      <Title>Path Finding Visualizer</Title>
      <Label />
      <Graph />
      <Controller />
      <Footer />
    </div>
  );
}

export default App;
