import React, {Component} from 'react';
import './App.css';
import Card from './Components/Card/Card';
import {getRandomInt} from "./Utils/functions";


/*
@INFO
AllCard, toutes nos cartes de base
Que signifient 1 / 11 / 12 // 13 (?)
Ou sont passés l'AS, le valet, la reine et le roi ?

Mais pourquoi une constante pour les stocker ?
Comment modifier le jeu quand une carte est tirée ?
 */
const AllCards = {
    colors: ['Red', 'Black'],
    shape: ['Heart', 'Tile', 'Clover', 'Pike'],
    cards: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13
    ]
};

export default class App extends Component {
    constructor() {
        super();

        /*
        @Info
        Le state global de l'application est App.js
        Nous pouvons gérer l'état global de l'application ici
         */
        this.state = {
            showCards: false,
            leftHand: {
                color: '',
                shape: '',
                card: 0
            },
            rightHand: {
                color: '',
                shape: '',
                card: 0,
            },
            winner: ''
        };
    }

    /*
    Génère une main grâce à notre const "AllCards"
     */
    generateHand = () => {
        return {
            color: AllCards.colors[getRandomInt(AllCards.colors.length)],
            shape: AllCards.shape[getRandomInt(AllCards.shape.length)],
            card: AllCards.cards[getRandomInt(AllCards.cards.length)],
        }
    };

    /*
    Fonction appelée au clic sur "Démarrer"
     */
    startRound = () => {
        let active = this.state.showCards;

        if (!active) {
            // Epreuve [1]
            // TODO: Quelle fonction appeler quand l'on veut lancer un nouveau jeu ?
        } else {
            this.setState({winner: ''})
        }

        this.setState({
            showCards: !active
        })
    };

    /*
    Génère un nouveau couple de cartes pour la main gauche et main droite
     */
    generateNewCards = () => {

        let leftHand = this.generateHand();
        let rightHand = this.generateHand();

        /*
        TODO: Il n'existe pas à l'heure actuelle de pile(s) de cartes
        TODO: Enlever à chaque tour 2 cartes à la pile
         */

        let winner = this.getWinner(leftHand, rightHand);

        this.setState({
            leftHand: leftHand,
            rightHand: rightHand,
            winner: winner
        })
    };

    getWinner = (leftHand, rightHand) => {
        // TODO: Comment savoir quelle main gagne ?
        // TODO: Votre mission est de développer la fonction
        return 'left'; // ou 'right' (?)
    };

    render() {
        return (
            <div className="App">
                <div className="LeftWinner FlexCenter NeonTextOnly">
                    {(this.state.winner === 'left') && 'Winner'}
                </div>

                <div className="RightWinner FlexCenter NeonTextOnly">
                    {(this.state.winner === 'right') && 'Winner'}
                </div>

                <div className="PlayerOne FlexCenter">
                    <Card data={this.state.leftHand} shown={this.state.showCards}/>
                </div>
                <div className="PlayerTwo FlexCenter">
                    <Card data={this.state.rightHand} shown={this.state.showCards}/>
                </div>
                <div className="GameZone FlexCenter">
                    <a className="GameButton Neon" onClick={this.startRound}>
                        {this.state.showCards ? 'Continuer' : 'Nouveau tirage'}
                    </a>
                </div>
            </div>
        );
    }
}
