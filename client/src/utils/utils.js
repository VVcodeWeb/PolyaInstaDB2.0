import axios from "axios"
export const getAuthenticationStatus = (setLoginStatus, setLoadingStatus) => {
    axios.get("/user/status", {
    })
    .then(() => {
        setLoginStatus(true)
        if(setLoadingStatus) setLoadingStatus(false)    
    })
    .catch((e) => {
        setLoginStatus(false)
        if(setLoadingStatus) setLoadingStatus(false)
    })
}

export const isArrEmpty = x => x.length === 0
export const isObjectEmpty = x => Object.keys(x).length === 0