import page from "./../../node_modules/page/page.mjs"

import { loginURL, registerURL, logoutURL } from "./../constants/index.js";

export function getAuthData() {
    return JSON.parse(localStorage.getItem('auth'))
}

// vvv Handles login
export function handleLogin(e) {
    e && e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
        alert('All fields are required');
        return;
    }


    const body = {
        email,
        password
    }

    login(body)
        .then(() => {
            page.redirect('/')
        })
        .catch(err => {
            alert(err.message);
        });
}

function login(body) {
    return fetch(loginURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.status !== 200) {
                alert('Error')
                return;
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (!data) {
                return;
            }
            setAuthData(data);
        })
}

// vvv Handles registration
export function handleRegister(e) {
    e && e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePassword = formData.get('re-password')

    if (!email || !password || !rePassword) {
        alert('All fields are required');
        return;
    }

    if (password !== rePassword) {
        alert("Passwords don't match")
        return;
    }

    const body = {
        email,
        password
    }

    register(body)
        .then(() => {
            page.redirect('/')
        })
        .catch(err => {
            alert(err.message);
        });
}

function register(body) {
    return fetch(registerURL, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(res => {
            if (res.status !== 200) {
                alert('Error')
            } else {
                return res.json();
            }
        })
        .then((data) => {
            if (!data) {
                return;
            }
            setAuthData(data);
        })
}

// vvv Handles logout
export function logout() {
    return fetch(logoutURL, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "X-Authorization": getAuthData().accessToken
        }
    })
        .then(() =>
            localStorage.removeItem('auth'))
}

// vvv Adds to localStorage
function setAuthData(authData) {
    localStorage.setItem('auth', JSON.stringify(authData));
}