export function calculateLineItemPricing({
  customerSellingPrice,
  customerQuantity,
  discount = 0,
  tax = 0,
  taxType = "inclusive",
}) {
  // console.log("Calculating line item pricing with inputs:", {
  //   customerSellingPrice,
  //   customerQuantity,
  //   discount,
  //   tax,
  //   taxType,
  // });
  const sellingPrice = Number(customerSellingPrice) || 0;
  const quantity = Number(customerQuantity) || 0;
  const taxRate = Number(tax) || 0;
  const discountPercent = Number(discount) || 0;

  let basePrice = 0;
  let discountPerItem = 0;
  let totalDiscount = 0;
  let subTotalWithOutDiscount = 0;
  let subTotal = 0;
  let taxAmountPerItem = 0;
  let totalTax = 0;
  let finalAmount = 0;

  if (taxType === "inclusive") {
    // Step 1: Extract base price (without tax)
    basePrice = sellingPrice / (1 + taxRate / 100);

    // Step 2: Subtotal without discount = (base * qty)
    subTotalWithOutDiscount = basePrice * quantity;

    // Step 3: Discount on base price
    totalDiscount = ((basePrice * discountPercent) / 100) * quantity;
    discountPerItem = totalDiscount / quantity;

    // Step 4: Subtotal = (base * qty) - total discount
    subTotal = subTotalWithOutDiscount - totalDiscount;

    // Step 5: Calculate tax
    totalTax = (subTotal * taxRate) / 100;
    taxAmountPerItem = totalTax / quantity;

    // Step 6: Final payable amount
    finalAmount = subTotal + totalTax;
  }

  return {
    basePrice: parseFloat(basePrice.toFixed(2)),
    discountPerItem: parseFloat(discountPerItem.toFixed(2)),
    totalDiscount: parseFloat(totalDiscount.toFixed(2)),
    subTotalWithOutDiscount: parseFloat(subTotalWithOutDiscount.toFixed(2)),
    subTotal: parseFloat(subTotal.toFixed(2)),
    taxAmountPerItem: parseFloat(taxAmountPerItem.toFixed(2)),
    totalTax: parseFloat(totalTax.toFixed(2)),
    finalAmount: parseFloat(finalAmount.toFixed(2)),
    quantity,
    sellingPrice,
  };
}

// export function calculateLineItemPricing({
//   customerSellingPrice,
//   customerQuantity,
//   discount = 0,
//   tax = 0,
//   taxType = "inclusive",
// }) {
//   const sellingPrice = Number(customerSellingPrice) || 0;
//   const quantity = Number(customerQuantity) || 0;

//   const discountAmount = (sellingPrice * discount) / 100;
//   const totalDiscount = discountAmount * quantity;
//   const lineTotal = sellingPrice * quantity;

//   const taxPerItem = ((sellingPrice - discountAmount) * tax) / 100;
//   const taxTotal = taxPerItem * quantity;

//   // const sellingPrice = Number(customerSellingPrice) || 0;
//   const baseQuantity = Number(customerQuantity) || 0;
//   const baseDiscount = Number(discount) || 0;
//   const baseTax = Number(tax) || 0;

//   // IF tax is inclusive, we need to adjust the selling price and tax amount
//   // to reflect the tax included in the selling price.
//   // Calculate the base price from tax
//   let basePrice = 0;
//   let taxAmount = 0;
//   let finalAmount = 0;

//   if (taxType === "inclusive") {
//     basePrice = sellingPrice / (1 + baseTax / 100); // Base price per unit
//     taxAmount = sellingPrice - basePrice; // Tax included in selling price

//     const totalBase = basePrice * baseQuantity;
//     const totalTax = taxAmount * baseQuantity;

//     // Final calculation: (base - discount) + tax
//     finalAmount = totalBase - baseDiscount + totalTax;
//   }

//   return {
//     basePrice: basePrice.toFixed(2),
//     taxAmount: taxAmount.toFixed(2),
//     finalAmount: finalAmount.toFixed(2),
//     sellingPrice,
//     discountAmount,
//     totalDiscount,
//     lineTotal,
//     taxPerItem,
//     taxTotal,
//   };
// }
