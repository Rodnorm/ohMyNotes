import React from 'react';
import './TextField.Component.scss';
import { withFirebase } from '../Firebase/';
import { faSave, faSpinner, faFileSignature } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from '../ModalComponent/Modal.Component';

class TextField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSave: false,
            showTitle: false,
            showModal: false,
            saving: false,
            isSavingEnabled: this.props.value ? true : false,
            isCreateScenario: this.props.value ? false : true,
            key: this.props.value ? this.props.value.id : '',
            note: {
                title: this.props.value ? this.props.value.title : '',
                _userId: this.props.user.uid,
                dates: {
                    creation: new Date(),
                    lastEdit: null
                },
                content: this.props.value ? this.props.value.content : '' 
            }
        };
        this.onModalChange = this.onModalChange.bind(this);
    }
    noteList = '';
    allowSave = true;
    timing = 2000;
    typingTimer;
    modalConfigCreate = {};
    modalConfigAutoSave = {};
    componentWillUpdate() {
        this.modalConfigAutoSave = {
            hasInput: false,
            hasMessage: true,
            message: !this.state.autoSave ? 'Click Ok to enable auto-save xD' : 'Auto-save is enabled xD',
            button1: {
                confirmAction: () => this.setAutoSave(),
                text: 'Ok'
            },
            button2: {
                cancelAction: () => this.onModalClose(),
                text: 'Cancel'
            }
        }
    }

    componentDidMount() {
        this.modalConfigCreate = {
            hasInput: true,
            hasMessage: false,
            input: [
                {   key: '_315458m',
                    type: 'text',
                    onChange: (id, value, e) => this.onModalChange(id, value, e),
                    value: this.state.note.title,
                    placeholder: 'Escreva o nome da nota :)'
                },
                {
                    key: '_315459m',
                    type:'checkbox',
                    onChange: (id, value, e) => this.onModalChange(id, value, e),
                    label: 'Enable Auto Save?',
                    value: true
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

        this.modalConfigAutoSave = {
            hasInput: false,
            hasMessage: true,
            message: !this.state.autoSave ? 'Click Ok to enable auto-save xD' : 'Auto-save is enabled xD',
            button1: {
                confirmAction: () => this.setAutoSave(),
                text: 'Ok'
            },
            button2: {
                cancelAction: () => this.onModalClose(),
                text: 'Cancel'
            }
        }
    }


    setAutoSave = () => {
        this.onModalClose();
        this.modalConfigAutoSave.message = 'Auto-save is enabled xD';
        this.setState({ autoSave: true });
    }
    
    

    onChange = (e) => {
        const { note } = this.state;
        if (e.target.name === 'title') {
            this.modalConfigCreate.input[0].value = e.target.value
        }
        this.setState({
            showModal: false, 
            note: { 
                title: e.target.name === 'title' ? e.target.value : note.title,
                content: e.target.name === "content" ? e.target.value : note.content,
                dates: {
                    lastEdit: new Date(),
                    creation: note.dates ? note.dates.creation : new Date()
                }
            }
        });
    }

    enableSaving = () => {
        if (this.state.isCreateScenario) {
            // this.setState({});
        }
        this.setState({ showModal: true, isSavingEnabled: true });
    }

    saveNote = () => {
        const { note } = this.state;
        this.setState({ saving: true })
        if (this.state.isCreateScenario) {
            note.title = this.modalConfigCreate.input[0].value
            let key = this.props.firebase.notes(this.props.user.uid).push( note );
            this.setState({ key, isCreateScenario: false, saving: false }); 
        } else {
            this.props.firebase
            .noteList(this.props.user.uid, this.state.key).set(note).then(() => setTimeout(() => this.setState({ saving: false }), 1000));
        }
    }

    startTimer = () => {
        this.clearTimer();
        if (this.state.isSavingEnabled && this.state.autoSave) {
            this.typingTimer = setTimeout(this.saveNote, this.timing);
        }
    }

    clearTimer = () => {
        clearTimeout(this.typingTimer);
    }

    

    checkNote = () => {
        this.setState({ note: { title: this.modalConfigCreate.input[0].value }, showModal: false, autoSave: this.modalConfigCreate.input[1].value });
        this.saveNote();

        // if (this.state.isCreateScenario) {
        // }
        // this.props.firebase.notes(this.props.user.uid).once('value').then(snap => {
        //     this.noteList = snap.val();
            // Object.keys(this.noteList).forEach(key => {
            //     if (this.noteList[key].title.trim() === this.modalConfigCreate.input[0].value.trim()) {
            //         this.sameNameError();
            //         return false;
            //     }
            // })
        // });
        // return true;
    }

    sameNameError = () => {
        this.allowSave = false;
        alert('same name found!')
    }

    onModalChange = (index, value, event) => {
        this.modalConfigCreate.input[index].type === 'checkbox' ?
        this.modalConfigCreate.input[index].value = event.target.checked :
        this.modalConfigCreate.input[index].value = value;
    }

    onModalClose = () => {
        this.setState({ showModal: false });
    }
    toggleTitle = () => {
        const { showTitle } = this.state;
        this.setState({ showTitle: !showTitle })
    }

    render() {
        const { note } = this.state;
        return (
            <div className="text-field">
                <div className="icon-holder">
                    {!this.state.saving && <FontAwesomeIcon icon={faSave} className="save-icon" size="2x" onClick={this.enableSaving}/>}
                    {this.state.saving && <FontAwesomeIcon icon={faSpinner} className="loading" size="2x" />}
                    <FontAwesomeIcon icon={faFileSignature} size="2x" onClick={this.toggleTitle}/>
                </div>
                {this.state.showTitle && <input name="title" className="title-input" onKeyUp={this.startTimer} onKeyDown={this.clearTimer} onChange={this.onChange} value={note.title} placeholder={note.title.length === 0 ? 'insert your title here' : null} />}
                {this.state.showModal && <Modal data={this.state.isCreateScenario ? this.modalConfigCreate : this.modalConfigAutoSave}/>}
                <textarea name="content" placeholder={!note.content ? 'just bring it on ...' : null } onChange={this.onChange} autoFocus onKeyUp={this.startTimer} onKeyDown={this.clearTimer} value={note.content}/>
            </div>
        );
    }
}

export default withFirebase(TextField);