import { SchemaPath, validate } from '@angular/forms/signals';
import { isDate, isNull } from '../../common/common';

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
    const dateTimeField = new Date(value() ?? '');

    const dateTimeMin =
      isDate(minDateTime) || isNull(minDateTime)
        ? (minDateTime as Date)
        : new Date(valueOf(minDateTime as SchemaPath<Date | null>) ?? '');

    if (dateTimeField < dateTimeMin)
      return {
        kind: 'min-date-time',
        message: options?.message || 'Field is required',
      };

    return undefined;
  });
}
