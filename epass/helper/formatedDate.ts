export default function formatDate(timestampStr: string) {
  // Parse the timestamp string into a number
  const timestamp = parseInt(timestampStr, 10);

  // Create a new Date object using the timestamp
  const date = new Date(timestamp);

  // Extract date components
  const day = date.getDate().toString().padStart(2, "0");
  const monthNum = date.getMonth(); // Month is zero-based
  const monthWords = [
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
  const month = monthWords[monthNum];
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Convert 24-hour time to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM"; // Determine if it's AM or PM

  // Return formatted date string
  return `${day}-${month}-${year} , ${hours}:${minutes}:${seconds} ${ampm}`;
}
