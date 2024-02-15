import {
    useDispatch,
    useSelector,
    type TypedUseSelectorHook
} from 'react-redux'
import { AppDispatch, RootState } from '@/app'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
