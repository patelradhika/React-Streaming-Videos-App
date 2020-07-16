import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Header from "./Header";
import StreamCreate from "./streams/StreamCreate";
import StreamDelete from "./streams/StreamDelete";
import StreamEdit from "./streams/StreamEdit";
import StreamHome from "./streams/StreamHome";
import StreamShow from "./streams/StreamShow";
import history from "../history";

const App = () => {
    return (
        <Router history={history}>
            <Header />
            <Switch>
                <Route path="/" exact component={StreamHome} />
                <Route path="/streams/new" exact component={StreamCreate} />
                <Route path="/streams/:id" exact component={StreamShow} />
                <Route path="/streams/edit/:id" exact component={StreamEdit} />
                <Route
                    path="/streams/delete/:id"
                    exact
                    component={StreamDelete}
                />
            </Switch>
        </Router>
    );
};

export default App;
