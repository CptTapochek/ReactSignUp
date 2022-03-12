import React from "react";
import "./App.css";
import SignUp from "./components/SignUp/SignUp"

class App extends React.PureComponent {
  render() {
    return (
        <div id="app">
          <SignUp/>
        </div>
    );
  }
}

export default App;