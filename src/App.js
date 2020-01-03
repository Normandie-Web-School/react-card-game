import React, {Component} from 'react';
import './App.css';
import Card from './Components/Card/Card';
import {getRandomInt, shuffle} from "./Utils/functions";


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

        this.state = {
            /*
             * Dans cet exemple
             * il n'y a qu'une pile de carte pour les deux joueurs
             */
            deck: [],
            showCards: false,
            leftPts: 0,
            rightPts: 0,
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
    Génère les cartes au lancement de l'application Web
     */
    componentDidMount() {
        let deck = [];

        for(let i =0; i < AllCards.cards.length; i++){
            let number = AllCards.cards[i];

            for(let y = 0; y < AllCards.shape.length; y++){
                let color = '';
                let shape = AllCards.shape[y];

                if(AllCards.shape[y] === 'Heart' || AllCards.shape[y] === 'Pike'){
                    color = 'Red'
                } else {
                    color = 'Black'
                }
                deck.push({card: number, shape: shape, color: color})
            }

        }
        /*
         * Fonction dans functions.js
         * Permet de mélanger les cartes
         */
        shuffle(deck);
        this.setState({deck: deck});
    }

    generateHand = () => {
        // Calcule une position aléatoire dans le deck
        let random = getRandomInt(this.state.deck.length);
        // Chercher une main dans le deck
        let hand = this.state.deck[random];

        // On retire la main tirée du deck
        let deck = this.state.deck;
        deck.splice(random, 1);

        // On met à jour le deck
        this.setState({deck: deck});

        return hand;
    };

    startRound = async () => {
        let active = this.state.showCards;

        /*
        Si il reste moins de deux cartes
        Rechargement de la page (remise à zéro)
         */
        if(this.state.deck.length < 2){
            window.confirm('Jeu terminé');
            document.location.reload(true);
        }

        if (!active) {
            this.generateNewCards();
        } else {
            this.setState({winner: ''})
        }

        this.setState({
            showCards: !active
        })
    };

    generateNewCards = () => {

        let leftHand = this.generateHand();
        let rightHand = this.generateHand();

        let winner = this.getWinner(leftHand, rightHand);

        this.setState({
            leftHand: leftHand,
            rightHand: rightHand,
            winner: winner
        })
    };

    getWinner = (leftHand, rightHand) => {
        let winner = leftHand.card > rightHand.card ? 'left' : 'right';

        /*
        Mise à jour du système de points
         */
        if(winner === 'left') {
            let leftPts = this.state.leftPts;
            leftPts++;
            this.setState({leftPts: leftPts})
        }
        if(winner === 'right'){
            let rightPts = this.state.rightPts;
            rightPts++;
            this.setState({rightPts : rightPts})
        }

        return winner;
    };

    render() {
        return (
            <div className="App">
                <div className="LeftPts FlexCenter NeonTextOnly">
                    <p>{this.state.leftPts}</p>
                </div>
                <div className="RightPts FlexCenter NeonTextOnly">
                    <p>{this.state.rightPts}</p>
                </div>

                <div className="LeftWinner FlexCenter NeonTextOnly">
                    <p>{(this.state.winner === 'left') && 'Winner'}</p>
                </div>

                <div className="RightWinner FlexCenter NeonTextOnly">
                    <p>{(this.state.winner === 'right') && 'Winner'}</p>
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
