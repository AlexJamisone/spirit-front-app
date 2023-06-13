export type ProductItems = {
	id: string;
	quantity: number;
	qtId: string;
	size: string;
	price: number;
	name: string;
};

interface Product {
	items: ProductItems[];
	totalSum: number;
}

export type ItemState = {
	products: Product;
};

interface SetAddAction {
	type: 'SET_ADD';
	payload: {
		id: string;
		quantity: number;
		qtId: string;
		size: string;
		price: number;
		name: string;
	};
}
interface SetUpdateAction {
	type: 'SET_UPDATE';
	payload: {
		id: string;
		quantity: number;
		qtId: string;
		size: string;
		price: number;
		name: string;
	};
}
interface SetDeletOneAction {
	type: 'DELET_ONE';
	payload: { id: string; qtId: string };
}
interface SetDeletAllAction {
	type: 'DELET_ALL';
	payload: { id: string };
}

interface SetInitial {
	type: 'INITIAL';
}

export type Action =
	| SetAddAction
	| SetUpdateAction
	| SetDeletOneAction
	| SetDeletAllAction
	| SetInitial;

const local_key = 'check';

const getItemsFromLocalStorage = (): ItemState | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const itemJSON = window.localStorage.getItem(local_key);
		if (itemJSON) {
			return JSON.parse(itemJSON) as ItemState;
		}
	}
	return null;
};
const saveItemsToLocalStorage = (item: ItemState) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(local_key, JSON.stringify(item));
	}
};

export const initial: ItemState = getItemsFromLocalStorage() || {
	products: {
		items: [],
		totalSum: 0,
	},
};

export const itemReducer = (state: ItemState, action: Action): ItemState => {
	switch (action.type) {
		case 'SET_ADD': {
			const findProduct = state.products.items.find(
				({ id, qtId }) =>
					id === action.payload.id && qtId === action.payload.qtId
			);
			if (!findProduct) {
				const newProduct = {
					id: action.payload.id,
					quantity: 1,
					qtId: action.payload.qtId,
					size: action.payload.size,
					price: action.payload.price,
					name: action.payload.name,
				};
				const newState = {
					...state,
					products: {
						items: [...state.products.items, newProduct],
						totalSum:
							state.products.totalSum + action.payload.price,
					},
				};
				saveItemsToLocalStorage(newState);
				return newState;
			} else {
				const updatedItems = state.products.items.map((item) => {
					if (
						item.id === findProduct.id &&
						item.qtId === findProduct.qtId
					) {
						return {
							...item,
							quantity: item.quantity + 1,
						};
					}
					return item;
				});
				const newState = {
					...state,
					products: {
						items: updatedItems,
						totalSum:
							state.products.totalSum + action.payload.price,
					},
				};
				saveItemsToLocalStorage(newState);
				return newState;
			}
		}
		case 'SET_UPDATE': {
			const findProduct = state.products.items.find(
				({ id, qtId }) =>
					id === action.payload.id && qtId === action.payload.qtId
			);
			if (!findProduct && action.payload.quantity < 1) {
				return state;
			} else {
				const updatedItems = state.products.items.map((item) => {
					if (
						item.id === findProduct?.id &&
						item.qtId === findProduct.qtId
					) {
						return {
							...item,
							quantity: action.payload.quantity,
						};
					}
					return item;
				});
				const newState = {
					...state,
					products: {
						items: updatedItems,
						totalSum: updatedItems.reduce(
							(sum, item) => sum + item.quantity * item.price,
							0
						),
					},
				};
				saveItemsToLocalStorage(newState);
				return newState;
			}
		}
		case 'DELET_ONE': {
			const findProduct = state.products.items.find(
				({ id }) => id === action.payload.id
			);
			if (!findProduct) {
				return state;
			} else {
				const updatedItems = state.products.items.filter(
					({ id, qtId }) =>
						id !== action.payload.id || qtId !== action.payload.qtId
				);
				const newState = {
					...state,
					products: {
						items: updatedItems,
						totalSum: updatedItems.reduce(
							(sum, item) => sum + item.quantity * item.price,
							0
						),
					},
				};
				saveItemsToLocalStorage(newState);
				return newState;
			}
		}
		case 'DELET_ALL': {
			const findProduct = state.products.items.find(
				({ id }) => id === action.payload.id
			);
			if (!findProduct) {
				return state;
			} else {
				const updatedItems = state.products.items.filter(
					({ id }) => id !== action.payload.id
				);
				const newState = {
					...state,
					products: {
						items: updatedItems,
						totalSum: updatedItems.reduce(
							(sum, item) => sum + item.quantity * item.price,
							0
						),
					},
				};
				saveItemsToLocalStorage(newState);
				return newState;
			}
		}
		case 'INITIAL':
			return initial;
		default:
			return state;
	}
};
