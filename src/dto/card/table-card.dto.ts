import type { CardFormatDto } from './card-format.dto';
import type { CardSetDto } from './card-set.dto';
import type { CardColorDto } from './card-color.dto';
import type { CardTypeDto } from './card-type.dto';
import type { CardSubtypeDto } from './card-subtype.dto';
import type { CardRarityOfSetDto } from './card-rarity-of-set.dto';

export class TableCardDto {
	id: number;
	name: string;
	cost: number;
	attack: number;
	defense: number;
	colors: CardColorDto[];
	types: CardTypeDto[];
	subtypes: CardSubtypeDto[];
	description: string;
	rarities: CardRarityOfSetDto[];
	active: boolean;
	sets: CardSetDto[];
	formats: CardFormatDto[];
}
