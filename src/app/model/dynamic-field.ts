import {InputType} from '../enum/input-type.enum';

export class DynamicField {
  field: string;
  label: string;
  value: string;
  inputType: InputType;
  options: string[];
  validators: string[];

  constructor(
    field: string,
    inputType: InputType,
    label: string,
    value = '',
    options: string[] = [],
    validators: string[] = []
    ) {
    this.field = field;
    this.inputType = inputType;
    this.label = label;
    this.value = value;
    this.options = options;
    this.validators = validators;
  }

  static create(field: string,
                inputType: InputType,
                label: string,
                value = '',
                options: string[] = [],
                validators: string[] = []): DynamicField{
    return {
      field, inputType, label, value, options, validators
    };
  }
}
