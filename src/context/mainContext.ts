import { createContext, useContext, type Dispatch } from 'react';
import type { Action, ControlState } from '~/recducer/controlReducer';
import type { Action as ActionItems, ItemState } from '~/recducer/itemReducere';

export interface MainContext {
	controls: ControlState;
	dispatchCtrl: Dispatch<Action>;
	items: ItemState;
	dispatchItems: Dispatch<ActionItems>;
}

const MainContext = createContext<MainContext | null>(null);

export function useMainContext() {
	const context = useContext(MainContext);
	if (!context)
		throw new Error(
			'Main.* component must be render as a child of Main comopnent'
		);
	return context;
}

export default MainContext;
