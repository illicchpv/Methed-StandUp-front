import { notification } from "../main.js";

const API_URL = 'https://comedy-back2.glitch.me/'
// const API_URL = 'https://comedy-back.glitch.me/'
// // const API_URL = 'http://localhost:8080/'

export async function getComedians() {
    try {
        const resp = await fetch(API_URL + 'comedians')
        if (!resp)
            throw new Error(`Сервер вернул ошибку ${resp.status}`)
        return resp.json()
    } catch (e) {
        const msg = `fetch request problem ${e.message}`
        console.error(msg)
        notification.show(msg, false)
    }
}

export async function getClient(ticket) {
    try {
        const resp = await fetch(API_URL + 'clients/' + ticket)
        if (!resp)
            throw new Error(`getClient Сервер вернул ошибку ${resp.status}`)
        const txt = await resp.text()
        if(txt.startsWith('{') && txt.endsWith('}')){
          return JSON.parse(txt)
        }
        return undefined
    } catch (e) {
        const msg = `getClient fetch request problem ${e.message}`
        console.error(msg)
        notification.show(msg, false)
    }
}

export async function sendData(method, data, id) {
    try {
        const url = API_URL + `clients${(id ? `/${id}` : '')}`
        console.log('sendData method:', method, 'url:', url)
        const resp = await fetch(
            url,
            {
                method: method,
                headers: { 'Content-Type': 'application/json' },
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