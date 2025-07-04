import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/StoreProveder';

export const useAppDispatch = () => useDispatch<AppDispatch>();
