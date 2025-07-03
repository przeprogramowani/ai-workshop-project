function fizzBuzz(n: number): void {
  if (n < 1) {
    console.error("Input must be a positive integer.");
    return;
  }

  for (let i = 1; i <= n; i++) {
    let output = "";

    if (i % 3 === 0) output += "Fizz";
    if (i % 5 === 0) output += "Buzz";

    if (output === "") {
      console.log(i);
    } else {
      console.log(output);
    }
  }
}

// Example usage:
fizzBuzz(30);
