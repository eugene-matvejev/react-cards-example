import React, { Component } from 'react';
import Deck from './component/deck';
import GameModel, { types } from './model/game_model';
import './stylesheets/css/component/controls.css';

class App extends Component {
    constructor() {
        super();

        this.state = {
            data: GameModel.generate(52),
        }

        this.sortByRank = this.sortByRank.bind(this);
        this.sortByType = this.sortByType.bind(this);
        this.onRemoveCallback = this.onRemoveCallback.bind(this);
        this.generateDeck = this.generateDeck.bind(this);
        this.shuffle = this.shuffle.bind(this);
    }

    generateDeck(size) {
        size = size < 1 ? 1 : (size > 52 ? 52: size);
        const data = GameModel.generate(size);

        this.setState({ data });
    }

    shuffle() {
        const { data } = this.state;

        const sorted = GameModel.shuffle(data);

        this.setState({ data: sorted });
    }

    sortByRank(direction) {
        const { data } = this.state;

        const sorted = GameModel.sortByRank(data, direction);

        this.setState({ data: sorted });
    }

    sortByType(order) {
        const { data } = this.state;

        const sorted = GameModel.sortByType(data, order);

        this.setState({ data: sorted });
    }

    onRemoveCallback(id) {
        const { data } = this.state;

        delete data[id];
        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        const { hearts, tiles, clovers, pikes } = types;

        const ORDER1 = [ clovers, hearts, tiles, pikes ];
        const ORDER2 = [ hearts, clovers, tiles, pikes ];
        const ORDER3 = [ hearts, tiles, clovers, pikes ];
        const ORDER4 = [ hearts, tiles, pikes, clovers ];

        return [
            <fieldset className="component controls" key='controls'>
                <h1>control panel</h1>
                <div>
                    <h3>sort by rank</h3>
                    <button id="sort-by-asc" onClick={() => this.sortByRank('asc')}>asc</button>
                    <button id="sort-by-desc" onClick={() => this.sortByRank('desc')}>desc</button>
                </div>
                <div>
                    <h3>sort by type</h3>
                    <button onClick={() => this.sortByType(ORDER1)}>C-H-T-P</button>
                    <button onClick={() => this.sortByType(ORDER2)}>H-C-T-P</button>
                    <button onClick={() => this.sortByType(ORDER3)}>H-T-C-P</button>
                    <button onClick={() => this.sortByType(ORDER4)}>H-T-P-C</button>
                </div>
                <div>
                    <h3>shuffle</h3>
                    <button id="shuffle" onClick={() => this.shuffle()}>shuffle</button>
                </div>
                <div>
                    <h3>generate fresh model</h3>
                    <input type="number" min={'1'} max={'52'} onChange={({target: {value}}) => this.generateDeck(value)}/>
                </div>
                <h3>**click on card to remove it from deck**</h3>
            </fieldset>,
            <Deck key='deck' cards={data} removeCallBack={this.onRemoveCallback}/>,
        ];
    }
}

export default App;
