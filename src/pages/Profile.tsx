import { Empty } from 'antd';

import React from 'react'


interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = () => {

    return <div  style={{padding: '0 50px'}}>
        <Empty description={"Profile"}/>
    </div>
};