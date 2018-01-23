import GameModel, { types as cardTypes, ranks as cartGrades, } from './game_model';

describe('Game Model', () => {
    const dataProvider = [4, 8, 36, 52];

    describe('generate', () => {
        dataProvider.forEach((num) => {
            it(`generate deck of ${num} cards`, () => {
                const cards = GameModel.generate(num);

                expect(cards.length).toBe(num);
            });

            it(`there shouldn't be similar byte sequences in generated card deck of ${num}`, () => {
                const cards = GameModel.generate(num);

                const hashMap = {};
                for (const card of cards) {
                    const hash = JSON.stringify(card);

                    hashMap[hash] = hashMap[hash] ? hashMap[hash] + 1 : 1;
                };

                for (const card of Object.keys(hashMap)) {
                    expect(hashMap[card]).toBe(1);
                }
            });
        });
    });

    dataProvider.forEach((num) => {
        const cards = GameModel.generate(num);
        const cartGradesArr = Object.keys(cartGrades).reverse().map((key) => cartGrades[key]);
        const cardTypesArr = Object.keys(cardTypes).map((t) => cardTypes[t]);

        describe(`sort ${num} card deck`, () => {

            describe(`::sortByType`, () => {
                describe('expected exceptions', () => {
                    describe('"order" param is not array', () => {
                        it('on undefined', () => {
                            expect(() => GameModel.sortByType(cards)).toThrow(Error);
                        });
                        it('on object', () => {
                            expect(() => GameModel.sortByType(cards, {})).toThrow(Error);
                        });
                        it('on string', () => {
                            expect(() => GameModel.sortByType(cards, 'test')).toThrow(Error);
                        });
                        it('on number', () => {
                            expect(() => GameModel.sortByType(cards, 123)).toThrow(Error);
                        });
                    });

                    it('"order" is not a same length as array of all types', () => {
                        expect(() => GameModel.sortByType(cards, [])).toThrow(Error);
                    });

                    it('"order" contains "non-type" value', () => {
                        expect(() => GameModel.sortByType(cards)).toThrow(Error);
                    });
                });

                it(`should keep same amount of cards after sorting`, () => {
                    const sorted = GameModel.sortByType(cards, cardTypesArr);

                    expect(sorted.length).toBe(cards.length);
                });
            });



            describe(`::sortByRank`, () => {
                describe('expected exceptions', () => {
                    describe('"direction" param is not "asc/desc"', () => {
                        it('on undefined', () => {
                            expect(() => GameModel.sortByRank(cards)).toThrow(Error);
                        });
                        it('on number', () => {
                            expect(() => GameModel.sortByRank(cards, 123)).toThrow(Error);
                        });
                        it('on string', () => {
                            expect(() => GameModel.sortByRank(cards, 'helloworld')).toThrow(Error);
                        });
                    });
                });

                ['asc', 'desc'].forEach((direction) => {
                    it(`direction: ${direction} should keep same amount of cards after sorting`, () => {
                        const sorted = GameModel.sortByRank(cards, direction);

                        expect(sorted.length).toBe(cards.length)
                    });

                    it(`direction: ${direction} should be sorted`, () => {
                        const typeCount = cardTypesArr.length;
                        const criteria = cartGradesArr.slice(0, Math.round(num / typeCount));
                        const expectedOrder = direction === 'desc' ? criteria : criteria.slice().reverse();


                        const sorted = GameModel.sortByRank(cards, direction);
                        const totalIterations = sorted.length / typeCount;

                        for (let i = 0; i < totalIterations; i++) {
                            const toCheck = sorted.slice(i * typeCount, (i + 1) * typeCount);

                            toCheck.forEach((o) => {
                                expect(o.rank).toBe(expectedOrder[i]);
                            });
                        };
                    });
                });
            });
        });
    });
});
