
export const getMemoriesLiked = ({ token }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/userLikes/getUserLikes`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).catch(console.error);
}

export const createLike = (memoryId, { token }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/userLikes/likeMemory`, {
        method: 'POST',
        body: JSON.stringify({ memoryId }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).catch(console.error);
}

export const deleteLike = (memoryId, { token }) => {
    return fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/userLikes/unlikeMemory`, {
        method: 'POST',
        body: JSON.stringify({ memoryId }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json()).catch(console.error);
}