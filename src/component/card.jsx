import React from 'react';
import PropTypes from 'prop-types';
import { typeNames } from '../model/game_model';
import '../stylesheets/css/component/card.css';

const Card = ({ rank, type, onClick }) => <span className={`component card ${typeNames[type]} rank${rank}`} onClick={onClick} />

Card.propTypes = {
    rank: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
};

Card.defaultProps = {
};

export default Card;
