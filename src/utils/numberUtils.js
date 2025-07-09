// Function to format a number with commas as thousands separators
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Function to convert a number to a currency format
// export const formatCurrency = (num, currency = "USD") => {
//   return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
//     num
//   );
// };
export const formatCurrency = (amount, currency = "INR", locale = "en-IN") => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};

// Function to convert a number to a percentage format
export const formatPercentage = (num) => {
  return `${(num * 100).toFixed(2)}%`;
};

// Function to style a number in percentage format
export const stylePercentage = (num) => {
  return `${num.toFixed(2)}%`;
};

export const roundDecimalNumber = (num) => {
  return Number.parseFloat(num).toFixed(2);
};
