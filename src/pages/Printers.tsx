import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux";
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";

import {AllTechnics} from "../components/AllTechnics";
import {Refills} from '../components/Refills';


interface PrintersProps {

}

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