export function currencyFormatter(number: number) {
  return new Intl.NumberFormat("em-US", { style: "currency", currency: "USD" }).format(number);
}
