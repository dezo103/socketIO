import './App.css';
import {io} from "socket.io-client";
import {useEffect, useState} from "react";


const socket = io.connect('http://localhost:3001')

function App() {
    const [room, setRoom] = useState('')

    const [message, setMessage] = useState('')
    const [messageReceived, setMessageReceived] = useState('')

    const joinRoom = () => {
        (room !== '') && socket.emit('join_room', room)

    }

    const sendMessage = () => {
        socket.emit('send_message', {message, room})
    }

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setMessageReceived(data.message)
        })
    }, [socket])

    return (
        <div className="App">
            <input type="text"
                   placeholder={'room...'}
                   onChange={(event) => {setRoom(event.target.value)}}/>
            <button onClick={joinRoom}>Join room</button>
            <input type="text"
                   placeholder={'message...'}
                   value={message}
                   onChange={(event) => {setMessage(event.target.value)}}/>
            <button onClick={sendMessage}>Send message</button>
            <h1>Messages</h1>
            {messageReceived}
        </div>
    );
}

export default App;
