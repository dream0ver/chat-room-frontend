import { useState } from "react"
import Homescreen from "./components/homescreen/Homescreen"
import RegisterUser from "./components/register-user/RegisterUser"
import { getSession } from "./util"
function App() {
    const [userName, setUserName] = useState(getSession()?.usr)
    return (
        <>
            {userName ? (
                <Homescreen usr={userName} />
            ) : (
                <RegisterUser setUserName={setUserName} />
            )}
        </>
    )
}

export default App
