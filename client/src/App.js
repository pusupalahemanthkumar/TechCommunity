import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";
import Showcase from "./components/Showcase/Showcase"

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Showcase />
         
        </Layout>
      </div>
    );
  }
}

export default App;
