export const toLocalDate = (date) => {
  const options = {        
    month: 'short',
    day: 'numeric',
  }
  return new Date(date).toLocaleString("ru", options)
}

export const parseDeliveryDateDetail = (date) => {
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("ru", {        
    month: 'short',
  });
  const weekday = new Date(date).toLocaleString("ru", {        
    weekday: 'long',
  });
  return `${day} ${month}, ${weekday}`
}

export const parseDeliveryDate = (date) => {
  const localeDay = [
    "в понедельник",
    "во вторник",
    "в среду",
    "в четверг",
    "в пятницу",
    "в субботу",
    "в воскресенье",
  ]
  const day = new Date(date).getDate();
  const month = new Date(date).toLocaleString("ru", {        
    month: 'short',
  }).split('.')[0];
  const weekday = localeDay[new Date(date).getDay()];
  return {
    day,
    month,
    weekday
  }

}

export const fixDay = (day) => {
  if(day % 10 === 1){
    return day + ' день'
  }else if(day % 10 > 1 && day % 10 < 5 && day !== 11 && day !== 12 && day !== 13 && day !== 14){
    return day + ' дня'
  }
  return day + ' дней'
}

export const filterDeliveries = (deliveries) => {
  if (deliveries) {
    const futureDelivery = deliveries.filter(
      (delivery) => {
        const deliveryDate = Date.parse(delivery.date);
        const currentDate = Date.parse(new Date());
        return deliveryDate > currentDate
      });
    return futureDelivery
  }
  return
}