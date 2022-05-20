class StringCalculator {
  invocations = 0;

  public getCalledCount(): number {
      return this.invocations;
  }

  public Add(input: string): number {
    this.invocations++;

    if(input === "") {
      return 0;
    }

    const numbers = this.parseInputString(input)
    const sum = numbers.reduce((a, b) => a + b, 0);

    return sum;
  }

  private parseInputString(input: string): number[] 
  {
    let numberString = input;
    let separator: RegExp | string = /,|\n/;

    if (input.startsWith("//")) {
      numberString = input.substring(3);
      separator = input[2];
    }

    const numbers = numberString
      .split(separator)
      .map((numberString) => {
        const number = parseInt(numberString);

        return number > 1000 ? 0 : number;
      });

    const foundNegatives = numbers.filter(number => number < 0);

    if (foundNegatives.length) {
      const negativesString: string = foundNegatives.join(', ');

      throw new Error("negatives not allowed, given: " + negativesString);
    }

    return numbers;
  }
}

export default StringCalculator;
