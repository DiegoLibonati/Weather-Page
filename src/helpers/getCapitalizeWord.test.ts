import { getCapitalizeWord } from "./getCapitalizeWord";

test("You must return a word in the form 'Capitalize'.", () => {
  const word = "pepe";
  const wordExpected = "Pepe";

  const wordCapitalize = getCapitalizeWord(word);

  expect(wordCapitalize).toBe(wordExpected);
});

test("You must return a word in the form 'Capitalize' - 2 Example.", () => {
  const word = "pepe argento";
  const wordExpected = "Pepe argento";

  const wordCapitalize = getCapitalizeWord(word);

  expect(wordCapitalize).toBe(wordExpected);
});
