import { Page } from "../../../src/classes/page.class";
import type { FullPath } from "../../../src/interfaces/full-path.interface";

export class BreadcrumbElement extends Page implements FullPath {
	fullPath: string;

	constructor(name: string, path: string, fullPath: string) {
		super(name, path);
		this.fullPath = fullPath;
	}
}
