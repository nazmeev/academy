import {DynamicField} from '../model/dynamic-field';
import {InputType} from '../enum/input-type.enum';

const rq = 'REQUIRED';

export const availableFields: DynamicField[] = [
   DynamicField.create('firstName', InputType.INPUT, 'firstName', '', [], [rq]),
   DynamicField.create('lastName', InputType.INPUT, 'Last Name', '', [], [rq]),
   DynamicField.create('email', InputType.INPUT, 'Email', '', [], [rq]),
   DynamicField.create('companyName', InputType.INPUT, 'Company Name', '', [], [rq]),
   DynamicField.create('companySize', InputType.NUMBER_INPUT, 'Company Size'),
   DynamicField.create('website', InputType.INPUT, 'Website', '', [], ['URL']),
   DynamicField.create('status', InputType.SELECT, 'Status', '', ['new', 'In progress', 'lost opportunity', 'contact later', 'active client', 'past client', 'not interested'], []),
   DynamicField.create('country', InputType.INPUT, 'Country'),
   DynamicField.create('industry', InputType.INPUT, 'Industry'),
   DynamicField.create('note', InputType.TEXTAREA, 'Note'),
   DynamicField.create('date', InputType.DATE, 'Date'),
];

export const findFieldIndex = (list: DynamicField[], field) => list.findIndex(item => item.field === field.field);

export const isFieldInList = (list: DynamicField[], field) => findFieldIndex(list, field) !== -1;
