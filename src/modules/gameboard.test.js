import { Gameboard } from "./gameboard.js";
import { Ship } from "./ship.js";

describe("Gameboard factory / class", () => {
    test("Тест на 4-палубник (гибкость)", () => {
        const board = new Gameboard();
        const myShip3 = new Ship(4);
        const myShip4 = new Ship(4);

        expect(board.placeShip(myShip3, 5, 5, true)).toBe();
        expect(board.placeShip(myShip4, 1, 1, true)).toBe();
    });
    test("Тест на координаты расстановки", () => {
        const board = new Gameboard();
        const myShip3 = new Ship(3);

        expect(board.placeShip(myShip3, 0, 0, true)).toBe();
    });
    test("Тест на попадание", () => {
        const board = new Gameboard();
        const myShip3 = new Ship(3);

        board.placeShip(myShip3, 0, 0, true);

        //board.renderBoard();

        board.receiveAttack(0, 0);

        expect(myShip3.numberHit).toBe(1);

        board.receiveAttack(0, 1);
        expect(myShip3.numberHit).toBe(2);
    });
    test("Тест на уничтожение", () => {
        const board = new Gameboard();
        const myShip2 = new Ship(2);
        board.placeShip(myShip2, 0, 0, false);

        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);

        expect(myShip2.destroyed).toBe(true);
    });
    test("записывает промахи в массив miss", () => {
        const board = new Gameboard();

        board.receiveAttack(5, 5);

        expect(board.miss.length).toBe(1);
        expect(board.miss).toEqual([[5, 5]]);

        board.receiveAttack(5, 6);

        //board.renderBoard();

        expect(board.miss.length).toBe(2);
        expect(board.miss).toEqual([
            [5, 5],
            [5, 6],
        ]);
    });
    test("Тест на отображение всех типов выстрелов", () => {
        const board = new Gameboard();
        const myShip2 = new Ship(2);
        board.placeShip(myShip2, 0, 0, false);
        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);
        board.receiveAttack(0, 3);
    });
    test("Тест на установку корабля в занятое место", () => {
        const board = new Gameboard();
        const myShip2 = new Ship(2);
        const myShip3 = new Ship(3);
        board.placeShip(myShip2, 0, 0, false);
        expect(board.placeShip(myShip3, 0, 0, true)).toBe("Место занято");
    });
    test("Проверка на уничтоженные корабли", () => {
        const board = new Gameboard();
        const myShip2 = new Ship(2);
        const myShip1 = new Ship(1);
        board.placeShip(myShip2, 0, 0, false);
        board.placeShip(myShip1, 5, 0, false);

        board.receiveAttack(0, 0);
        board.receiveAttack(1, 0);
        board.receiveAttack(5, 0);
        console.log(board.ships);
        board.renderBoard();
        expect(board.allSunk()).toBe(true);
    });
    test("Пустая доска", () => {
        const board = new Gameboard();
        expect(board.allSunk()).toBe("На доске нет кораблей");
    });
    test("", () => {});
});
