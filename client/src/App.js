import React, { Fragment, lazy, Suspense } from "react";
import "./App.scss";
import MainPage from "./pages/main";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Switch, Route } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
const DatabasePage = lazy(() => import("./pages/database"));

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Suspense fallback={<CircularProgress />}>
            <Fragment>
              <Route path="/database" exact component={DatabasePage} />
              <Route path="/account/:url" exact component={AccountPage} />
            </Fragment>
          </Suspense>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
