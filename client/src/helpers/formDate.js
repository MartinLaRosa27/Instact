module.exports.formatDate = (date) => {
  let d = new Date(date);
  const month = "" + d.getMonth();
  let day = "" + d.getDate();
  const year = d.getFullYear();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (day.length < 2) day = "0" + day;

  return `${monthNames[month]} ${day}, ${year}`;
};
