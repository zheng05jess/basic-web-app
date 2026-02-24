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
  return "";
}