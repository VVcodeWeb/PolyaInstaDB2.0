import React, { Fragment } from 'react';
import './App.scss';
import MainPage from "./pages/main";
import DatabasePage from "./pages/database";
import AccountPage from "./pages/AccountPage"
import NotFoundPage from "./pages/NotFoundPage"
import {Switch, Route} from "react-router-dom"

class App extends React.Component {
  render() {
    return(
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
           <Fragment>
              <Route path="/database" exact component={DatabasePage} />
              <Route path="/account/:url" exact component={AccountPage} />
          </Fragment>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  };
}

export default App;
