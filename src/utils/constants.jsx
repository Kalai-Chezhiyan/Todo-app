export const formatTimestampForInput = (timestamp) => {
  if (!timestamp) return "";

  const dateObj = new Date(Number(timestamp));
  if (isNaN(dateObj.getTime())) return "";

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = dateObj.getFullYear();

  return `${year}-${month}-${day}`; // Must use hyphens and YYYY-MM-DD layout
};
