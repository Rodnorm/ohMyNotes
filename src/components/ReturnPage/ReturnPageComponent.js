import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class ReturnPage extends Component {
    constructor(props) {
        super(props);
    }
    returnPageFunction = () => {
        this.props.history.goBack()
    }
    render() {
        return(
            <button className="back-button" onClick={this.returnPageFunction}>
                <FontAwesomeIcon icon={faCaretLeft} color="white" size="1x"/> 
            </button>
        )
    }
}

export default withRouter(ReturnPage)