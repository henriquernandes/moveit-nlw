import styles from '../styles/components/LoginPage.module.css';
import  { createContext, useContext, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { truncate } from 'fs';

interface LoginContextData {
    login: string,
    name: string,
    hasAccount: string,
}

export const LoginContext = createContext({} as LoginContextData);

export function LoginPage() { 

    const [hasAccount, setHasAccount] = useState('');
    var [hasLogin, setLogin] = useState({status: false, img: 'Button.png'});

    async function gitData(){
        await fetch(`https://api.github.com/users/${hasAccount}`)
        .then(response => response.json(), () => { setLogin(hasLogin = {status: true,img: 'ButtonApproved.png' })})
        .catch(() => {setLogin(hasLogin = {status: false,img: 'Button.png'})})
        .then(response => Cookies.set('username', String(response.login)))
    };

    useEffect(() => {
        let waitTime =  setTimeout(() => {
            if(hasAccount == Cookies.get('username')){
                setLogin(hasLogin = {
                    status: true,
                    img: 'ButtonApproved.png'
                });
            } else {
               gitData();
                setLogin(hasLogin = {
                    status: false,
                    img: 'Button.png'
                });
            }
                       
        }, 1000);
        return () => clearTimeout(waitTime);
    },[hasAccount])

    return(
        <div className={styles.LoginBoxContainer}>
            <img className={styles.background} src="/Simbolo.png">
            </img>

            <div className={styles.login} >
                <img src="Logo.png" alt="logo" className={styles.logo}/>
                <h1 className={styles.welcome}>Bem-Vindo</h1>
                <div className={styles.info}>
                    <img src="Git.png" alt="" className="git"/>
                </div>
                <div className={styles.loginInput}>
                    <input type="text"  placeholder="Digite seu username" value={hasAccount} onChange={(event) => setHasAccount(event.target.value)}/>
                    <button ><img src={`${hasLogin.img}`} id='' alt="" className="enter"/></button>
                </div>
            </div>
        </div>
    );
}