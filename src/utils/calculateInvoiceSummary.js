// if  roundOffDifference to 0, set roundoffMethod to add  not subscract
export function calculateInvoiceSummary(input) {
  const {
    products,
    shippingCharges = 0,
    adjustmentAmount = 0,
    adjustmentMethod = "add",
    // roundOffDifference = 0,
    // roundOffMethod = "add",
  } = input;

  const { subtotal, totalDiscount, totalTax } = products.reduce(
    (
      acc,
      {
        customerSubTotalWithOutDiscount = 0,
        customerDiscountTotal = 0,
        customerTaxedTotal = 0,
      }
    ) => {
      acc.subtotal += customerSubTotalWithOutDiscount;
      acc.totalDiscount += customerDiscountTotal;
      acc.totalTax += customerTaxedTotal;
      return acc;
    },
    { subtotal: 0, totalDiscount: 0, totalTax: 0 }
  );

  const baseTotal = subtotal - totalDiscount + totalTax;
  const totalWithShipping = baseTotal + shippingCharges;

  // if (adjustmentAmount === 0) {
  //   adjustmentMethod = "add"; // Default to "add" if adjustment amount is 0
  // }

  const adjustedTotal =
    adjustmentMethod === "subtract"
      ? totalWithShipping - adjustmentAmount
      : totalWithShipping + adjustmentAmount;

  let decimalPart = adjustedTotal % 1;
  let roundedValue = 0;
  let roundType = "";

  if (decimalPart >= 0.5) {
    roundedValue = Math.ceil(adjustedTotal);
    roundType = "add";
  } else {
    roundedValue = Math.floor(adjustedTotal);
    roundType = "subtract";
  }

  // Ensure roundType is "add" when there's no difference
  let roundOffDifference = roundedValue - adjustedTotal;
  if (roundOffDifference === 0) {
    roundType = "add";
  } else if (roundOffDifference < 0) {
    roundOffDifference = Math.abs(roundOffDifference);
  }

  // let finalWithRoundOff = 0;

  // if (roundOffMethod === "subtract") {
  //   finalWithRoundOff = adjustedTotal - roundOffDifference;
  // } else {
  //   finalWithRoundOff = adjustedTotal + roundOffDifference;
  // }

  // const finalTotal =
  //   roundOffMethod === "subtract"
  //     ? adjustedTotal - roundOffDifference
  //     : adjustedTotal + roundOffDifference;

  return {
    subTotal: parseFloat(subtotal.toFixed(2)),
    discount: parseFloat(totalDiscount.toFixed(2)),
    tax: parseFloat(totalTax.toFixed(2)),
    adjustedTotal: parseFloat(adjustedTotal.toFixed(2)),
    roundOffMethod: roundType,
    roundOffDifference: parseFloat(roundOffDifference.toFixed(2)),
    roundedTotal: parseFloat(roundedValue.toFixed(2)),
  };
}
