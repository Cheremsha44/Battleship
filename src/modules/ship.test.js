import { Ship } from "./ship.js";

describe("Ship factory / class", () => {
    test("создает корабль с правильной длиной и 0 попаданий", () => {
        const myShip3 = new Ship(3);
        const myShip2 = new Ship(2);
        const myShip1 = new Ship(1);
        expect(myShip3.numberHit).toBe(0);
        expect(myShip3.length).toBe(3);
        expect(myShip2.length).toBe(2);
        expect(myShip1.length).toBe(1);
    });

    test("метод hit() увеличивает счетчик попаданий", () => {
        const myShip3 = new Ship(3);
        myShip3.hit();
        expect(myShip3.numberHit).toBe(1);
        myShip3.hit();
        expect(myShip3.numberHit).toBe(2);
    });

    test("isSunk() возвращает false, если корабль еще цел", () => {
        const myShip2 = new Ship(2);
        myShip2.hit();
        expect(myShip2.isSunk()).toBe(false);
    });

    test("isSunk() возвращает true, если количество hit равно длине", () => {
        const myShip2 = new Ship(2);
        myShip2.hit();
        myShip2.hit();
        expect(myShip2.isSunk()).toBe(true);
    });
});
