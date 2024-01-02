
import type { PageRouter } from '../../src/classes/page-router.class';
import { NavbarTree } from './classes/navbar-tree.class';

export function setNavbar(pages: PageRouter[], lastPath?: string): NavbarTree[] {
	return pages.map((page) => {
		if (page.pages && page.pages.length > 0) {
			return new NavbarTree(
				page.name,
				page.path,
				lastPath ? `../${lastPath}/${page.path}` : `../${page.path}`,
				page.icon,
				setNavbar(page.pages, lastPath ? `${lastPath}/${page.path}` : page.path)
			);
		} else {
			return new NavbarTree(
				page.name,
				page.path,
				lastPath ? `../${lastPath}/${page.path}` : `../${page.path}`,
				page.icon
			);
		}
	});
}
