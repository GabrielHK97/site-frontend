export class TableColors {
	body: string;
	background: string;
	header: string;
	row: string;
	selected: string;
	hover: string;
	border: string;
	scrollbarTrack: string;
	scrollbarThumb: string;

	constructor(
		body: string,
		background: string,
		header: string,
		row: string,
		selected: string,
		hover: string,
		border: string,
		scrollbarTrack: string,
		scrollbarThumb: string
	) {
		this.body = body;
		this.background = background;
		this.header = header;
		this.row = row;
		this.selected = selected;
		this.hover = hover;
		this.border = border;
		this.scrollbarTrack = scrollbarTrack;
		this.scrollbarThumb = scrollbarThumb;
	}
}
