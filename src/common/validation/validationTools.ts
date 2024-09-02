import { StringResource } from '@/src/localization/translations'
import { validateSync, ValidationError } from 'class-validator'

/**
 * Builds a record of required fields for a class.
 *
 * @template T - The type of the class.
 * @param {new () => T} cls - The class constructor
 */
export function buildRequiredFields<T>(cls: new () => T): Record<keyof T, boolean> {
  const instance = new cls() as object
  const validationErrors: ValidationError[] = validateSync(instance, {
    skipMissingProperties: true
  })

  const requiredFieldsMap: Record<keyof T, boolean> = {} as Record<keyof T, boolean>
  validationErrors
    .filter((error) => error.constraints && error.constraints.isNotEmpty)
    .forEach((error) => {
      requiredFieldsMap[error.property as keyof T] = true
    })

  return requiredFieldsMap
}

/**
 * Validates a partial object against a class definition and returns a record of validation errors.
 *
 * @template T - The type of the class.
 * @param {new () => T} cls - The class constructor.
 * @param {Partial<T>} partial - The partial object to validate.
 * @returns {Record<string, StringResource | undefined>} - A record of validation errors, where the keys are the property names and the values are the corresponding error messages.
 */
export function validatePartial<T>(
  cls: new () => T,
  partial: Partial<T>
): Record<string, StringResource | undefined> {
  const instance = Object.assign(new cls() as object, partial)
  const validationErrors: ValidationError[] = validateSync(instance, {
    skipMissingProperties: true
  })

  const errors: Record<string, StringResource | undefined> = {}
  Object.keys(partial).forEach((key) => {
    errors[key] = undefined
  })
  validationErrors.forEach(({ property, constraints }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (partial.hasOwnProperty(property)) {
      if (errors[property] === undefined) {
        //TODO: Add more validations and errors tests
        if (constraints?.matches) {
          errors[property] = 'invalid'
        } else {
          errors[property] = 'required'
        }
      }
    }
  })

  return errors
}

/**
 * Checks if there are any errors in the given errors object.
 * @param errors - The errors object to check.
 * @returns A boolean indicating whether there are any errors.
 */
export function hasErrors(errors: Record<string, StringResource | undefined>): boolean {
  if (Object.keys(errors).length === 0) {
    return false
  }
  return Object.values(errors).some((value) => value !== undefined)
}
