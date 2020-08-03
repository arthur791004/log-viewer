export const removeQuotedString = (s) => {
  const isQuoted = s[0] === s[s.length - 1] && (s[0] === "'" || s[0] === '"');
  if (isQuoted) {
    return s.slice(1, -1);
  }

  return s;
};
