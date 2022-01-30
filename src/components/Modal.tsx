import React, {Dispatch, SetStateAction} from 'react'
import { Modal } from "antd";
import {IPrinter} from "../models/Technics";

interface ModalProps {
    isModalVisible: boolean,
    setIsModalVisible: Dispatch<SetStateAction<boolean>>
    activeElement: IPrinter
}

export const ModalInfo: React.FC<ModalProps> = ({children, activeElement, isModalVisible, setIsModalVisible}) => {

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    return <Modal title={activeElement.name} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {children}
    </Modal>;
};