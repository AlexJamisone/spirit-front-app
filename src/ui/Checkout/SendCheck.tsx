import { FormControl, FormLabel, Input, Stack, Switch } from '@chakra-ui/react';
import { useMainContext } from '~/context/mainContext';

const SendCheck = () => {
	const { controls, dispatchCtrl } = useMainContext();
	const { control } = controls;
	return (
		<>
			<FormControl
				as={Stack}
				direction="row"
				alignItems="center"
				justifyContent="space-between"
			>
				<FormLabel htmlFor="check">Нужен чек?</FormLabel>
				<Switch
					id="check"
					onChange={(e) =>
						dispatchCtrl({
							type: 'SET_CTRL',
							payload: {
								...control,
								checkNeed: e.target.checked,
							},
						})
					}
					isChecked={control.checkNeed}
				/>
			</FormControl>
			{control.checkNeed && (
				<FormControl>
					<FormLabel>На какой email отправить?</FormLabel>
					<Input
						type="email"
						onChange={(e) =>
							dispatchCtrl({
								type: 'SET_EMAIL',
								payload: e.target.value,
							})
						}
						value={controls.email}
					/>
				</FormControl>
			)}
		</>
	);
};

export default SendCheck;
