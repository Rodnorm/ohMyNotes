import React from 'react';
import './MyNotes.Component.scss'
import { withFirebase } from '../Firebase/';
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import Loader from '../Loader/LoaderComponent';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'recompose';
import SearchField from '../SearchField/SearchField.Component';

class MyNotesPure extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            showNotFound: false,
            searchComponent: {
                value: '',
                enterKey: (e) => this.searchItems(e),
                action: (e) => this.setSearchValue(e),
                startTimer: (e) => this.startTimer(e),
                clearTimer: () => this.clearTimer()
            }
        }
        this.getNotes();
    }
    timing = 2000;
    typingTimer;

    startTimer = (e) => {
        this.clearTimer();
        if (e.keyCode !== 13) {
            this.typingTimer = setTimeout(this.searchItems, this.timing);
        }
    }

    clearTimer = () => {
        clearTimeout(this.typingTimer);
    }

    getNotes = () => {
        this.props.firebase.notes(this.props.user.uid).once('value').then(snap => {
            setTimeout(() => this.setState({ myNotes: snap.val(), loading: false }), 700);
        });
    }

    searchItems = (e) => {
        if (e) {
            this.clearTimer();
        }
        this.setState({ loading: true });
        this.props.firebase.db.ref().child('notes').child(this.props.user.uid)
        .orderByChild('title').equalTo(this.state.searchComponent.value).on('value', (response) => {
            const result = response.val(); 
            if (result) {
                setTimeout(() => this.setState({ myNotes: result, loading: false }), 500)
            } else {
                this.setState({ showNotFound: true });
                setTimeout(() => this.setState({ showNotFound: false }), 2000);
                this.getNotes();
            }
        })
    }

    setSearchValue = (e) => {
        let { searchComponent } = this.state;
        searchComponent.value = e.target.value;
        this.setState({ searchComponent });
    }

    render() {

        const stringShortener = (string) => string.length > 20 ? `${string.substring(0,20)}...` : string.substring(0,20);
        const redirect = (item) => {
            this.props.history.push({
                pathname: ROUTES.NOTE,
                state: { item }
            });
        }
        let keyContainer = [];
        keyContainer.unshift('addElement');
        if (this.state && this.state.myNotes) {
            Object.keys(this.state.myNotes).forEach(key => keyContainer.push(key));
        }
        
        return(
            <div className="my-notes">
                <SearchField key="lkkllk" state={this.state.searchComponent}/>
                { this.state.showNotFound && <div className="not-found-search">
                                                <span className="no-select">No items were found </span>
                                            </div>
                }
                <ul className="no-select">
                    { keyContainer.length > 0 && keyContainer.map(item => 
                        item !== 'addElement'
                        ? <li key={this.state.myNotes[item].title} onClick={() => redirect(item)}>
                                <div className="card-title">
                                    {this.state.myNotes[item].title}
                                </div>
                                <div className="card-content">
                                    { stringShortener(this.state.myNotes[item].content) }
                                </div>
                            </li>
                        : <NewNote key={item}/>)
                    }
                    { this.state.loading && <Loader /> }
                </ul>
            </div>
        )
    }
}

const NewNote = () =>  {
    return (
        <li>
            <Link to={ROUTES.NOTE}>
                <div className="add-icon">
                    <FontAwesomeIcon icon={faPlus} size="3x"/>
                </div>
            </Link>
        </li>
    )
}

const MyNotes = compose(withRouter, withFirebase)(MyNotesPure);
export default withFirebase(MyNotes);
