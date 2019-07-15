import React from 'react';
import './MyNotes.Component.scss'
import { withFirebase } from '../Firebase/';
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from '../../constants/routes';
import Loader from '../Loader/LoaderComponent';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { compose } from 'recompose';

class MyNotesPure extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
        this.props.firebase.notes(props.user.uid).once('value').then(snap => {
            setTimeout(() => this.setState({ myNotes: snap.val(), loading: false }), 700);
        });
    }

    render() {

        const stringShortener = (string) => string.length > 20 ? `${string.substring(0,20)}...` : string.substring(0,20);
        const redirect = (item) => {

            this.props.history.push({
                pathname: ROUTES.NOTE,
                state: { item }
            })
        }
        let keyContainer = [];
        keyContainer.unshift('addElement');
        if (this.state && this.state.myNotes) {
            Object.keys(this.state.myNotes).forEach(key => keyContainer.push(key));
        }

        return(
            <div className="my-notes">
                <ul className="no-select">
                    { keyContainer.length > 0 && keyContainer.map(item => 
                        item !== 'addElement'
                        ? <li key={this.state.myNotes[item].note.title} onDoubleClick={() => redirect(item)}>
                                <div className="card-title">
                                    {this.state.myNotes[item].note.title}
                                </div>
                                <div className="card-content">
                                    { stringShortener(this.state.myNotes[item].note.content) }
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
