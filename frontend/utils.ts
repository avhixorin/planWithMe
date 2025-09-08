export const getWeekendDates = (date: Date) => {
    const dayOfWeek = date.getDay();
    const current = new Date(date);
  
    let saturday: Date;
    let sunday: Date;
  
    if (dayOfWeek === 6) {
      saturday = current;
      sunday = new Date(current);
      sunday.setDate(current.getDate() + 1);
    } else if (dayOfWeek === 0) {
      sunday = current;
      saturday = new Date(current);
      saturday.setDate(current.getDate() - 1);
    } else {
      saturday = new Date(current);
      saturday.setDate(current.getDate() + (6 - dayOfWeek));
      sunday = new Date(saturday);
      sunday.setDate(saturday.getDate() + 1);
    }
  
    const formatDate = (d: Date) =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
      }).format(d);
  
    return {
      saturday: formatDate(saturday),
      sunday: formatDate(sunday),
    };
  };
  