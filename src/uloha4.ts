const vstup = prompt("Zadaj dve čísla, napr. -2 5:")!;
const [a = 0, n = 0] = vstup.split(" ").map(Number);
console.log(`${a}^${n} = ${a ** n}`);