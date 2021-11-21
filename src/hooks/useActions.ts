import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {allActionCreators} from "../store/reducers/action-creators";
import {AppDispatch} from "../store";


export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActionCreators, dispatch)
}