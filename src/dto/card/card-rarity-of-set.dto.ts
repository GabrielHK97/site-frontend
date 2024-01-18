import type { CardRarityDto } from './card-rarity.dto';
import type { CardSetDto } from './card-set.dto';

export class CardRarityOfSetDto {
	rarity: CardRarityDto;
	set: CardSetDto;
}
