import React from 'react';
import App from './App';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<App/>', () => {
    describe('render', () => {
        it('renders without errors', () => {
            shallow(<App /> );
        })

        describe('actions', () => {
            [
                { direction: 'asc', expectedRank: 2 },
                { direction: 'desc', expectedRank: 14 },
            ].forEach(({direction, expectedRank}) => {
                it(`sort by ${direction.toUpperCase()}`, () => {
                    const c = mount(<App />);
                    c.find(`button#sort-by-${direction}`).simulate('click');

                    const [card, ] = c.state().data;
                    /** because by default 52 cards are generated, and smallest rank is 2 */
                    expect(card.rank).toBe(expectedRank);
                });
            });

            it(`shuffle`, () => {
                const c = mount(<App />);
                const was = JSON.stringify(c.state().data);

                c.find(`button#shuffle`).simulate('click');
                const now = JSON.stringify(c.state().data)

                expect(was).not.toBe(now);
            });

            it(`generate`, () => {
                const c = mount(<App />);

                c.find(`input[type="number"]`).simulate('change', { target: {value: 4}});
                const { data } = c.state();

                expect(data.length).toBe(4);
            });
        });
    });
});
