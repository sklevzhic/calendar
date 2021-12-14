import React from 'react'


interface WebSocketProps {

}

export const WebSocket1: React.FC<WebSocketProps> = () => {
    const pricesWs = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,monero,litecoin')

    pricesWs.onmessage = function (msg) {
        console.log(msg.data)
    }
    return <div  style={{padding: '0 50px'}}>
        WebSocket
    </div>
};