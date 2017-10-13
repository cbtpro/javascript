import intl from "react-intl-universal";

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import Rx from 'rxjs/Rx';

class AutoCompletion extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    };

    render() {
        return (
            <div>
                <input type="text" placeholder={intl.get('PLACEHOLDER', {key: 'key'})} />
            </div>
        );
    };
};

export default AutoCompletion;