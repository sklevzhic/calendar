import React from 'react'
import {Tooltip} from "antd";
import { Typography } from 'antd';

const { Text } = Typography;


interface CopyTextProps {
    description: string | number
}

export const CopyText: React.FC<CopyTextProps> = ({description}) => {
    return <Tooltip title="Click for copy to clipboard">
        <Text code className={"copyToClipboard"} onClick={() => {
            navigator.clipboard.writeText(description.toString())
        }}>{description}</Text>
    </Tooltip>;
};