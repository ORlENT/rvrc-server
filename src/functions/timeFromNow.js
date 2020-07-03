export default function timeFromNow(timestamp) {
  const diff = timestamp.toDate() - Date.now();

  //overdue
  if (diff <= 0) return "OVERDUE";

  const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 365);
  if (years) {
    return years + " year" + (years === 1 ? "" : "s");
  }

  const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30);
  if (months) {
    return months + " month" + (months === 1 ? "" : "s");
  }

  const weeks = Math.floor(diff / 1000 / 60 / 60 / 24 / 7);
  if (weeks) {
    return weeks + " week" + (weeks === 1 ? "" : "s");
  }

  const days = Math.floor(diff / 1000 / 60 / 60 / 24);
  if (days) {
    return days + " day" + (days === 1 ? "" : "s");
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  if (hours) {
    return hours + " hour" + (hours === 1 ? "" : "s");
  }

  const mins = Math.floor(diff / 1000 / 60);
  if (mins) {
    return mins + " minute" + (mins === 1 ? "" : "s");
  }

  const secs = Math.floor(diff / 1000);
  if (secs) {
    return secs + " second" + (secs === 1 ? "" : "s");
  }

  //invalid
  return "INVALID";
}
