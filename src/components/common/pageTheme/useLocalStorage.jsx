import { useState } from 'react';
export default function useLocalStorage(key, initialValue) {
	// state to store our value
	// pass initial state function to usestate so logic is only executed once
	const [ storedValue, setStoredValue ] = useState(() => {
		try {
			// get from local storage by key
			const item = window.localStorage.getItem(key);
			// parse stored json or if none return intialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			//if error also return initialValue
			console.log(error);
			return initialValue;
		}
	});
	const setValue = (value) => {
		try {
			// allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			//save state
			setStoredValue(valueToStore);
			//save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [ storedValue, setValue ];
}