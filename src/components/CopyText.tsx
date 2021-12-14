import React from 'react'
import {Tooltip} from "antd";

interface CopyTextProps {
    description: string
}

export const CopyText: React.FC<CopyTextProps> = ({description}) => {
    return <Tooltip title="Click for copy to clipboard">
        <span className={"copyToClipboard"} onClick={() => {
            navigator.clipboard.writeText(description)
        }}>{description}</span>
    </Tooltip>;
};