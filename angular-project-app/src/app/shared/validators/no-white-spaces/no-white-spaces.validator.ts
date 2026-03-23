import { SchemaPath, validate } from '@angular/forms/signals';

export function noWhiteSpaces(
  field: SchemaPath<string>,
  options?: { message?: string },
) {
  validate(field, ({ value }) => {
    if (value() != '' && value().trim() == '')
      return {
        kind: 'white-spaces',
        message: options?.message || 'Field is required',
      };

    return undefined;
  });
}
