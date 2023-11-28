import './style.css'
import TomSelect from 'tom-select'
import {HtmlNotification} from './scripts/HtmlNotification.js'
import Inputmask from 'inputmask'
import JustValidate from 'just-validate';
import {initForm} from "./scripts/form.js";
import {getComedians} from "./scripts/api.js";
import {createComedianBlock} from "./scripts/comedians.js";
import {initChangeSection} from "./scripts/changeSection.js";

export const notification = HtmlNotification.getInstance()
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
    const bookingInpTicket = document.querySelector('.booking__input_ticket')

    const event = document.querySelector('.event')
    const booking = document.querySelector('.booking')
    const eventButtonReserve = document.querySelector('.event__button_reserve')
    const eventButtonEdit = document.querySelector('.event__button_edit')
    const bookingTitle = document.querySelector('.booking__title')


    const comedians = await getComedians()

    if (!comedians)
        return

    document.querySelector('.event__info-item_comedians .event__info-number').textContent = comedians.length
    // for (const comed of comedians) {
    //     console.log('comed.comedian:', comed.comedian)
    // }

    const comedianBlock = createComedianBlock(comedians)
    bookingComediansList.append(comedianBlock)

    const changeSection = initChangeSection(bookingForm,
        event,
        booking,
        eventButtonReserve,
        eventButtonEdit,
        bookingTitle)

    initForm(
        bookingForm,
        bookingInpPhone,
        bookingInpTicket,
        bookingInpFullname,
        changeSection,
        bookingComediansList
    )

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



