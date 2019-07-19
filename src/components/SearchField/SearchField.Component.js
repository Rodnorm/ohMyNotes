import React, { Component } from 'react';
import './SearchField.Component.scss'


export default class SearchField extends Component {

    onChange  = (e) => {
        this.props.state.action(e)
    }

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.props.state.enterKey(e);
        }
    }

    render() {
        return (
            <div className="search-field">
                <input onKeyUp={this.props.state.startTimer} onKeyDown={this.props.state.clearTimer} onKeyPress={this.onKeyPress} onChange={this.onChange} placeholder="type to search"/>
                <section>
                    <label>
                        <input type="checkbox" /> <span>Search by title </span>
                    </label>
                    <label>
                        <input type="checkbox" /> <span>Search by content</span>
                    </label>
                </section>
            </div>
        )
    }
}