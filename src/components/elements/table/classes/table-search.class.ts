export class Search {
	order: Order[] = [];
	where: any = [];
}

export class Where {
	field: string;
	operation: any;
	value: any;

	constructor(field: string, value: any) {
		this.field = field;
		this.value = value;
	}
}

export class Order {
	field: string;
	sortOrder: any;

	constructor(field: string, sortOrder: any) {
		this.field = field;
		this.sortOrder = sortOrder;
	}
}