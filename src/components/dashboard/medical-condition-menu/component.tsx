import React, { FC, Fragment, KeyboardEvent, useEffect, useState } from 'react';
import { array } from 'fp-ts';
import { pipe } from 'fp-ts/lib/pipeable';
import { Checkbox, debounce, Input, Typography } from '@material-ui/core';
import { constFalse, constTrue } from 'fp-ts/lib/function';
import { Effect } from '../../../utils/functions';
import { MedicalCondition, MEDICAL_CONDITION_LIST } from '../../../models/medical-condition';
import styles from './styles.module.css';

type VisibilityStateItem = {
	visibility: boolean;
	setVisibility: Effect<boolean>;
};

type MedicalConditionMenuProps = {
	onChange: Effect<MedicalCondition[]>;
};

const testConditions = MEDICAL_CONDITION_LIST;
const conditionIDList = Object.keys(testConditions);
const conditionList: MedicalCondition[] = conditionIDList.map((id) => testConditions[id]);

export const MedicalConditionMenu: FC<MedicalConditionMenuProps> = ({ onChange }) => {
	const conditions = conditionList;
	const checkFlags = conditions.map(constFalse);
	const visibleFlags = conditions.map(constTrue);
	const [query, setQuery] = useState<string>('');
	const [checkConditions, setCheckConditions] = useState<boolean[]>(checkFlags);
	const visibilityConditions: VisibilityStateItem[] = [];
	visibleFlags.forEach((flag) => {
		const [visibility, setVisibility] = useState<boolean>(flag);
		visibilityConditions.push({
			visibility,
			setVisibility,
		});
	});

	const onQueryChange = () => {
		conditions.forEach(({ id, description }, idx) => {
			const currentValue = visibilityConditions[idx].visibility;
			const setValue = visibilityConditions[idx].setVisibility;

			if (query) {
				const isMatch =
					description.toLocaleLowerCase().search(query.toLocaleLowerCase()) !== -1 ||
					id.toLocaleLowerCase().search(query.toLocaleLowerCase()) !== -1;

				if (isMatch && !currentValue) {
					setValue(true);
				}
				if (!isMatch && currentValue) {
					setValue(false);
				}
			} else {
				if (!currentValue) {
					setValue(true);
				}
			}
		});
	};

	useEffect(onQueryChange, [query]);

	const handleCheckChange = (idx: number) => () => {
		const newCheckConditions = checkFlags.map((_, idxx) =>
			idxx === idx ? !checkConditions[idxx] : checkConditions[idxx],
		);
		const filteredConditions = conditions.filter((_, idx) => newCheckConditions[idx]).map((v) => v);

		onChange(filteredConditions);
		setCheckConditions(newCheckConditions);
	};

	const onSearch = (event: KeyboardEvent<HTMLInputElement>) => {
		debounce(setQuery, 500)(event.currentTarget.value);
	};

	const content = (
		<Fragment>
			{pipe(
				conditions,
				array.mapWithIndex((idx, { id, description }) => {
					const isVisible = visibilityConditions[idx].visibility;

					return isVisible ? (
						<label key={id} className={styles.conditionItem}>
							<Checkbox
								checked={Boolean(checkConditions && checkConditions[idx])}
								onChange={handleCheckChange(idx)}
							/>
							<Typography className={styles.conditionItemLabel}>{description}</Typography>
						</label>
					) : null;
				}),
			)}
		</Fragment>
	);

	return (
		<div className={styles.container}>
			<Typography>Select Condition:</Typography>
			<Input className={styles.searchInput} type={'text'} placeholder={'Start Typing...'} onKeyUp={onSearch} />
			<div className={styles.wrapperList}>{content}</div>
		</div>
	);
};
