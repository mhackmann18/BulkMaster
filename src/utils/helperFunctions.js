export function getFracStrFromUniChar(str) {
  /* Accepts a single unicode character and returns its string representation, or null if it's not a valid unicode fraction */

  const unicodeFractions = [
    "½",
    "⅓",
    "⅔",
    "¼",
    "¾",
    "⅕",
    "⅖",
    "⅗",
    "⅘",
    "⅙",
    "⅚",
    "⅐",
    "⅛",
    "⅜",
    "⅝",
    "⅞",
    "⅑",
    "⅒",
  ];
  const unicodeFractionsConversions = [
    "1/2",
    "1/3",
    "2/3",
    "1/4",
    "3/4",
    "1/5",
    "2/5",
    "3/5",
    "4/5",
    "1/6",
    "5/6",
    "1/7",
    "1/8",
    "3/8",
    "5/8",
    "7/8",
    "1/9",
    "1/10",
  ];

  return unicodeFractions.includes(str)
    ? unicodeFractionsConversions[unicodeFractions.indexOf(str)]
    : null;
}

export function formatAmount(num, precision) {
  let multiplier = precision * 10;
  if (!precision || precision < 0) multiplier = 1;
  return `${Math.round(num * multiplier) / multiplier}`;
}
