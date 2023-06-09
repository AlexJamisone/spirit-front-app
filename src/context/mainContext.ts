import { createContext, useContext, type Dispatch } from 'react';
import type { Action, ControlState } from '~/recducer/controlReducer';

export interface MainContext {
	state: ControlState;
	dispatch: Dispatch<Action>;
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
