import logo from "./logo.svg";
import Gallery from "./components/Gallery";
import "./App.css";
import { Main } from "next/document";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Main />
      </header>
    </div>
  );
}

export default App;
