import React from 'react'
import {Badge, Tooltip} from "antd";
import { Typography } from 'antd';
import {colors} from "../consts/status";

const { Text } = Typography;


interface BadgeElemProps {
    key: string | number,
    status: [key: string]: string | number,
    text: string | number
}

export const BadgeElem: React.FC<BadgeElemProps> = ({key, status, text}) => {
    return <Badge key={key} status={status} text={text}/>;
};