export function formatAddress(address = {}) {
  const {
    addressline1 = "",
    addressline2 = "",
    landmark = "",
    city = "",
    state = "",
    pin = "",
    country = "",
  } = address;

  return [
    addressline1,
    addressline2,
    landmark,
    `${city}, ${state}`,
    `${pin}, ${country}`,
  ]
    .filter(Boolean)
    .join("\n");
}
