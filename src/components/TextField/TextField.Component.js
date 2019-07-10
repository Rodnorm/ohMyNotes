import React from 'react';
import './TextField.Component.scss';
import { withFirebase } from '../Firebase/';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = { note: {
            _userId: this.props.user.uid,
            dates: {
                creation: new Date(),
                lastEdit: null
            },
            content: 'just bring it on ...' 
        }};
    }
    key;
    timing = 3000;
    typingTimer;
    isSavingEnabled = false;
    isCreateScenario = true;

    onChange = (e) => {
        const { note } = this.state;
        this.setState({ 
            note: { 
                content: e.target.value,
                dates: {
                    lastEdit: new Date(),
                    creation: note.dates.creation
                }
            }
        });
    }

    enableSaving = () => {
        this.isSavingEnabled = true;
    }

    saveNote = () => {
        const { note } = this.state;
        if (this.isCreateScenario) {
            this.key = this.props.firebase.notes(this.props.user.uid).push({ note }).getKey();
            console.log('note saved',this.key);
            this.isCreateScenario = false;
        } else {
            this.props.firebase.notes(this.props.user.uid).once('value').then(snap => {
                this.props.firebase
                .noteList(this.props.user.uid, this.key).set({ note })
                .then(resp => {
                    console.log('note updated', resp);
                });
            });

        }
    }

    startTimer = () => {
        this.clearTimer();
        if (this.isSavingEnabled) {
            this.typingTimer = setTimeout(this.saveNote, this.timing);
        }
    }

    clearTimer = () => {
        clearTimeout(this.typingTimer);
    }

    render() {
        const { note } = this.state;
        return (
            <div className="text-field">
                <FontAwesomeIcon icon={faSave} className="right-top-align" size="2x" onClick={this.enableSaving}/>
                <textarea onChange={this.onChange} autoFocus onKeyUp={this.startTimer} onKeyDown={this.clearTimer} value={note.content}/>
            </div>
        );
    }
}

export default withFirebase(TextField);