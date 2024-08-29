import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GlobalStyleProvider from "./styles/GlobalStyleProvider";
import CatViewer from "./CatViewer";
import WorkingHours from "./WorkingHours";
import "./App.css";

function App() {
  return (
    <GlobalStyleProvider>
      <Router>
        {/* <div className="App">
          <nav
            style={{
              position: "fixed",
              top: 0,
              left: 0,
            }}
          >
            <ul>
              <li>
                <Link to="/cat-viewer">CatViewer</Link>
              </li>
              <li>
                <Link to="/working-hour">WorkingHours</Link>
              </li>
            </ul>
          </nav> */}
        <Switch>
          <Route path="/cat-viewer" component={CatViewer} />
          <Route path="/working-hour" component={WorkingHours} />
        </Switch>
        {/* </div> */}
      </Router>
    </GlobalStyleProvider>
  );
}

export default App;
