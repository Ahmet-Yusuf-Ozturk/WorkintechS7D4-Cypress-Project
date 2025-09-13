import { Switch, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Success from "./components/Success";


import './App.css';
import './components/Layout.css';
import ErrorPage from './components/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="content-section">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/error">
            <ErrorPage />
          </Route>
          <Route exact path="/success">
            <Success />
          </Route>
        </Switch>
      </div>
      <LocationDisplay />
    </>
  );
}

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

export default App;
