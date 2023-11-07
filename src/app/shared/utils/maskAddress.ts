export function maskAddress(address: string, visibleCharacters: number = 4): string {
  if (address.length < visibleCharacters * 2) {
    return address; // The string is too short to be masked
  }
  const start: string = address.substring(0, visibleCharacters);
  const end: string = address.substring(address.length - visibleCharacters);
  return `${start}...${end}`;
}
