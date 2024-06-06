const isSameDay = (date1, date2) => {
  const givenDate = new Date(date1);
  const currentDate = new Date(date2);

  return (
    givenDate.getUTCFullYear() === currentDate.getUTCFullYear() &&
    givenDate.getUTCMonth() === currentDate.getUTCMonth() &&
    givenDate.getUTCDate() === currentDate.getUTCDate()
  );
};

const isJobExpired = (expiryDate) => {
  const givenDate = new Date(expiryDate);
  const currentDate = new Date();

  // Normalize both dates to midnight to compare only the date parts
  givenDate.setUTCHours(0, 0, 0, 0);
  currentDate.setUTCHours(0, 0, 0, 0);

  return givenDate < currentDate;
};

module.exports = {
  isSameDay,
  isJobExpired
};
