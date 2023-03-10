import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'elo',
    url: 'https://megak.pl',
    price: 10,
    lat: 9,
    lon: 9,
};

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('elo');
});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie może być mniejsza od 0, lub większa niż 9 999 999.');
});

test('Validates invalid name', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        name: ''
    })).toThrow('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');

    expect(() => new AdRecord({
        ...defaultObj,
        name: 'a'.repeat(101)
    })).toThrow('Nazwa ogłoszenia nie może być pusta, ani przekraczać 100 znaków.');
});

test('Validates invalid description', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        description: 'a'.repeat(1001)
    })).toThrow('Treść ogłoszenia nie może przekraczać 1000 znaków.');
});
// @TODO url valid test
// test('Validates invalid url', () => {
//     expect(() => new AdRecord({
//         ...defaultObj,
//         url: ''
//     })).toThrow('Link ogłoszenia nie może być pusty ani przekraczać 100 znaków.');
//
//     expect(() => new AdRecord({
//         ...defaultObj,
//         url: 'a'.repeat(101)
//     })).toThrow('Link ogłoszenia nie może być pusty ani przekraczać 100 znaków.');
// });
// @TODO lat/lon valid test
// test('Validates invalid lat/lon', () => {
//     expect(() => new AdRecord({
//         ...defaultObj,
//         lat: 'a' as never,
//         lon: 9
//     })).toThrow('Nie można zlokalizować ogłoszenia.');
//
//     expect(() => new AdRecord({
//         ...defaultObj,
//         lat: 9,
//         lon: 'a' as never
//     })).toThrow('Nie można zlokalizować ogłoszenia.');
// });