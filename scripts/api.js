import {notification} from "../main.js";

export async function getComedians() {
    try{
        const resp = await fetch('http://localhost:8080/comedians')
        if(!resp)
            throw new Error(`Сервер вернул ошибку ${resp.status}`)
        return resp.json()
    }catch (e) {
        const msg = `fetch request problem ${e.message}`
        console.error(msg)
        notification.show(msg, false)
    }
}
