//import type { IconDefinition } from '@fortawesome/free-solid-svg-icons/';
import { Page } from "../../../src/classes/page.class";
import type { FullPath } from "../../../src/interfaces/full-path.interface";
import type { Icon } from "../../../src/interfaces/icon.interface";

export class NavbarTree extends Page implements FullPath, Icon {
	fullPath: string;
	icon: any;//IconDefinition;
	expanded: boolean = false;
	elements: NavbarTree[];

	constructor(name: string, path: string, fullPath: string, icon: any, elements?: NavbarTree[]) {
		super(name, path);
		this.fullPath = fullPath;
		this.icon = icon;
		this.elements = elements ?? [];
	}

	setExpanded(expanded: boolean): void {
		this.expanded = expanded;
	}
}
