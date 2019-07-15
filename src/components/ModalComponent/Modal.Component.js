import React, { Component } from 'react';
import './Modal.Component.scss';


export default class Modal extends Component {
    constructor(props) {
        super(props);
        if (props.data.hasInput) {
            let values = {};
            props.data.input.forEach(prop => values[prop.key] = prop.value.length === 0 ? '' : prop.value);
            this.state = { ...values }
        }
    }
    onChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
        this.props.data.input.forEach(prop => {
            if (prop.key === e.target.id) {
                prop.onChange(prop.key, e.target.value);
            }
        })
    }
    render() {

        return (
            <div className="modal">
                <section className="modal-content">
                    <span className="close" onClick={this.props.data.button2.cancelAction}>&times;</span>
                    {this.props.data.hasMessage && <p className="message">{this.props.data.message}</p>}
                    {this.props.data.hasInput && <div className="input-group"> {this.props.data.input.map(input => <input id={input.key}
                                                                            value={this.state[input.key]}
                                                                            key={input.key}
                                                                            onChange={this.onChange}
                                                                            placeholder={input.placeholder}/>)} </div>}
                    <footer className="buttons-group">
                        <button onClick={this.props.data.button1.confirmAction} className={this.props.data.hasInput && !this.props.data.input[0].value ? 'disabled': ''} disabled={this.props.data.hasInput && !this.props.data.input[0].value}>{this.props.data.button1.text}</button>
                        <button onClick={this.props.data.button2.cancelAction}>{this.props.data.button2.text}</button>
                    </footer>
                </section>
            </div>
        )
    }
}
