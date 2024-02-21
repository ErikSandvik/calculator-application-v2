<template>
  <div id="calculator" :class="{ 'logButtonPressed': isLogButtonPressed }">
    <div id="equation" class="calcScreen">{{displayExpression}}</div>
    <div id="currentNumber" class="calcScreen">{{screenValue}}</div>
    <button id="c" class="calcButton" @click="resetCalc()">C</button>
    <button id="ans" class="calcButton" @click="ansButtonPressed()">ANS</button>
    <button id="del" class="calcButton" @click="backspace()">DEL</button>
    <button id="plus" class="calcButton operatorButton" @click="addOperation('+')">+</button>

    <button id="one" class="calcButton" @click="handleNumpadInput(1)">1</button>
    <button id="two" class="calcButton" @click="handleNumpadInput(2)">2</button>
    <button id="three" class="calcButton" @click="handleNumpadInput(3)">3</button>
    <button id="min" class="calcButton operatorButton" @click="addOperation('-')">-</button>

    <button id="four" class="calcButton" @click="handleNumpadInput(4)">4</button>
    <button id="five" class="calcButton" @click="handleNumpadInput(5)">5</button>
    <button id="six" class="calcButton" @click="handleNumpadInput(6)">6</button>
    <button id="multi" class="calcButton operatorButton" @click="addOperation('*')">*</button>

    <button id="seven" class="calcButton" @click="handleNumpadInput(7)">7</button>
    <button id="eight" class="calcButton" @click="handleNumpadInput(8)">8</button>
    <button id="nine" class="calcButton" @click="handleNumpadInput(9)">9</button>
    <button id="divide" class="calcButton operatorButton" @click="addOperation('/')">/</button>

    <button id="blank" class="calcButton"></button>
    <button id="zero" class="calcButton" @click="handleNumpadInput(0)">0</button>
    <button id="point" class="calcButton" @click="handleNumpadInput('.')">.</button>
    <button id="equals" class="calcButton" @click="calculate()">=</button>
  </div>
</template>

<script>
import CalculatorService from '@/services/CalculatorService';

export default {
  name: "Calculator",
  props: {
    isLogButtonPressed: Boolean,
  },
  data() {
    return {
      log: [],
      calcReqNewValue : false,
      mathError : false,
      includesDecimals: false,
      expressionIncludesAns : false,
      screenValue: "0",
      displayExpression: "",
      previousNum: "",
      maxScreenLengthValue: 20,
      ansValue : 0,
      logButtonText : "Show Log",
      logButtonIsPressed : false,
    }
  },
  methods: {
    handleNumpadInput(input) {
      let updatedScreenValue;

      if (this.newValueInput(input)) return;

      /*
      Avoid numpad inputs after an ANS input
       */
      if (this.screenValue === "ANS") return;

      if (this.displayExpressionSolved()) {
        this.startNewExpression();
      }

      if (this.decimalPointInput(input)) return;

      /*Return if screen contents are at max length*/
      if (!this.screenLengthShorterThan(this.maxScreenLengthValue)) return;

      updatedScreenValue = this.appendNumToScreenValue(input);

      if (updatedScreenValue !== null) {
        this.screenValue = updatedScreenValue;
      }
    },
    /*If the calculator screen currently only has a zero on it then replace it
         * with the input, else append the input on the number on the screen*/
    appendNumToScreenValue(num) {
      if (this.screenValue === "0") return num.toString();
      else return this.screenValue += num.toString();
    },
    displayExpressionSolved() {
      if (this.displayExpression.endsWith("=")) return true;
      else return false;
    },
    /*
    If the last input was an operator, then the calc needs a whole new number.
     */
    newValueInput(input) {
      if (this.calcReqNewValue) {
        this.calcReqNewValue = false;
        this.screenValue = "";

        if (this.decimalPointInput(input)) return true;

        this.screenValue = input;

        return true;
      }

      return false;
    },
    startNewExpression() {
      this.screenValue = "";
      this.displayExpression = "";
      this.resetIfMathError();
    },
    /*
      If the input is a decimal point then append it to the end, unless there is already a decimal point.
     */
    decimalPointInput(input) {
      if (input === ".") {
        if(!this.includesDecimals) {
          //Adds a zero in front of the decimal point if there is no other value in front
          if (this.displayExpressionSolved() || this.screenValue.length === 0) {
            this.screenValue = "0."
          }
          else {
            this.screenValue += input;
          }
          this.includesDecimals = true;
        }
        return true;
      }
      return false;
    },
    screenLengthShorterThan(maxScreenLength) {
      if (this.screenValue.length > maxScreenLength) return false;
      else return true;
    },
    resetCalc() {
      this.resetScreenValue()
      this.includesDecimals = false;
      this.resetDisplayExpression()
      this.expressionIncludesAns = false;
      this.mathError = false;
    },
    resetScreenValue() {
      this.screenValue = "0";
    },
    resetDisplayExpression() {
      this.displayExpression = "";
    },
    addOperation(operation) {
      if (this.mathError) return;
      this.displayExpression = this.screenValue + " " + operation;
      this.calcReqNewValue = true;
      this.includesDecimals = false;
    },
    calculate() {
      let result;
      let roundedNumber;

      //If the expression is already solved return
      if (this.displayExpressionSolved()) return;

      this.displayExpression = this.displayExpression + " " + this.screenValue;

      if (this.expressionIncludesAns) {
        this.replaceAns();
      }

      const splitExpression = this.splitExpression(this.displayExpression);
      CalculatorService.calculate(splitExpression.operation, splitExpression.number1, splitExpression.number2).then(response => {
        console.log('Axios response:', response);
        result = response.data;
        this.screenValue = result;
        this.updateAnsValue(result);
        this.addToLog(this.displayExpression + " " + result)
      })
          .catch(error => {
            console.error('Error:', error);
          });

      this.displayExpression += " =";
      this.includesDecimals = false;
      this.expressionIncludesAns = false;

    },
    //If the value is infinite then there is a Math error
    handleMathError(value) {
      if (!isFinite(value)) {
        this.displayExpression += " =";
        this.screenValue = "Math Error";
        this.mathError = true;
        return true;
      }
      else return false;
    },
    splitExpression(expr) {
      const regex = /(-?\d+(?:\.\d+)?)\s*([+\-*\/])\s*(-?\d+(?:\.\d+)?)/;
      const match = expr.match(regex);

      if (match) {
        // Extracting the matched groups
        const number1 = match[1];
        const operation = match[2];
        const number2 = match[3];

        return { number1, operation, number2 };
      } else {
        // Handle cases where the expression does not match the expected format
        console.log("Expression format is incorrect.");
        return null;
      }
    },
    replaceAns() {
      this.displayExpression = this.displayExpression.replace(/ANS/g, this.ansValue);
    },
    /* Rounds the number with a certain amount of fractionDigits, and remove trailing zeroes.*/
    roundNumber(number, fractionDigits) {
      return number.toFixed(fractionDigits).replace(/\.?0+$/, '');
    },
    /*
    Resets the expression if there was a math error
     */
    resetIfMathError() {
      if (this.mathError) {
        this.resetCalc();
      }
    },
    /*Delete last letter in equation*/
    backspace() {
      /*Disallow backspace right after calculate method is run*/
      if (this.displayExpressionSolved()) {
        return;
      }

      /*Set the display to zero if there is only one digit or ANS on screen*/
      if (this.screenValue.length == 1 || this.screenValue === "ANS") {
        this.resetScreenValue();
        return;
      }

      /*Remove the last letter*/
      let newScreenValue = this.screenValue.substring(0, this.screenValue.length - 1);
      this.screenValue = newScreenValue;
    },
    addToLog(entry) {
      this.log.push(entry);
      this.transmitLog()
    },
    transmitLog() {
      this.$emit('logUpdate', this.log)
    },
    updateAnsValue(value) {
      this.ansValue = value;
    },
    ansButtonPressed() {
      this.expressionIncludesAns = true;

      if (this.calcReqNewValue) {
        this.calcReqNewValue = false;
        this.screenValue = "ANS";
      }

      if(this.displayExpressionSolved()) {
        this.screenValue = "ANS";
        this.displayExpression = "";
        this.mathError = false;
        return;
      }

      if(this.screenValue === "0") this.screenValue = "ANS";
    },
  }
}
</script>

