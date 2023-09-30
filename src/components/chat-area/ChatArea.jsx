import { useRef } from "react"
import styles from "./ChatArea.module.scss"
export default function ChatArea({ messages }) {
    const lastRef = useRef()
    lastRef?.current?.scrollIntoView({ behavior: "smooth" })
    return (
        <ul className={styles.container}>
            {messages?.map((item, idx) => (
                <li
                    key={item.message + idx}
                    className={styles[item.type]}
                >
                    {item.type == "received" ? (
                        <>
                            <span>{item.usr}</span>
                            {item.message}
                        </>
                    ) : (
                        item.message
                    )}
                </li>
            ))}
            <li ref={lastRef} />
        </ul>
    )
}
