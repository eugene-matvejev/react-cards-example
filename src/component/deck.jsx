import React from 'react';
import Card from './card';
import PropTypes from 'prop-types';

const Deck = ({ cards, removeCallBack }) => <div className='component deck'>
    {
        cards.map(({ rank, type }, index) => <Card key={index} type={type} rank={rank} onClick={() => removeCallBack(index)} />)
    }
</div>;

Deck.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Deck.defaultProps = {
};

export default Deck;
