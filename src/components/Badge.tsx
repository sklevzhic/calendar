import React from 'react'
import { Tag, Divider } from 'antd';
import { Typography } from 'antd';
import {colors} from "../consts/status";
import {

    MinusCircleOutlined,
} from '@ant-design/icons';
const { Text } = Typography;


interface BadgeElemProps {
    key: string | number,
    status: any
    text: string | number
}

export const BadgeElem: React.FC<BadgeElemProps> = ({key,status, text}) => {
    return <Tag key={key} color={status} icon={<MinusCircleOutlined />}>
        {text}
    </Tag>;
};