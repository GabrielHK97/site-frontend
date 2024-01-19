import { PageRouter } from "../../classes/page-router.class";
import { BreadcrumbElement } from "./classes/breadcrumb.class";

function setupBreadcrumb(
	pages: PageRouter[],
	breadcrumb: BreadcrumbElement[],
	lastPath?: string
): void {
	pages.forEach((page) => {
		breadcrumb.push(
			new BreadcrumbElement(
				page.name,
				page.path,
				lastPath ? `../${lastPath}/${page.path}` : `../${page.path}`
			)
		);
		if (page.pages && page.pages.length > 0) {
			setupBreadcrumb(page.pages, breadcrumb, lastPath ? `${lastPath}/${page.path}` : page.path);
		}
	});
}

export function setBreadcrumb(page: PageRouter[]): BreadcrumbElement[]{
	const breadcrumb: BreadcrumbElement[] = [];
	setupBreadcrumb(page, breadcrumb);
	return breadcrumb;
}


