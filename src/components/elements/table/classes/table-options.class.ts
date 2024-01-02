export class TableOptions {
	header: boolean;
	footer: boolean;
	selectable: boolean;
	actions: boolean;
	selectableClass: string;
	actionsClass: string;

	constructor(
		selectableClass: string,
		actionsClass: string,
        selectable?: boolean,
		actions?: boolean,
		header?: boolean,
		footer?: boolean,
	) {
		this.selectableClass = selectableClass;
		this.actionsClass = actionsClass;
        this.selectable = selectable ?? false;
        this.actions = actions ?? false;
		this.header = header ?? true;
		this.footer = footer ?? true;
	}
}
