import styles from "./InputBox.module.scss"
import { useRef, useState } from "react"
import sentAudio from "../../assets/sent.mp3"
export default function InputBox({ sendMsg, usr }) {
    const [msg, setMsg] = useState("")
    const sentAudioRef = useRef()
    function deliverMessage() {
        if (!msg) return
        sentAudioRef?.current?.play()
        sendMsg(msg)
        setMsg("")
    }
    return (
        <section className={styles.container}>
            <audio
                src={sentAudio}
                preload="auto"
                type="audio/mp3"
                ref={sentAudioRef}
            />
            <input
                type="text"
                placeholder={`Type a message ${usr}`}
                value={msg}
                onChange={e => setMsg(e.target.value)}
                onKeyUp={e => e.key == "Enter" && deliverMessage()}
            />
            <i
                className={styles.send}
                onClick={deliverMessage}
            />
        </section>
    )
}
