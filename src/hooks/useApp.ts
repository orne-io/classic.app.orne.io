import { useContext } from 'react';
import { OrneContext } from '../context/OrneProvider';

export function useApp() {
	return useContext(OrneContext);
}
