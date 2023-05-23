

export const randomizeArray = (
  quotes: Quote[]
) => {

  for (let i = quotes.length - 1; i > 0; --i) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [quotes[i], quotes[j]] = [quotes[j], quotes[i]];
  }

  return quotes;
}
