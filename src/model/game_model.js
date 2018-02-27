const types = {
    hearts: 0x01,
    tiles: 0x02,
    clovers: 0x04,
    pikes: 0x08,
};
const typeNames = {};
const typesArr = Object.keys(types).map((key) => {
    const v = types[key];
    typeNames[v] = key;

    return v;
});

const ranks = {
    2: 2, //0x00000001,
    3: 3, //0x00000002,
    4: 4, //0x00000004,
    5: 5, //0x00000008,
    6: 6, //0x00000010,
    7: 7, //0x00000020,
    8: 8, //0x00000040,
    9: 9, //0x00000080,
    10: 10, //0x00000100,
    11: 11, //0x00000200, // Jack
    12: 12, //0x00000400, // Queen
    13: 13, //0x00000800, // King
    14: 14, //0x00001000, // Ace
};
const rankNames = {
    2: 2, //0x00000001,
    3: 3, //0x00000002,
    4: 4, //0x00000004,
    5: 5, //0x00000008,
    6: 6, //0x00000010,
    7: 7, //0x00000020,
    8: 8, //0x00000040,
    9: 9, //0x00000080,
    10: 10, //0x00000100,
    11: 'jack', //0x00000200, // Jack
    12: 'queen', //0x00000400, // Queen
    13: 'king', //0x00000800, // King
    14: 'ace', //0x00001000, // Ace
};
const ranksArr = Object.keys(ranks).reverse().map((key) => ranks[key]);

const createCard = (type, rank) => ({
    type,
    rank,
});
const compare = (a, b) => {
    if (a.rank > b.rank) {
        return -1;
    }

    if (a.rank < b.rank) {
        return 1;
    }

    return 0;
};

class GameModel {
    static generate = (size) => {
        const cardsPerType = Math.ceil(size / typesArr.length);
        const cards = [];

        for (let i = 0; i < cardsPerType; i++) {
            const rank = ranksArr[i];

            typesArr.forEach((type) => cards.push(createCard(type, rank)));
        }

        return cards;
    };

    static shuffle(cards) {
        let i = cards.length;

        while (i > 0) {
            let index = Math.floor(Math.random() * i);

            i--;

            let temp = cards[i];
            cards[i] = cards[index];
            cards[index] = temp;
        }

        return cards;
    }

    static sortByType = (cards, order) => {
        const sorted = [];

        if (!Array.isArray(order)) {
            throw new Error(`'order' should be array`);
        }

        if (order.length !== typesArr.length) {
            throw new Error(`'order' should contain same amount of elements`);
        }

        if (!order.every((t) => typesArr.includes(t))) {
            throw new Error(`unknown type`);
        }

        order.forEach((t) => {
            cards.forEach((c) => {
                if (c.type === t) {
                    sorted.push(c);
                }
            })
        });

        return sorted;
    }

    static sortByRank = (cards, direction) => {
        switch (direction) {
            case 'desc':
                return cards.sort((a, b) => compare(a, b));
            case 'asc':
                return cards.sort((a, b) => compare(b, a));
            default:
                throw new Error('unknown direction');
        }
    }
};

export default GameModel;
export {
    types,
    typeNames,
    ranks,
    rankNames,
};
