import { useEffect, useRef, useState } from "react"
import useWebSocket from "react-use-websocket"
import styles from "./Homescreen.module.scss"
import ChatArea from "../chat-area/ChatArea"
import InputBox from "../input-box/InputBox"
import { getSession } from "../../util"
import receiveAudio from "../../assets/received.mp3"
export default function Homescreen({ usr }) {
    const [chatHistory, setChatHistory] = useState(getSession()?.history || [])
    const receiveAudioRef = useRef()

    const { sendMessage, lastMessage } = useWebSocket(
        import.meta.env.VITE_SOCKET_URL
    )

    const updateChatHistory = ({ type, message, usr }) => {
        setChatHistory(prev => {
            const updatedHistory = [...prev, { type, message, usr }]
            const currentSession = getSession()
            sessionStorage.setItem(
                "chat_session",
                JSON.stringify({ ...currentSession, history: updatedHistory })
            )
            return updatedHistory
        })
    }

    const sendMsg = msg => {
        updateChatHistory({ type: "sent", message: msg, usr })
        sendMessage(JSON.stringify({ msg, usr }))
    }

    useEffect(() => {
        if (!lastMessage) return
        const res = JSON.parse(lastMessage?.data)
        updateChatHistory({ type: "received", message: res.msg, usr: res.usr })
        receiveAudioRef?.current?.play()
    }, [lastMessage])

    return (
        <section className={styles.container}>
            <audio
                src={receiveAudio}
                preload="auto"
                type="audio/mp3"
                ref={receiveAudioRef}
            />
            <ChatArea messages={chatHistory} />
            <InputBox
                sendMsg={sendMsg}
                usr={usr}
            />
        </section>
    )
}
