//import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import type { FullPath } from '../interfaces/full-path.interface';
import type { Icon } from '../interfaces/icon.interface';
import { Page } from './page.class';

export class PageRouter extends Page implements FullPath, Icon {
	fullPath: string = '';
	icon: any;//IconDefinition;
	pages?: PageRouter[] = [];

	constructor(name: string, path: string, icon: any, pages?: PageRouter[]) {
		super(name, path);
		this.icon = icon;
		this.pages = pages;
	}
}
