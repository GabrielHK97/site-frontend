import type { ValidatingFunction } from '../../../../shared/interfaces/validating-function.interface';
import { InputTypes } from '../constants/input-types.constants';

export class Input {
	type: InputTypes = InputTypes.TEXT;
	label: string = '';
	value: any = '';
	placeholder: string = '';
	valid: boolean = false;
	readonly: boolean = false;
	mask: string = '';
	required: boolean = true;
	firstTime: boolean = true;
	maskedValue: any = '';
	validatingFunction: ValidatingFunction = () => {
		return true;
	};
}
