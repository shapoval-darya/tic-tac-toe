class TicTacToe {
    constructor() {
        this._matrix = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];
        this.SYMBOLS = ['x', 'o'];

        this.WIN_COMBINATIONS = [
            [
                [1, 1, 1],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [1, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [1, 1, 1]
            ],
            [
                [1, 0, 0],
                [1, 0, 0],
                [1, 0, 0]
            ],
            [
                [0, 1, 0],
                [0, 1, 0],
                [0, 1, 0]
            ],
            [
                [0, 0, 1],
                [0, 0, 1],
                [0, 0, 1],
            ],
            [
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1]
            ],
            [
                [0, 0, 1],
                [0, 1, 0],
                [1, 0, 0]
            ]
        ]

        this._current_player = this.SYMBOLS[0];
        this._winner = null;
    }

    getCurrentPlayerSymbol() {
        return this._current_player;
    }

    nextTurn(rowIndex, columnIndex) {
        if (this._matrix[rowIndex][columnIndex] !== null) {
            return false;
        }
        this._matrix[rowIndex][columnIndex] = this._current_player;
        this.calculate();
        this._current_player = this._current_player === this.SYMBOLS[0] ? this.SYMBOLS[1] : this.SYMBOLS[0];
    }

    calculate() {
        let isWin = false;
        for (const comb of this.WIN_COMBINATIONS) {
            let miss_found = false;
            for (let i = 0; i < comb.length; i++) {
                for (let j = 0; j < comb.length; j++) {
                    if (comb[i][j] === 1 && this._matrix[i][j] !== this._current_player) {
                        miss_found = true;
                        break;
                    }
                }
            }
            if (!miss_found) {
                isWin = true;
                break;
            }
        }
        if (isWin) {
            this._winner = this._current_player;
        }
    }

    isFinished() {
        return !!this._winner || this.isDraw();
    }

    getWinner() {
        return this._winner;
    }

    noMoreTurns() {
        for (let i = 0; i < this._matrix.length; i++) {
            for (let j = 0; j < this._matrix[i].length; j++) {
                if (this._matrix[i][j] === null) {
                    return false;
                }
            }
        }
        return true;
    }

    isDraw() {
        return this.noMoreTurns() && this._winner === null;

    }

    getFieldValue(rowIndex, colIndex) {
        return this._matrix[rowIndex][colIndex];
    }
}

module.exports = TicTacToe;