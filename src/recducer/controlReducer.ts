export type ControlState = {
	control: {
		cat: boolean;
		subcat: boolean;
		isProductSub: boolean;
		isProductCat: boolean;
		sizeControl: {
			productId: string;
			selectSize: boolean;
		};
		isCheckout: boolean;
		checkNeed: boolean;
		success: boolean;
		checks: boolean;
	};
	catId: string;
	subcatId: string;
	email: string;
};

interface SetCatIdAction {
	type: 'SET_CATID';
	payload: string;
}
interface SetSubCatIdAction {
	type: 'SET_SUBCATID';
	payload: string;
}
interface SetEmailAction {
	type: 'SET_EMAIL';
	payload: string;
}

interface SetControls {
	type: 'SET_CTRL';
	payload: {
		cat: boolean;
		subcat: boolean;
		isProductSub: boolean;
		isProductCat: boolean;
		sizeControl: {
			productId: string;
			selectSize: boolean;
		};
		isCheckout: boolean;
		checkNeed: boolean;
		success: boolean;
		checks: boolean;
	};
}

interface SetAllAction {
	type: 'SET_ALL';
	payload: ControlState;
}

interface SetInitial {
	type: 'INITIAL';
}

export type Action =
	| SetCatIdAction
	| SetControls
	| SetEmailAction
	| SetSubCatIdAction
	| SetAllAction
	| SetInitial;

export const initial: ControlState = {
	control: {
		cat: true,
		checkNeed: false,
		isCheckout: false,
		isProductCat: false,
		isProductSub: false,
		sizeControl: {
			productId: '',
			selectSize: false,
		},
		subcat: false,
		success: false,
		checks: false,
	},
	catId: '',
	email: '',
	subcatId: '',
};

export const controlsReducer = (
	state: ControlState,
	action: Action
): ControlState => {
	switch (action.type) {
		case 'SET_CTRL':
			return { ...state, control: { ...action.payload } };
		case 'SET_CATID':
			return { ...state, catId: action.payload };
		case 'SET_EMAIL':
			return { ...state, email: action.payload };
		case 'SET_SUBCATID':
			return { ...state, subcatId: action.payload };
		case 'SET_ALL':
			return {
				...state,
				...action.payload,
			};
		case 'INITIAL':
			return initial;
		default:
			return state;
	}
};
