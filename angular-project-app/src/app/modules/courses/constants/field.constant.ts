export enum Fields {
  ComputerScience = 1,
  Matemathics = 2,
  Engineering = 3,
  Biology = 4,
  Physics = 5,
  Literature = 6,
  Music = 7,
}

export const FIELDS_KEYS: { [key in Fields]: string } = {
  [Fields.ComputerScience]: 'Computer Science',
  [Fields.Matemathics]: 'Matemathics',
  [Fields.Engineering]: 'Engineering',
  [Fields.Biology]: 'Biology',
  [Fields.Physics]: 'Physics',
  [Fields.Literature]: 'Literature',
  [Fields.Music]: 'Music',
};

export const FIELDS = Object.entries(FIELDS_KEYS).map((value) => {
  return {
    id: Number(value[0]),
    field: value[1],
  };
});
