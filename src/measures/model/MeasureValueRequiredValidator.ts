import { MeasuresData } from '@/src/measures/model/MeassuresModel'
import {
  Abdominal,
  Bicep,
  BodyFat,
  BodyWeight,
  Calf,
  Chest,
  LowerBack,
  Midaxilarity,
  Subscapular,
  Suprailiac,
  Thigh,
  Triceps
} from '@/src/measures/model/MeasureValues'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'

@ValidatorConstraint({ async: false })
class IsRequiredFieldConstraint implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(object: any, args: ValidationArguments) {
    const isRequired = methodForField(args.property)?.requiredFor.includes(
      (args.object as MeasuresData).measureMethod
    )
    if (!isRequired) return true

    return object > 0
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'required'
  }
}

export function IsValueRequired(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRequiredFieldConstraint
    })
  }
}

function methodForField(fieldName: string) {
  switch (fieldName) {
    case 'chest':
      return Chest
    case 'abdominal':
      return Abdominal
    case 'thigh':
      return Thigh
    case 'triceps':
      return Triceps
    case 'subscapular':
      return Subscapular
    case 'suprailiac':
      return Suprailiac
    case 'midaxillary':
      return Midaxilarity
    case 'bicep':
      return Bicep
    case 'lowerBack':
      return LowerBack
    case 'calf':
      return Calf
    case 'fatPercent':
      return BodyFat
    case 'bodyWeight':
      return BodyWeight
    default: {
      console.log('Cant find method for field: ' + fieldName)
      return undefined
    }
  }
}
