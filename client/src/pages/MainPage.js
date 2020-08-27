//libs
import React, {useState, useEffect, useRef} from 'react'
import { useHistory } from "react-router-dom"
import axios from "axios"
import {Link} from "react-router-dom"
//components, utils, scss
import "./MainPage.scss"
import {getAuthenticationStatus} from "../utils/utils"
import InputForm from "../components/Input"
import ButtonLoader from "../components/ButtonLoader"
//icons, imgs
import img from "../assets/img.png"
import { faEnvelope, faLock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

function MainPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [sentRequestStatus, setSentRequestStatus] = useState(false) 
    const [isLoggedIn, setIsLoggedIn] = useState("")
    const [loadingStatus, setLoadingStatus] = useState(true)
    const [failedAuthentication, setFailedAuthentication] = useState(false)
    const firstRender = useRef(true)
    var history = useHistory()
    
    const [query, setQuery] = useState({
        email: "",
        password: ""
    })
    
    useEffect(() => {
        if(firstRender.current){
            firstRender.current = false
            return
        }
        if(!email || !password) return;
        const ac = new AbortController()
        const loginRequest = async(email, password, history) => {
            setSentRequestStatus(true)
            const params = new URLSearchParams()
            params.append("email", email)
            params.append("password", password)
            axios
            .post("/user/login", params, {
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                signal: ac.signal
            })
            .then(() => {
                setFailedAuthentication(false)
                history.push("/database")
                setSentRequestStatus(false)
            })
            .catch(() => {
                setFailedAuthentication(true)
                setPassword("")
                setSentRequestStatus(false)
            })
        }
        loginRequest(email, password, history)
        return () => ac.abort()
    // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [query])
    useEffect(() =>  {
        getAuthenticationStatus(setIsLoggedIn, setLoadingStatus)
        setFailedAuthentication(false)
    }, [])


    const loginHandler = () => {
        if(isLoggedIn){
            history.push("/database")
        }
        setQuery({
            email: email,
            password: password
        })
    }
    const updateEmailField = e => setEmail(e.target.value)
    const updatePasswordField = e => setPassword(e.target.value)
    

    return (
        <div className="main_page w-100 h-100">
            <div className="main_page__content ">
                <div className="demo_wrapper mt-2">
                    <Link to="/database"><p className="demo_button text-uppercase">Demo</p> </Link>
                </div>  
                <div className="main_page__content_image">
                    <img src={img} alt="laptop"/>
                </div>
                 {loadingStatus
                    ? <div className="lds-heart"><div></div></div>
                    :
                    <div className="main_page__content__form">
                        <h3 className="mb-5 ">PolyaInstagramDB</h3>
                        {isLoggedIn
                        ? <h1>You are logged!</h1>
                        :
                        <div className="inputs">
                            <InputForm placeholder="Email"  failedAuthentication= {failedAuthentication? true: null} icon={faEnvelope} value={email} hidden={false} onChange={updateEmailField}/>                    
                            <InputForm placeholder="Password" failedAuthentication= {failedAuthentication} icon={faLock} value={password} hidden={true} onChange={updatePasswordField}/>
                            <p className={failedAuthentication? "show_text": "hidden_text"}>Either e-mail or password is incorrect</p>
                        </div>
                        }
                        <div className="button_wrapper mt-5">
                        {sentRequestStatus
                            ? <ButtonLoader />
                            : <button className="login_button text-uppercase" onClick={loginHandler}>{isLoggedIn? "Towards DB": "Login"}</button>
                        }
                    </div>                      
                </div>
                }      
                <div className="github_icon">
                <a href="https://github.com/VVcodeWeb" target="blank"><FontAwesomeIcon  icon={faGithub} /></a>             
                </div>
            </div>
            
        </div>
    )
}

export default MainPage
