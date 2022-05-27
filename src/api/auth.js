export const loginUser = (emailOrUsername, password) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({ emailOrUsername, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(() => ({}));
}

export const registerUser = ({ email, userName, password }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({ email, userName, password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .catch(() => ({}));
}