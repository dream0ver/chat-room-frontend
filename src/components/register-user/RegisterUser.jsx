import { useRef } from "react"
import styles from "./RegisterUser.module.scss"

export default function RegisterUser({ setUserName }) {
    const inputRef = useRef()
    const register = () => {
        const newSession = {
            usr: inputRef?.current?.value,
            history: []
        }
        if (!newSession.usr) return
        setUserName(newSession.usr)
        sessionStorage.setItem("chat_session", JSON.stringify(newSession))
    }
    return (
        <section className={styles.container}>
            <input
                type="text"
                placeholder="Enter your name"
                ref={inputRef}
                onKeyUp={e => e.key == "Enter" && register()}
            />
            <button onClick={register}>Join Chat Room</button>
        </section>
    )
}
