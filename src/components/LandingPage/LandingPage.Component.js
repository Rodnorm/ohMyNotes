import './LandingPage.Component.scss'
import React, { Component } from 'react';

const landingDiv = React.createRef();


class LandingPage extends Component {
    render() {
        return (
            <div className="landing-page flex flex-jutify-center" ref={landingDiv}>
                <div className="flex shadow">
                    <h1 className="title">Oh, My Notes!</h1>
                </div>
                <section className="flex">
                    <div className="background-div flex first">
                        <p>Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Si num tem leite então bota uma pinga aí cumpadi! Não sou faixa preta cumpadi, sou preto inteiris, inteiris.</p>
                    </div>
                    <div className="background-div flex second">
                        <p>Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Si num tem leite então bota uma pinga aí cumpadi! Não sou faixa preta cumpadi, sou preto inteiris, inteiris.</p>
                    </div>
                    <div className="background-div flex third">
                        <p>Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Si num tem leite então bota uma pinga aí cumpadi! Não sou faixa preta cumpadi, sou preto inteiris, inteiris.</p>
                    </div>
                </section>
                <p className="thank-you-note"> Photo by Min An from Pexels </p>
            </div>
        );
    }
}

export default LandingPage;