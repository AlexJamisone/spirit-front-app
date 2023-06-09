export type ControlState = {
	cat: boolean;
	subcat: boolean;
	catId: string;
	subcatId: string;
	product: {
		id: string;
		quantity: number;
	}[];
};
