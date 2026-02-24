export default function QueryProcessor(query: string): string {
  if (query.toLowerCase().includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (query.toLowerCase().includes("name")) {
    return "Jessica Zheng";
  }

  if (query.toLowerCase().includes("andrew id")) {
    return "jzheng5";
  }

  query = query.toLowerCase().trim();

  // Handle addition questions (e.g., "72 plus 89" or "What is 4 plus 6?")
  let plusMatch = query.match(/(\d+)\s+plus\s+(\d+)/);
  if (plusMatch) {
    let num1 = parseInt(plusMatch[1], 10);
    let num2 = parseInt(plusMatch[2], 10);
    return (num1 + num2).toString();
  }

  // Handle multiple plus questions
  let multiplePlusMatch = query.match(/(\d+)\s+plus\s+(\d+(?:\s+plus\s+\d+)*)/);
  if (multiplePlusMatch) {
    let num1 = parseInt(multiplePlusMatch[1], 10);
    let rest = multiplePlusMatch[2];
    let numbers = rest.match(/\d+/g);
    if (numbers) {
      let sum = num1 + numbers.map(Number).reduce((a, b) => a + b, 0);
      return sum.toString();
    }
  }

  // Handle largest number questions
  if (query.includes("largest")) {
    let numbers = query.match(/-?\d+(\.\d+)?/g);
    if (numbers) {
      let max = Math.max(...numbers.map(Number));
      return max.toString();
    }
  }

  // Handle which numbers are both a square and a cube
  if (query.includes("both a square and a cube")) {
    let numbers = query.match(/\d+/g);
    if (!numbers) return "No numbers found.";

    for (let numStr of numbers) {
      let num = parseInt(numStr, 10);

      let sqrt = Math.sqrt(num);
      let cbrt = Math.cbrt(num);

      if (Number.isInteger(sqrt) && Number.isInteger(cbrt)) {
        return num.toString();
      }
    }
  }

  // Handle multiplication questions 
  let multiplyMatch = query.match(/(\d+)\s+multiplied\s+(\d+)/);
  if (multiplyMatch) {
    let num1 = parseInt(multiplyMatch[1], 10);
    let num2 = parseInt(multiplyMatch[2], 10);
    return (num1 * num2).toString();
  }

  // Handle minus number questions
  let minusMatch = query.match(/(\d+)\s+minus\s+(\d+)/);
  if (minusMatch) {
    let num1 = parseInt(minusMatch[1], 10);
    let num2 = parseInt(minusMatch[2], 10);
    return (num1 - num2).toString();
  }

  // Handle prime number questions
  if (query.includes("prime")) {
    let numbers = query.match(/\d+/g);
    if (!numbers) return "No numbers found.";

    let primes = numbers.filter(numStr => {
      let num = parseInt(numStr, 10);
      if (num < 2) return false;
      for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
      }
      return true;
    });

    return primes.join(", ");
  } 

  // Handles powers
  let powerMatch = query.match(/(\d+)\s+to the power of\s+(\d+)/);
  if (powerMatch) {
    let base = parseInt(powerMatch[1], 10);
    let exponent = parseInt(powerMatch[2], 10);
    return Math.pow(base, exponent).toString(); 
  }

  // Handle plus and multiply questions
  let plusMultiplyMatch = query.match(/(\d+)\s+plus\s+(\d+)\s+multiplied\s+by\s+(\d+)/);
  if (plusMultiplyMatch) {
    let num1 = parseInt(plusMultiplyMatch[1], 10);
    let num2 = parseInt(plusMultiplyMatch[2], 10);
    let num3 = parseInt(plusMultiplyMatch[3], 10);
    return (num1 + num2 * num3).toString();
  }   

  // Handle multiply plus 
  let multiplyPlusMatch = query.match(/(\d+)\s+multiplied\s+by\s+(\d+)\s+plus\s+(\d+)/);
  if (multiplyPlusMatch) {
    let num1 = parseInt(multiplyPlusMatch[1], 10);
    let num2 = parseInt(multiplyPlusMatch[2], 10);
    let num3 = parseInt(multiplyPlusMatch[3], 10);
    return (num1 * num2 + num3).toString();
  }   
  return "";
}