/* var calculator = {
    add(x,y){
        return x + y;
    },
    subtract(x,y){
        return x - y;
    },
    multiply(x,y){
        return x * y;
    },
    divide(x,y){
        return x / y;
    }
}; */

class Calculator{
    add(x, y) {
        return x + y;
    }
    subtract(x, y) {
        return x - y;
    }
    multiply(x, y) {
        return x * y;
    }
    divide(x, y) {
        return x / y;
    }
}
module.exports = new Calculator();