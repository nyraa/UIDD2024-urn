"use client";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import Nav from "@app/components/Nav";
import "./page.sass";
import { useState, useEffect } from 'react';

export default function LoginPage() {
    const [isSignupVisible, setSignupVisible] = useState(false);
    const [isVerifyVisible, setVerifyVisible] = useState(false);
    const [email, setEmail] = useState(""); // 新增 email state

    const showSignup = () => setSignupVisible(true);
    const hideSignup = () => setSignupVisible(false);

    const showVerify = () => setVerifyVisible(true);
    const hideVerify = () => {
        setVerifyVisible(false);
        showSignup();
    };

    const handleSignupComplete = (email) => {
        setEmail(email); // 設置 email state
        hideSignup();
        showVerify();
    };

    return (
        <>
            <Nav />
            <Back />
            <Input />
            <Remember />
            <Account title="登入" title2="建立新帳號" showSignup={showSignup} />
            <Quick_login title1="以Apple帳號登入" title2="以FACEBOOK帳號登入" title3="以Google帳號登入" />
            {isSignupVisible && <Signup hideSignup={hideSignup} handleSignupComplete={handleSignupComplete} />}
            {isVerifyVisible && <Verify hideVerify={hideVerify} email={email} />}
        </>
    );
}

function Back() {
    return (
        <section className="back">
            <Titlelink title="憶起創造，無價永生!" href="http://localhost:3000/" />
        </section>
    );
} 

function Titlelink({ title, href }) {
    return (
        <a href={href}>
            <div className="title">{title}</div>
        </a>
    );
}

function Input() {
    return (
        <section className="login-text">
            <input type="text" className="account-id" placeholder="電子郵件/手機號碼" />
            <input type="password" className="password" placeholder="密碼" />           
        </section>
    );
}

function Remember() {
    return (
        <section className="remember">
            <input type="checkbox" className="check" />
            <div className="remember-me">記住我</div>
            <Forget title="忘記密碼?" href="#" />
        </section>
    );
}

function Forget({ title, href }) {
    return (
        <a href={href}>
            <div className="forget">{title}</div>
        </a>
    );
}

function Account({ title, title2, showSignup }) {
    return (
        <section className="account">
            <button className="login">{title}</button>
            <div className="line1"></div>
            <button className="signup" id="signup" onClick={showSignup}>{title2}</button>
        </section>
    );
}

function Quick_login({ title1, title2, title3 }) {
    return (
        <section className="sublogin">
            <div className="quick-text">快速登入</div>
            <button className="apple">{title1}</button>
            <button className="facebook">{title2}</button>
            <button className="google">{title3}</button>
        </section>
    );
}

function Signup({ hideSignup, handleSignupComplete }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSignupClick = () => {
        if (!validateEmail(email)) {
            setError("email格式錯誤");
        } else {
            setError("");
            handleSignupComplete(email);
        }
    };

    const validateEmail = (email) => {
        // 簡單的 email 格式驗證
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <section className="create-account" id="create-account">
            <div className="create-title">建立新帳號</div>
            <img className="cross" id="cross" src="assets/cross.png" onClick={hideSignup} />
            <input type="text" className="sign-input" id="name" placeholder="你的名字" />
            <input 
                type="text" 
                className="sign-input" 
                id="email" 
                placeholder="電子信箱" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input type="password" className="sign-input" id="pass" placeholder="密碼" />
            <input type="password" className="sign-input" id="pass-again" placeholder="再次輸入密碼" />
            {error && <div className="error">{error}</div>}
            <img className="bot" src="assets/imnotbot.png" />
            <button className="sign-account" id="sign-account" onClick={handleSignupClick}>註冊</button>
            <div className="sign-text">註冊帳戶，即視為同意遵守
                <div className="bone-text">骨諺云</div>
                的
                <Regulation title="使用規章" href="#" />
                和
                <Regulation title="隱私聲明" href="#" />
                。
            </div>
            <div className="line2"></div>
            <div className="click-login">
                已有帳戶？按此
                <Regulation title="登入" href="#" />
                。
            </div>
        </section>
    );
}

function Regulation({ title, href }) {
    return (
        <a href={href}>
            <div className="regulation-text">{title}</div>
        </a>
    );
}

function Verify({ hideVerify, email }) {
    const [seconds, setSeconds] = useState(0);
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        let timer;
        if (isSent && seconds > 0) {
            timer = setInterval(() => {
                setSeconds(prevSeconds => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0 && isSent) {
            setIsSent(false);
        }

        return () => clearInterval(timer);
    }, [isSent, seconds]);

    const handleSendClick = () => {
        setIsSent(true);
        setSeconds(30);
    };

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        if (value.length === 1) {
            const nextInput = document.getElementById(`verify-code-${index + 1}`);
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    return (
        <section className="verify">
            <div className="verify-title">電子信箱認證</div>
            <img className="cross" id="verify-cross" src="assets/cross.png" onClick={hideVerify} />
            <div className="verify-text">我們將發送驗證郵件至您提供的電子信箱：</div>
            <div className="verify-email">{email}</div>           
            <div className="verify-text">請檢查信箱收件並於下方輸入認證碼</div>
            <div className="verify-text">以完成帳號開通，謝謝。</div>
            <button 
                className="sent-email" 
                onClick={handleSendClick} 
                disabled={isSent}
            >
                {isSent ? "已發送" : "發送認證信"}
            </button>
            {isSent && <div className="resend-timer">{seconds}秒後可重新發送</div>}
            <div className="verify-code-container">
                {[...Array(5)].map((_, i) => (
                    <input 
                        key={i} 
                        type="text" 
                        className="verify-code" 
                        maxLength="1" 
                        id={`verify-code-${i}`}
                        onChange={(e) => handleInputChange(e, i)}
                    />
                ))}
            </div>
            <div className="line3"></div>
            <div className="change">
                這不是您的郵件？按此返回
                <div className="change-email" onClick={hideVerify}>修改</div>
                。
            </div>
        </section>
    );
}
