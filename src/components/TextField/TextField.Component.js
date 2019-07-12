import React from 'react';
import './TextField.Component.scss';
import { withFirebase } from '../Firebase/';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../ModalComponent/Modal.Component';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        debugger
        this.state = {
            showModal: false,
            note: {
                title: '',
                _userId: this.props.user.uid,
                dates: {
                    creation: new Date(),
                    lastEdit: null
                },
                content: this.props.value ? this.props.value.content : 'just bring it on ...' 
            }
        };
        this.onModalChange = this.onModalChange.bind(this);
    }
    noteList = '';
    allowSave = true;
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
                title: this.modalConfig.input[0].value,
                content: e.target.value,
                dates: {
                    lastEdit: new Date(),
                    creation: note.dates ? note.dates.creation : new Date()
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
            note.title = this.modalConfig.input[0].value
            this.key = this.props.firebase.notes(this.props.user.uid).push({ note }).getKey();
            this.isCreateScenario = false;
        } else {
            this.props.firebase
            .noteList(this.props.user.uid, this.key).set({ note });
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
            confirmAction: () => this.checkNote(),
            text: 'OK'
        },
        button2: {
            cancelAction: () => this.onModalClose(),
            text: 'CANCEL'
        }
    }

    checkNote = () => {
        this.setState({note: { title: this.modalConfig.input[0].value }})
        this.state.showModal = false;

        if (this.isCreateScenario) {
            this.saveNote()
            return true;
        }
        this.props.firebase.notes(this.props.user.uid).once('value').then(snap => {
            this.noteList = snap.val();
            Object.keys(this.noteList).forEach(key => {
                if (this.noteList[key].title.trim() === this.modalConfig.input[0].value.trim()) {
                    this.sameNameError();
                    return false;
                }
            })
        });
        return true
    }

    sameNameError = () => {
        this.allowSave = false;
        alert('same name found!')
    }

    onModalChange = (id, value) => {
        this.modalConfig.input.forEach(input => input.key === id ? input.value = value : null);
    }

    onModalClose = () => {
        this.setState({ showModal: false });
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