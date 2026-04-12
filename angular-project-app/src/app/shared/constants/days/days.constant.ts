export enum Days {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export const DAYS_KEYS: { [key in Days]: string } = {
  [Days.Monday]: 'Monday',
  [Days.Tuesday]: 'Tuesday',
  [Days.Wednesday]: 'Wednesday',
  [Days.Thursday]: 'Thursday',
  [Days.Friday]: 'Friday',
  [Days.Saturday]: 'Saturday',
  [Days.Sunday]: 'Sunday',
};

export const DAYS = Object.entries(DAYS_KEYS).map((value) => {
  return {
    id: Number(value[0]),
    day: value[1],
  };
});
