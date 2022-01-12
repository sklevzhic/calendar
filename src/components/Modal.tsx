import React, { useState } from 'react'
import {Modal} from "antd";

interface ModalProps {
    // isModalVisible: boolean,
    // title: string,
}

export const ModalInfo: React.FC<ModalProps> = ({children}) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        console.log('Ok')
        // setIsModalVisible(false);
    };

    const handleCancel = () => {
        console.log('handleCancel')
        // setIsModalVisible(false);
    };

    return <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {children}
    </Modal>;
};