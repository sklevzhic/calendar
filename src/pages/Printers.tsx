import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";

import {AllTechnics} from "../components/AllTechnics";
import {Refills} from '../components/Refills';


interface PrintersProps {

}

// let obj = [
//     {key: "userId", name: "ФИО"},
//     {key: "name", name: "Наименование"},
//     {key: "invent", name: "Интвентарный номер"},
//     {key: "zavod", name: "Заводской номер"},
//     {key: "matfyo", name: "МОЛ"},
//     {key: "build", name: "Корпус"},
//     {key: "room", name: "Кабинет"},
//     {key: "print", name: "Наклейка"},
// ]
//
// let builds = [
//     {name: "1", address: "Советская"},
//     {name: "9", address: "Голубева"},
//     {name: "5", address: "Могилевская"},
// ]



export const Printers: React.FC<PrintersProps> = () => {
    const dispatch = useDispatch()
    const [isVisibleRefills, setVisibleRefills] = useState(true)


    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchPrinters())
    }, [])


    return <div style={{padding: '0 50px'}}>


        {
            isVisibleRefills
                ? <AllTechnics />
                : <Refills />
        }

    </div>
}