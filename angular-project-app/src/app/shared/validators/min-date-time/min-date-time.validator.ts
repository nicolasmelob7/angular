import { SchemaPath, validate } from '@angular/forms/signals';

export function minDateTime(
  field: SchemaPath<Date | null>,
  minDateTime: SchemaPath<Date | null>,
  options?: { message?: string },
): void;

export function minDateTime(
  field: SchemaPath<Date | null>,
  minDateTime: Date | null,
  options?: { message?: string },
): void;

export function minDateTime(
  field: SchemaPath<Date | null>,
  minDateTime: SchemaPath<Date | null> | Date | null,
  options?: { message?: string },
) {
  validate(field, ({ value, valueOf }) => {
    const dateTimeField = value() as Date;
    const dateTimeMin = (
      isDate(minDateTime) || isNull(minDateTime)
        ? (minDateTime as Date)
        : valueOf(minDateTime as SchemaPath<Date | null>)
    ) as Date;
    if (dateTimeField < dateTimeMin)
      return {
        kind: 'min-date-time',
        message: options?.message || 'Field is required',
      };

    return undefined;
  });
}

function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

function isNull(value: unknown): value is null {
  return value === null;
}
