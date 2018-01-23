import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Deck from './deck';
import GameModel from '../model/game_model';

configure({ adapter: new Adapter() });

const deck = GameModel.generate(4);

describe('<Deck/>', () => {
    describe('render', () => {
        it('renders without errors', () => {
            shallow(<Deck cards={deck} />);
        });
    });
});
