const proxy = 'http://cors-anywhere.herokuapp.com/';
const url = `https://www.metaweather.com/static/img/weather/`;

export const formatDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${year}/${month}/${day}`;
};

export const getWeatherState = (code: string) => {
  switch (code) {
    case 'sn':
      return `${url}sn.svg`;
    case 'sl':
      return `${url}sl.svg`;
    case 'h':
      return `${url}h.svg`;
    case 't':
      return `${url}t.svg`;
    case 'hr':
      return `${url}hr.svg`;
    case 'lr':
      return `${url}lr.svg`;
    case 's':
      return `${url}s.svg`;
    case 'hc':
      return `${url}hc.svg`;
    case 'lc':
      return `${url}lc.svg`;
    case 'c':
      return `${url}c.svg`;
    default:
      return `${url}sn.svg`;
  };
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const days = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat'
];

export const formatterDate = () => {
  const date = new Date();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  const dayIndex = date.getDay();
  const day = days[dayIndex];
  const dayNumber = date.getDate();

  return { day, dayNumber, month };
};

export const formatDay = (date: string) => {
  const d = new Date(date);
  const dayIndex = d.getDay();
  const day = days[dayIndex];

  return day;
};

