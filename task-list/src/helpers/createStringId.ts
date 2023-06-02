export const createStringId = (IdCount: number) => {
  if (IdCount < 9) {
    return `0${IdCount + 1}`
  }
  else {
    return `${IdCount + 1}`
  }
}
