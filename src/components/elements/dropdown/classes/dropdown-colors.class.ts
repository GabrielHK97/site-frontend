export class DropdownColors {
	button: string;
	background: string;
	label: string;
	hover: string;
	border: string;
	scrollbarTrack: string;
	scrollbarThumb: string;

	constructor(
		button: string,
		label: string,
		background: string,
		hover: string,
		border: string,
		scrollbarTrack: string,
		scrollbarThumb: string
	) {
		this.button = button;
		this.label = label;
		this.background = background;
		this.hover = hover;
		this.border = border;
		this.scrollbarTrack = scrollbarTrack;
		this.scrollbarThumb = scrollbarThumb;
	}
}
