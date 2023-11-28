export class HtmlNotification {
    static instance
    constructor() {
        if(HtmlNotification.instance)
            return HtmlNotification.instance
        this.timeout = 3000
        HtmlNotification.instance = this
    }
    static getInstance(){
        if(!HtmlNotification.instance)
            HtmlNotification.instance = new HtmlNotification()
        return HtmlNotification.instance
    }
    show(message, isSuccess){

        if ("Notification" in window) {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    const nInst = new Notification("Stand Up Notification!", { body: message });
                    setTimeout(() => nInst.close(), this.timeout);
                }
            });
        }

        const notification = this.createNotification(message, isSuccess)
        document.body.append(notification)
        this.animationNotification(notification, true)
        setTimeout(() => {
            this.animationNotification(notification, false).then(()=>{
                notification.remove()
            })
        }, this.timeout)
    }
    createNotification(message, isSuccess){
        const notification = document.createElement('div')
        notification.className = `notification ${isSuccess ? "notification_succsess" : "notification_error"}`
        notification.textContent = message
        return notification
    }
    animationNotification(notification, show){
        return new Promise((resolve)=>{
            if(show){
                requestAnimationFrame(()=>{
                    notification.classList.add('notification_show')
                    resolve()
                })
            }else{
                notification.classList.remove('notification_show')
                setTimeout(resolve, 500)
            }
        })
    }
}
// Notification.getInstance()
// Notification.instance