<style scoped>
#calculator {
  border-radius: var(--radius);
  padding: var(--padding) var(--buttonOutlinePadding) var(--buttonOutlinePadding) var(--buttonOutlinePadding);
  background-color: #161634;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 0.05fr 0.2fr auto auto auto auto auto;
  grid-gap: 0.05rem;
  grid-template-areas:
    "equation equation equation equation"
    "currentNumber currentNumber currentNumber currentNumber"
    "c ans del plus"
    "one two three min"
    "four five six multi"
    "seven eight nine divide"
    "blank zero point equals";
}

#c {
  grid-area: c;
}

#del {
  grid-area: del;
}

#plus {
  grid-area: plus;
}

#one {
  grid-area: one;
}

#two {
  grid-area: two;
}

#three {
  grid-area: three;
}

#min {
  grid-area: min;
}

#four {
  grid-area: four;
}

#five {
  grid-area: five;
}

#six {
  grid-area: six;
}

#multi {
  grid-area: multi;
}

#seven {
  grid-area: seven;
}

#eight {
  grid-area: eight;
}

#nine {
  grid-area: nine;
}

#divide {
  grid-area: divide;
}

#blank {
  grid-area: blank;
}

#ans {
  grid-area: ans;
}

#zero {
  grid-area: zero;
}

#point {
  grid-area: point;
}

#equals {
  grid-area: equals;
  background-color: #c46a00;
}

.calcScreen {
  font-family: Tahoma, sans-serif;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  grid-area: resultBar;
  margin-right: 5px;
}

#equation {
  color: gray;
  grid-area: equation;
  margin-top: 0.4rem;
}

#currentNumber {
  font-size: 1.3rem;
  word-break: break-all;
  grid-area: currentNumber;
}

.calcButton {
  border-radius: var(--radius);
  padding-top: var(--padding);
  background-color: #39344d;
  font-size: 20px;
  color: white;
}

.calcButton:hover {
  cursor: pointer;
}

.calcButton.operatorButton {
  background-color: #7d50b7;
}

@media only screen and (max-width: 650px) {
  #calculator.logButtonPressed {
    display: none;
  }
}
</style>