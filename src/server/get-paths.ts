import type { Paths, PotOptions, PotTypes } from "../helpers.ts";

function getPaths<T extends PotTypes>(pots: PotOptions<T>[]): Paths[] {
  const potTypes = pots.map(a => a.type)
  
  // Get number of coffee and tea pots
  const [coffee, tea] = potTypes.reduce((prev, curr) => {
    if (curr === 'coffee') prev[0]++
    if (curr === 'tea') prev[1]++
    return prev
  }, [0,0])
  
  // Loop through pots again to assign paths
  let paths: Paths[] = []
  let potNum = 0
  for (const pot of pots) {
    if (pot.type === 'coffee' && coffee === 1) {
      paths.push('/')
      continue
    }
    paths.push(`/pot-${potNum}`)
  }
  if (coffee === 1) {}
  return paths
}

export default getPaths
// TODO: add vitest unit tests at bottom