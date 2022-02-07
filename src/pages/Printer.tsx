import {Button} from "antd"
import {useHistory, useParams} from "react-router-dom";
import {useEffect} from "react";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";

interface PrinterProps {

}

export const Printer: React.FC<PrinterProps> = () => {
    const history = useHistory()
    let { id } = useParams<{id: string}>()
    const { modelInfo, isFetchingModelInfo } = useTypedSelector(state => state.technicReducer)
    console.log(modelInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchModelInfo(id))
    }, [])
    return <div>
        <Button onClick={() => history.goBack()}> Back </Button>

        {
            (Object.keys(modelInfo).length !== 0) ?
                <div>
                    <div>{modelInfo.type}</div>
                    <div>{modelInfo.name}</div>
                    <div>{modelInfo.invent}</div>
                    <div>{modelInfo.year}</div>
                </div>
                : "Загрузка"
        }
    </div>
}