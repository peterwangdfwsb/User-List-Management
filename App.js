import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomePage from "./HomePage";
import CreateUsers from "./createUsers";
import EditUsers from "./editUsers";



class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={HomePage} />
                <Route path="/add" component={CreateUsers} />
                <Route path="/edit/:id" render={(props) => <EditUsers id={props.match.params.id} />} />
            </Switch>
            </BrowserRouter>

        )
    }
}

export default App;