import {notification} from "../main.js";

const urlBase = 'https://comedy-back.glitch.me/'
// const urlBase = 'http://localhost:8080/'

export async function getComedians() {
    try {
        const resp = await fetch(urlBase + 'comedians')
        if (!resp)
            throw new Error(`Сервер вернул ошибку ${resp.status}`)
        return resp.json()
    } catch (e) {
        const msg = `fetch request problem ${e.message}`
        console.error(msg)
        notification.show(msg, false)
    }
}

export async function sendData(method, data, id) {
    try {
        const url = urlBase + `clients${(id ? `/${id}` : '')}`
        console.log('sendData method:', method, 'url:', url)
        const resp = await fetch(
            url,
            {
                method: method,
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            }
        )
        if (!resp)
            throw new Error(`Сервер вернул ошибку ${resp.status}`)
        // return resp.json()
        return true
    } catch (e) {
        const msg = `fetch clients request problem ${e.message}`
        console.error(msg)
        notification.show(msg, false)
        return false
    }
}