export const formatPath = s => {
  var regex = /[åäöÅÄÖ&\s]/g;
  var translate = {
    å: 'a',
    ä: 'a',
    ö: 'o',
    Å: 'A',
    Ä: 'A',
    Ö: 'O',
    '&': '-',
    ' ': '',
  };
  return s
    .replace(regex, char => {
      return translate[char];
    })
    .toLowerCase();
};

export const timeConverter = timestamp => {
  const date = new Date(timestamp);
  return (
    date.toLocaleDateString() +
    ' ' +
    date.toLocaleTimeString().slice(0, -3)
  );
};

export const dateConverter = timestamp => {
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

export const toTimeFormat = time => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + time);
  let hours = date.getHours();
  hours = hours < 10 ? `0${hours}` : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
};

export const timeStringToMinutes = timeString => {
  const timeNow = new Date();
  const newTime = new Date();
  const timeSplit = timeString.split(':');
  newTime.setHours(timeSplit[0]);
  newTime.setMinutes(timeSplit[1]);
  newTime.setSeconds(0);
  timeNow.setSeconds(0);

  const diff = newTime.getTime() - timeNow.getTime();
  return diff / 60000;
};

export const timeStringToISO = timeString => {
  const date = new Date();
  const timeSplit = timeString.split(':');
  date.setHours(timeSplit[0]);
  date.setMinutes(timeSplit[1]);
  date.setSeconds(0);
  return date.toISOString();
};

export const sortByDate = (data, key) =>
  data
    .slice()
    .sort((a, b) => new Date(b[key]) - new Date(a[key]));

export const calcVatAmount = (total, vat) => {
  const vatCalc = vat / (vat + 100) + total;
  const vatAmount = (vatCalc - Math.floor(vatCalc)) * total;
  return +vatAmount.toFixed(2);
};
