export function chunkArray(array, chunkSize = 10) {
  return array.reduce((acc, cur, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = []; // start a new chunk
    }

    acc[chunkIndex].push(cur);

    return acc;
  }, []);
}
