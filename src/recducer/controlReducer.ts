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

export type ControlState = {
	cat: boolean;
	subcat: boolean;
	isProductSub: boolean;
	isProductCat: boolean;
	catId: string;
	subcatId: string;
	products: Product;
	sizeControl: {
		productId: string;
		selectSize: boolean;
	};
	isCheckout: boolean;
	check: boolean;
	email: string;
	success: boolean;
};

interface SetCatIdAction {
	type: 'SET_CAT_ID';
	payload: string;
}
interface SetSubCatIdAction {
	type: 'SET_SUBCAT_ID';
	payload: string;
}
interface SetSubCatAction {
	type: 'SET_SUB_CAT';
	payload: boolean;
}
interface SetCatAction {
	type: 'SET_CAT';
	payload: boolean;
}
interface SetProductAction {
	type: 'SET_PRODUCT_ADD';
	payload: {
		id: string;
		quantity: number;
		qtId: string;
		size: string;
		price: number;
		name: string;
	};
}
interface SetProductUpdateAction {
	type: 'SET_PRODUCT_UPDATE';
	payload: {
		id: string;
		quantity: number;
		qtId: string;
		size: string;
		price: number;
		name: string;
	};
}
interface SetRemoveProductOneAction {
	type: 'REMOVE_PRODUCT_ONE';
	payload: { id: string; qtId: string };
}
interface SetRemoveProductAllAction {
	type: 'REMOVE_PRODUCT_ALL';
	payload: { id: string };
}
interface SetAllAction {
	type: 'SET_ALL';
	payload: ControlState;
}
interface SetIsProductSubAction {
	type: 'SET_IS_PROD_SUB';
	payload: boolean;
}
interface SetIsProductCatAction {
	type: 'SET_IS_PROD_CAT';
	payload: boolean;
}
interface SetSelectSizeAction {
	type: 'SET_SELECT_SIZE';
	payload: {
		productId: string;
		selectSize: boolean;
	};
}
interface SetChekoutAction {
	type: 'SET_IS_CHECK';
	payload: boolean;
}
interface SetCheckAction {
	type: 'SET_CHECK';
	payload: boolean;
}
interface SetEmailAction {
	type: 'SET_EMAIL';
	payload: string;
}
interface SetSuccsessAction {
	type: 'SET_SUCCSESS';
	payload: boolean;
}
interface SetClearAction {
	type: 'SET_CLEAR';
}

export type Action =
	| SetCatAction
	| SetCatIdAction
	| SetSubCatAction
	| SetSubCatIdAction
	| SetProductAction
	| SetRemoveProductOneAction
	| SetProductUpdateAction
	| SetAllAction
	| SetIsProductSubAction
	| SetIsProductCatAction
	| SetSelectSizeAction
	| SetChekoutAction
	| SetCheckAction
	| SetEmailAction
	| SetRemoveProductAllAction
	| SetSuccsessAction
	| SetClearAction;

const local_key = 'interface';

const getItemsFromLocalStorage = (): ControlState | null => {
	if (typeof window !== 'undefined' && window.localStorage) {
		const itemJSON = window.localStorage.getItem(local_key);
		if (itemJSON) {
			return JSON.parse(itemJSON) as ControlState;
		}
	}
	return null;
};
const saveItemsToLocalStorage = (item: ControlState) => {
	if (typeof window !== 'undefined' && window.localStorage) {
		window.localStorage.setItem(local_key, JSON.stringify(item));
	}
};

export const initial: ControlState = getItemsFromLocalStorage() || {
	cat: true,
	subcat: false,
	isProductSub: false,
	isProductCat: false,
	catId: '',
	subcatId: '',
	products: {
		items: [],
		totalSum: 0,
	},
	sizeControl: {
		productId: '',
		selectSize: false,
	},
	isCheckout: false,
	check: false,
	email: '',
	success: false,
};

export const controlsReducer = (
	state: ControlState,
	action: Action
): ControlState => {
	switch (action.type) {
		case 'SET_CAT': {
			const newState = { ...state, cat: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_SUB_CAT': {
			const newState = { ...state, subcat: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_CAT_ID': {
			const newState = { ...state, catId: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_SUBCAT_ID': {
			const newState = { ...state, subcatId: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_PRODUCT_ADD': {
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
		case 'REMOVE_PRODUCT_ONE': {
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
		case 'REMOVE_PRODUCT_ALL': {
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
		case 'SET_PRODUCT_UPDATE': {
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
		case 'SET_ALL': {
			const newState = {
				...state,
				...action.payload,
			};
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_IS_PROD_SUB': {
			const newState = { ...state, isProductSub: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_IS_PROD_CAT': {
			const newState = { ...state, isProductCat: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_SELECT_SIZE': {
			const newState = {
				...state,
				sizeControl: {
					productId: action.payload.productId,
					selectSize: action.payload.selectSize,
				},
			};
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_IS_CHECK': {
			const newState = { ...state, isCheckout: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_CHECK': {
			const newState = { ...state, check: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_EMAIL': {
			const newState = { ...state, email: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_SUCCSESS': {
			const newState = { ...state, success: action.payload };
			saveItemsToLocalStorage(newState);
			return newState;
		}
		case 'SET_CLEAR': {
			const newState = {
				cat: true,
				catId: '',
				check: false,
				email: '',
				isCheckout: false,
				isProductCat: false,
				isProductSub: false,
				products: {
					items: [],
					totalSum: 0,
				},
				sizeControl: {
					productId: '',
					selectSize: false,
				},
				subcat: false,
				subcatId: '',
				success: false,
			};
			saveItemsToLocalStorage(newState);
			return newState;
		}
		default:
			return state;
	}
};
