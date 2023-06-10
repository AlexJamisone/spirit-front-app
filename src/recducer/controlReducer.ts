export type ControlState = {
	cat: boolean;
	subcat: boolean;
	isProductSub: boolean;
	isProductCat: boolean;
	catId: string;
	subcatId: string;
	products: {
		id: string;
		quantity: number;
		sizeId: string;
		size: string;
	}[];
	selectSize: boolean;
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
		sizeId: string;
		size: string;
	};
}
interface SetProductUpdateAction {
	type: 'SET_PRODUCT_UPDATE';
	payload: {
		id: string;
		quantity: number;
		sizeId: string;
		size: string;
	};
}
interface SetRemoveProductAction {
	type: 'REMOVE_PRODUCT';
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
	payload: boolean;
}

export type Action =
	| SetCatAction
	| SetCatIdAction
	| SetSubCatAction
	| SetSubCatIdAction
	| SetProductAction
	| SetRemoveProductAction
	| SetProductUpdateAction
	| SetAllAction
	| SetIsProductSubAction
	| SetIsProductCatAction
	| SetSelectSizeAction;

export const initial: ControlState = {
	cat: true,
	subcat: false,
	isProductSub: false,
	isProductCat: false,
	catId: '',
	subcatId: '',
	products: [],
	selectSize: false,
};

export const controlsReducer = (
	state: ControlState,
	action: Action
): ControlState => {
	switch (action.type) {
		case 'SET_CAT':
			return { ...state, cat: action.payload };
		case 'SET_SUB_CAT':
			return { ...state, subcat: action.payload };
		case 'SET_CAT_ID':
			return { ...state, catId: action.payload };
		case 'SET_SUBCAT_ID':
			return { ...state, subcatId: action.payload };
		case 'SET_PRODUCT_ADD': {
			const findProduct = state.products.find(
				({ id, sizeId }) =>
					id === action.payload.id && sizeId === action.payload.sizeId
			);
			if (!findProduct) {
				const newProduct = {
					id: action.payload.id,
					quantity: 1,
					sizeId: action.payload.sizeId,
					size: action.payload.size,
				};
				return {
					...state,
					products: [...state.products, newProduct],
				};
			} else {
				const product = {
					id: findProduct.id,
					quantity: findProduct.quantity + 1,
					sizeId: findProduct.sizeId,
					size: findProduct.size,
				};
				return {
					...state,
					products: [product],
				};
			}
		}
		case 'REMOVE_PRODUCT': {
			const findProduct = state.products.find(
				({ id }) => id === action.payload.id
			);
			if (!findProduct) {
				return state;
			} else {
				const updateProduct = state.products.filter(
					({ id }) => id !== action.payload.id
				);
				return {
					...state,
					products: updateProduct,
				};
			}
		}
		case 'SET_PRODUCT_UPDATE': {
			const findProduct = state.products.find(
				({ id, sizeId }) =>
					id === action.payload.id && sizeId === action.payload.sizeId
			);
			if (!findProduct && action.payload.quantity < 1) {
				return state;
			} else {
				return {
					...state,
					products: [
						...state.products,
						{
							id: findProduct?.id as string,
							quantity: action.payload.quantity,
							sizeId: action.payload.sizeId,
							size: action.payload.size,
						},
					],
				};
			}
		}
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'SET_IS_PROD_SUB':
			return { ...state, isProductSub: action.payload };
		case 'SET_IS_PROD_CAT':
			return { ...state, isProductCat: action.payload };
		case 'SET_SELECT_SIZE':
			return { ...state, selectSize: action.payload };
		default:
			return state;
	}
};
