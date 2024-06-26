const getCurrentDateFormatted = (): string => {
  const now = new Date();

  const month = now.getMonth() + 1; // Months are zero-based in JavaScript
  const day = now.getDate();
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const isPM = hours >= 12;
  hours = hours % 12 || 12; // Convert 24-hour format to 12-hour format, handling midnight as 12

  const formattedDate = `${month}/${day}/${year}, ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${isPM ? 'PM' : 'AM'}`;

  return formattedDate;
};

const formattedDate = getCurrentDateFormatted();

const CurrentDateComponent = () => {
  return (
    <div className="font-satoshi text-xs font-medium text-purple-600 ">
      <span>{formattedDate}</span>
    </div>
  );
};

export default CurrentDateComponent;
