class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = [];
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = defaultValue;
            }
        }
    }

    // Get boolean if row value are all the same
    isRowComplete(row) {
        if (row >= this.rows) {
            throw new Error("Row index out of range");
        }
        let array = [];
        for (let i = 0; i < this.cols; i++) {
            array.push(this.data[row][i]);
        }
        if(array.includes(null))
            return false;

        console.log(array)

        let value = this.data[row][0];
        for (let i = 1; i < this.cols; i++) {
            if (array[i] !== value) {
                return false;
            }
        }
        return true;
    }

    // Get boolean if col value are all the same
    isColComplete(col) {
        if (col >= this.cols) {
            throw new Error("Col index out of range");
        }
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            array.push(this.data[i][col]);
        }
        if(array.includes(null))
            return false;

        console.log(array)

        let value = array[0];
        for (let i = 1; i < this.rows; i++) {
            if (array[i] !== value) {
                return false;
            }
        }
        return true;
    }

    // Get boolean if diagonal value are all the same
    isDiagonalComplete() {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            array.push(this.data[i][i]);
        }
        if(array.includes(null))
            return false;

        console.log(array)

        let value = array[0];
        for (let i = 1; i < this.rows; i++) {
            if (array[i] !== value) {
                return false;
            }
        }
        return true;
    }

    // Get boolean if anti-diagonal value are all the same
    isAntiDiagonalComplete() {
        let array = [];
        for (let i = 0; i < this.rows; i++) {
            array.push(this.data[i][this.cols - 1 - i]);
        }
        if(array.includes(null))
            return false;
        
        console.log(array)
        let value = array[0];
        for (let i = 1; i < this.rows; i++) {
            if (array[i] !== value) {
                return false;
            }
        }
        return true;
    }
}

export { Matrix }