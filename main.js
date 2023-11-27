import './style.css'
import TomSelect from 'tom-select'
import {Notification} from './scripts/Notification.js'
import Inputmask from 'inputmask'
import JustValidate from 'just-validate';
import {initForm} from "./scripts/form.js";
import {getComedians} from "./scripts/api.js";
import {createComedianBlock} from "./scripts/comedians.js";

export const notification = Notification.getInstance()
// console.log('notification:', notification)
// setTimeout(()=>{
//     // notification.show("test message", true)
//     notification.show("test message", false)
// }, 300)

const init = async () => {
    const bookingComediansList = document.querySelector('.booking__comedians-list')
    const bookingForm = document.querySelector('.booking__form')
    // document.querySelector('.event__info-item_comedians .event__info-number')
    const bookingInpFullname = document.querySelector('.booking__input_fullname')
    const bookingInpPhone = document.querySelector('.booking__input_phone')
    const bookingInpTicket = document.querySelector('.booking__input_tiket')

    const comedians = await getComedians()

    initForm(bookingForm, bookingInpPhone, bookingInpTicket, bookingInpFullname)
    if(!comedians)
        return

    document.querySelector('.event__info-item_comedians .event__info-number').textContent = comedians.length
    for(const comed of comedians){
        console.log('comed.comedian:', comed.comedian)
    }

    const comedianBlock = createComedianBlock(comedians)
    bookingComediansList.append(comedianBlock)

    // bookingForm.addEventListener('submit', (e) => {
    //     e.preventDefault()
    //     const data = {booking: []}
    //     const times = new Set()
    //
    //     new FormData(bookingForm).forEach((val, field) => {
    //         if (field === 'booking') {
    //             const [comedian, time] = val.split(',')
    //
    //             if (comedian && time) {
    //                 // console.log('bookingForm', comedian, time)
    //                 data.booking.push({comedian, time})
    //                 times.add(time)
    //             }
    //         } else {
    //             data[field] = val
    //         }
    //         // console.log(field, times.size, data.booking.length)
    //         if (times.size !== data.booking.length) { // времена повторяются
    //             // console.error(field, 'нельзя быть в одно время на разных выступлениях')
    //             notification.show("нельзя быть в одно время на разных выступлениях", false)
    //         }
    //     })
    // })
}

init()



