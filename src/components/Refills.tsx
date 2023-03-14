import React, {useEffect, useState} from 'react'
import {TechnicsActionCreators} from "../store/reducers/technics/action-creators";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
interface RefillsProps {

}

export const Refills: React.FC<RefillsProps> = () => {

    const {refills} = useTypedSelector(state => state.technicReducer)
    const dispatch = useDispatch()

    useEffect(() => {

    }, [])

    useEffect(() => {
        dispatch(TechnicsActionCreators.fetchRefills())
    }, [])
    return <>
        {
            refills.filter(el => el.status === "0").map(el => {
                return  <>{el?.device?.name}</>
            })
        }

    </>;
};
