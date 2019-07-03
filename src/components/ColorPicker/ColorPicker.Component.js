import React from 'react';
import './ColorPicker.Component.scss';
import { faEyeSlash, faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const iconRef = React.createRef();

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSection: true };
    }

    toggleSection = () => {
        const { showSection } = this.state;
        this.setState({ showSection : !showSection });
    }

    render() {
        return(
            <div className="color-picker" ref={iconRef}>
                <FontAwesomeIcon onClick={this.toggleSection} icon={this.state.showSection ? faEyeSlash : faPaintBrush} size="1x" className="color-picker-icon"></FontAwesomeIcon>
                { this.state.showSection && <Section color={this.props.color} />}
            </div>
        )
    }
}

class Section extends React.Component {

    setColor = (color) => {
        iconRef.current.style.backgroundColor = `rgb(${color})`;
        this.props.color(color);
    }

    render() {
        return(
            <section>
                
                <ul>
                    <li className="color-1" onClick={() => this.setColor('245, 202, 124')}></li>
                    <li className="color-2" onClick={() => this.setColor('237, 173, 250')}></li>
                    <li className="color-3" onClick={() => this.setColor('137, 137, 206')}></li>
                    <li className="color-4" onClick={() => this.setColor('123, 241, 236')}></li>
                </ul>
            </section>
        )
    }
}

export default ColorPicker;