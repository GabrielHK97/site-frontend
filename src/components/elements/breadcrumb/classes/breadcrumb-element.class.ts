import type { FullPath } from '../interfaces/full-path.interface';
import { Page } from './page.class';

export class BreadcrumbElement extends Page implements FullPath {
	fullPath: string;

	constructor(name: string, path: string, fullPath: string) {
		super(name, path);
		this.fullPath = fullPath;
	}
}
