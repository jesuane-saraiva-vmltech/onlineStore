export const priceFormatter = new Intl.NumberFormat("en-EU", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  style: "currency",
  currency: "EUR",
});

export const formatPrice = (price: number) => {
  return priceFormatter.format(price);
};
