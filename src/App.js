import React, {Component} from 'react';
import './App.css';
import Card from './Components/Card/Card';
import {getRandomInt} from "./Utils/functions";


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

    generateHand = () => {
        return {
            color: AllCards.colors[getRandomInt(AllCards.colors.length)],
            shape: AllCards.shape[getRandomInt(AllCards.shape.length)],
            card: AllCards.cards[getRandomInt(AllCards.cards.length)],
        }
    };

    startRound = async () => {
        let active = this.state.showCards;

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
        return leftHand.card > rightHand.card ? 'left' : 'right'
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
