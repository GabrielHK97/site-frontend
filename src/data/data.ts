import axios from 'axios';
import { DatabaseAxios } from '../axios/database-axios';
import type { CardSetDto } from '../dto/card/card-set.dto';
import type { CardFormatDto } from '../dto/card/card-format.dto';
import type { CardTypeDto } from '../dto/card/card-type.dto';
import type { CardSubtypeDto } from '../dto/card/card-subtype.dto';
import type { CardColorDto } from '../dto/card/card-color.dto';
import type { CardRarityDto } from '../dto/card/card-rarity.dto';
import type { TableCardDto } from '../dto/card/table-card.dto';
import type { TableFormatDto } from '../dto/format/table-format.dto';
import type { TableSetDto } from '../dto/set/table-set.dto';

export class Data {
	static async getCardSets(): Promise<CardSetDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/set', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getCardFormats(): Promise<CardFormatDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/format', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getCardTypes(): Promise<CardTypeDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/type', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getCardSubtypes(): Promise<CardSubtypeDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/subtype', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getCardColors(): Promise<CardColorDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/color', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getCardRarities(): Promise<CardRarityDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/rarity', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getTableCards(): Promise<TableCardDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/card', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getTableFormats(): Promise<TableFormatDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/format', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async getTableSets(): Promise<TableSetDto[]> {
		return await DatabaseAxios.getAxios()
			.get('/set', { withCredentials: true })
			.then((res) => {
				return res.data.data;
			});
	}

	static async deleteTableCard(id: number): Promise<void> {
		await DatabaseAxios.getAxios().delete(`/card/${id}`, { withCredentials: true });
	}

	static async deleteTableFormat(id: number): Promise<void> {
		await DatabaseAxios.getAxios().delete(`/format/${id}`, { withCredentials: true });
	}

	static async deleteTableSet(id: number): Promise<void> {
		await DatabaseAxios.getAxios().delete(`/set/${id}`, { withCredentials: true });
	}
}
