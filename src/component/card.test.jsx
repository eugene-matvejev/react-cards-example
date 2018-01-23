import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Card from './card';
import GameModel from '../model/game_model';

configure({ adapter: new Adapter() });

const [{ type, rank },] = GameModel.generate(4);

describe('<Card/>', () => {
    describe('render', () => {
        it('renders without errors', () => {
            console.log({type, rank})

            shallow(<Card type={type} rank={rank} />);
        })
    });
});
