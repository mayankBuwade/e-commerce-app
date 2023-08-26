export default (isoDateString) => {
  const dateObject = new Date(isoDateString);

  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1; // Adding 1 to get the correct month number
  const year = dateObject.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;
  return formattedDate;
};
