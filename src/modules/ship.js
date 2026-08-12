export class Ship {
    constructor(length = 1) {
        this.length = length;
        this.numberHit = 0;
        this.destroyed = false;
    }
    hit() {
        this.numberHit = this.numberHit + 1;
        this.isSunk();
    }
    isSunk() {
        if (this.length === this.numberHit) {
            this.destroyed = true;
            return this.destroyed;
        } else {
            return false;
        }
    }
}
