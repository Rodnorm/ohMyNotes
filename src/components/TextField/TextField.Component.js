import React from 'react';
import './TextField.Component.scss';
import { withFirebase } from '../Firebase/';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { note: 'just bring it on ...' };
        
    }
    timing = 3000;
    typingTimer;


    onChange = (e) => {
        this.setState({ note: [e.target.value]})
    }

    saveNote = () => {
        const { note } = this.state;
        this.props.firebase
        .notes().set({ note })
        .then(resp => {
            console.log('note saved', resp);
        });
    }

    startTimer = () => {
        this.clearTimer();
        this.typingTimer = setTimeout(this.saveNote, this.timing);
    }

    clearTimer = () => {
        clearTimeout(this.typingTimer);
    }

    render() {
        const { note } = this.state;
        console.log('render', this.state.color)
        return (
            <div className="text-field">
                <FontAwesomeIcon icon={faSave} className="right-top-align" size="2x" />
                <textarea onChange={this.onChange} autoFocus onKeyUp={this.startTimer} onKeyDown={this.clearTimer} value={note}/>
            </div>
        );
    }
}

export default withFirebase(TextField);