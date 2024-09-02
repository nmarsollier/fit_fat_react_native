import { stringToDateTime } from '@/src/common/libs/DateLibs'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: false })
class IsDateLowerThanCurrentDateConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(date: string, args: ValidationArguments) {
    const selectedDate = stringToDateTime(date)
    const currentDate = new Date()
    return selectedDate < currentDate
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'invalid'
  }
}

export function IsDateLowerThanCurrentDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateLowerThanCurrentDateConstraint
    })
  }
}
