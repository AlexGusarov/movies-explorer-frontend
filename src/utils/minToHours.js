function minToHours(duration) {
  const hours = Math.floor(duration / 60);
  const min = duration % 60;
  if (min !== 0) {
    return `${hours}ч ${min}м`
  } else {
    return `${hours}ч`
  }
}

export default minToHours;