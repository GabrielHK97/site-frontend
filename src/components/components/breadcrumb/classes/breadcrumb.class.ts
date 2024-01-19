export class BreadcrumbElement {
    name: string;
	path: string;
	fullPath: string;

	constructor(name: string, path: string, fullPath: string) {
		this.name = name;
        this.path = path;
		this.fullPath = fullPath;
	}
}
