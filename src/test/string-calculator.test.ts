import StringCalculator from "../main/StringCalculator";

let calculator: StringCalculator;

//It returns the sum of the numbers in the input string
beforeEach(() => {
  calculator = new StringCalculator();
});

describe("The add method returns", () => {
  it("the number 0 if the input is only an empty string", () => {
    const result = calculator.Add("");
    expect(result).toEqual(0);
  });

  it.each([
    { input: "0", expected: 0 },
    { input: "1", expected: 1 },
    { input: "2", expected: 2 },
    { input: "12", expected: 12 },
  ])("the number given as input", ({ input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });

  it.each([
    { input: "1,2", expected: 3 },
    { input: "2,2", expected: 4 },
    { input: "5,5", expected: 10 },
    { input: "10,10", expected: 20 },
    { input: "10,5", expected: 15 },
    { input: "7,15", expected: 22 },
  ])("the sum of the given input", ({input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });

  it.each([
    { input: "1,2,3", expected: 6 },    
    { input: "1,2,3,0", expected: 6 },    
    { input: "0,2,3,0", expected: 5 },    
  ])("the sum of more than two numbers", ({input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });

  it.each([
    { input: "1\n2\n3", expected: 6 },
    { input: "1,2\n3", expected: 6 },
    { input: "1\n2,3", expected: 6 },
  ])("the sum of multiple numbers with different separators", ({input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });

  it.each([
    { input: "//;\n1;2", expected: 3 },
    { input: "//:\n1:2", expected: 3 },
    { input: "//,\n1,2", expected: 3 },
  ])("the sum of multiple numbers with custom separator", ({input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });

  it.each([
    {input: "-1, 1", exceptionSuffix: "-1"},
    {input: "-1,-2", exceptionSuffix: "-1, -2"},
    {input: "3,-1,-5", exceptionSuffix: "-1, -5"},
    {input: "-2,6,-8", exceptionSuffix: "-2, -8"}
  ])("an error with the message 'negatives not allowed' with a list of given negatives", ({input, exceptionSuffix}) => {
    const addCallback = () => calculator.Add(input);

    expect(addCallback).toThrow(new Error("negatives not allowed, given: " + exceptionSuffix));
  });

  it.each([
    { input: "1,1000", expected: 1001 },
    { input: "1,1001", expected: 1 },
    { input: "5,1001", expected: 5 },
    { input: "5,1001,1", expected: 6 },
  ])("the sum of the given input, ignoring numbers over 1000", ({input, expected }) => {
    const result = calculator.Add(input);
    expect(result).toEqual(expected);
  });
});

describe("the getCalledCount returns the number of time the StringCalculator have been used", () => {
  it("returns 3 when the add has been invoked 3 times", () => {
    calculator.Add("");
    calculator.Add("");
    calculator.Add("");
    
    const invocations = calculator.getCalledCount();

    expect(invocations).toEqual(3);
  });
});
