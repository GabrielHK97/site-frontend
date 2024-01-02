export class Pagination {
	page: number = 1;
	itemsPerPage: number = 15;
	optionsOfItemsPerPage: Array<number> = [10, 15, 20];

	getSkip(): number {
		return this.page > 0 ? (this.page - 1) * this.itemsPerPage : 0;
	}

	getTake(): number {
		return this.itemsPerPage;
	}

	getEntries(totalItems: number): string {
		return totalItems === 0
			? '0 - 0'
			: this.page * this.itemsPerPage < totalItems
			? `${(this.page - 1) * this.itemsPerPage + 1} - ${this.page * this.itemsPerPage}`
			: totalItems
			? `${(this.page - 1) * this.itemsPerPage + 1} - ${totalItems}`
			: '0 - 0';
	}

	getPages(totalItems: number): number {
		return totalItems ? Math.ceil(totalItems / this.itemsPerPage) : 0;
	}
}
