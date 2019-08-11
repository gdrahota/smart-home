const getAddr = address => {
  const part2 = Math.floor(address / 2048)
  const rest2 = address - part2 * 2048
  const part1 = Math.floor(rest2 / 256)
  const rest1 = rest2 - part1 * 256
  console.log(part2 + '/' + part1 + '/' + rest1)
}

console.log(getAddr(4353))
