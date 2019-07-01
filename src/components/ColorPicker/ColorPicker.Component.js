import React from 'react';
import './ColorPicker.Component.scss'

class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showSection: false };
    }

    toggleSection = () => {
        const { showSection } = this.state;
        this.setState({ showSection : !showSection });
    }

    render() {
        return(
            <div className="color-picker">
                <button onClick={this.toggleSection}>Change Colors</button>
                { this.state.showSection && <Section color={this.props.color} />}
            </div>
        )
    }
}

class Section extends React.Component {

    setColor = (color) => {
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