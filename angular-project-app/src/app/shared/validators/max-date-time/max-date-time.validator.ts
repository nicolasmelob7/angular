import { SchemaPath, validate } from '@angular/forms/signals';
import { isDate, isNull } from '../../common/common';

export function maxDateTime(
  field: SchemaPath<Date | null>,
  minDateTime: SchemaPath<Date | null>,
  options?: { message?: string },
): void;

export function maxDateTime(
  field: SchemaPath<Date | null>,
  minDateTime: Date | null,
  options?: { message?: string },
): void;

export function maxDateTime(
  field: SchemaPath<Date | null>,
  maxDateTime: SchemaPath<Date | null> | Date | null,
  options?: { message?: string },
) {
  validate(field, ({ value, valueOf }) => {
    const dateTimeField = value() as Date;
    const dateTimeMax = (
      isDate(maxDateTime) || isNull(maxDateTime)
        ? (maxDateTime as Date)
        : valueOf(maxDateTime as SchemaPath<Date | null>)
    ) as Date;
    if (dateTimeField > dateTimeMax)
      return {
        kind: 'max-date-time',
        message: options?.message || 'Field is required',
      };

    return undefined;
  });
}
