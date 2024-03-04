import { Dropdown } from '../../components/components/dropdown/classes/dropdown.class';
import { Input } from '../../components/components/input/classes/input.class';

export class FormCardDto {
	name: Input;
	cost: Input;
	attack: Input;
	defense: Input;
	colors: Dropdown;
	types: Dropdown;
	subtypes: Dropdown;
	description: Input;
	rarities: Dropdown;
	sets: Dropdown;
	formats: Dropdown;

	constructor() {
		this.name = new Input('');
		this.cost = new Input('');
		this.attack = new Input('');
		this.defense = new Input('');
		this.colors = new Dropdown([]);
		this.types = new Dropdown([]);
		this.subtypes = new Dropdown([]);
		this.description = new Input('');
		this.rarities = new Dropdown([]);
		this.sets = new Dropdown([]);
		this.formats = new Dropdown([]);
	}
}
