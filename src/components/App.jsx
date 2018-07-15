import Header from './Header';
import Landing from './Landing';
import React, { Component, Fragment } from 'react';

class App extends Component {
    render() {
        return (
            <Fragment>
                <Header />
                <Landing />
            </Fragment>
        );
    }
}

export default App;