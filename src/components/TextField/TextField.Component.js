import React from 'react';
import './TextField.Component.scss';
import { withFirebase } from '../Firebase/';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../ModalComponent/Modal.Component';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            showModal: false,
            note: {
            _userId: this.props.user.uid,
            dates: {
                creation: new Date(),
                lastEdit: null
            },
            content: 'just bring it on ...' 
        }};
        this.onModalChange = this.onModalChange.bind(this);
    }
    key;
    timing = 3000;
    typingTimer;
    isSavingEnabled = false;
    isCreateScenario = true;

    onChange = (e) => {
        const { note } = this.state;
        this.setState({
            showModal: false, 
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
        this.setState({ showModal: true})
        this.isSavingEnabled = true;
    }

    saveNote = () => {
        const { note } = this.state;
        if (this.isCreateScenario) {
            this.key = this.props.firebase.notes(this.props.user.uid).push({ note }).getKey();
            this.isCreateScenario = false;
        } else {
            this.props.firebase.notes(this.props.user.uid).once('value').then(snap => {

                this.props.firebase
                .noteList(this.props.user.uid, this.key).set({ note })
                .then(resp => {
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

    modalConfig = {
        hasInput: true,
        hasMessage: false,
        input: [
            {   key: '_315458m',
                onChange: (id, value) => this.onModalChange(id, value),
                value:'',
                placeholder: 'Escreva o nome da nota :)'
            }
        ],
        button1: {
            confirmAction: () => this.saveNote(),
            text: 'OK'
        },
        button2: {
            cancelAction: () => this.onModalClose(),
            text: 'CANCEL'
        }
    }

    onModalChange = (id, value) => {
        this.modalConfig.input.forEach(input => input.key === id ? input.value = value : null);
    }

    onModalClose = () => {
        console.log(this.modalConfig.input[0])
        this.setState({ showModal: false })
    }

    render() {
        const { note } = this.state;
        return (
            <div className="text-field">
                {this.state.showModal && <Modal data={this.modalConfig}/>}
                <FontAwesomeIcon icon={faSave} className="right-top-align" size="2x" onClick={this.enableSaving}/>
                <textarea onChange={this.onChange} autoFocus onKeyUp={this.startTimer} onKeyDown={this.clearTimer} value={note.content}/>
            </div>
        );
    }
}

export default withFirebase(TextField);