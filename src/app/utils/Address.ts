export function shortenAddress(
  address: string,
  visibleStart = 5,
  visibleEnd = 3
) {
  if (address.length <= visibleStart + visibleEnd) {
    return address; // Si el address es más corto, no se recorta.
  }
  const start = address.slice(0, visibleStart);
  const end = address.slice(-visibleEnd);
  return `${start}...${end}`;
}

