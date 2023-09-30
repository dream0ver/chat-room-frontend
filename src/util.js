export const getSession = () => {
    const session = sessionStorage.getItem("chat_session")
    return session ? JSON.parse(session) : {}
}
