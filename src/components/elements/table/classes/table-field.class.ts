import { SortConstants } from "../../../constants/table.constants";
import { VarTypes } from "../../../constants/var-types.constants";
import type { Mask } from "../../../interfaces/mask.interface";

export class TableField<T> {
	label: string;
	field: string;
	mask?: Mask<T>;
	hidden: boolean;
	sortOrder: SortConstants = SortConstants.UNSORTED;

	constructor(label: string, field: string, hidden: boolean);
	constructor(
		label: string,
		field: string,
		hidden: boolean,
		sortOrderOrMask: SortConstants | Mask<T>
	);
	constructor(
		label: string,
		field: string,
		hidden: boolean,
		sortOrderOrMask?: any,
		mask?: any
	) {
		this.label = label;
		this.field = field;
		if (typeof sortOrderOrMask === VarTypes.FUNCTION) {
			this.mask = sortOrderOrMask;
		} else if (typeof sortOrderOrMask === VarTypes.STRING) {
			this.sortOrder = sortOrderOrMask;
            this.mask = mask;
		}
		this.hidden = hidden;
	}
}
