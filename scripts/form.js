import JustValidate from "just-validate";
import Inputmask from "inputmask";
import TomSelect from "tom-select";
import {notification} from "../main.js";

export const initForm = (bookingForm, bookingInpPhone, bookingInpTicket, bookingInpFullname) => {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {booking: []}
        const times = new Set()

        new FormData(bookingForm).forEach((val, field) => {
            if (field === 'booking') {
                const [comedian, time] = val.split(',')

                if (comedian && time) {
                    // console.log('bookingForm', comedian, time)
                    data.booking.push({comedian, time})
                    times.add(time)
                }
            } else {
                data[field] = val
            }
            // console.log(field, times.size, data.booking.length)
            if (times.size !== data.booking.length) { // времена повторяются
                // console.error(field, 'нельзя быть в одно время на разных выступлениях')
                notification.show("нельзя быть в одно время на разных выступлениях", false)
            }
        })
    })

    const validate = new JustValidate(bookingForm, {
        errorFieldCssClass: 'booking__input_invalid',
        successFieldCssClass: 'booking__input_valid',
    })

    new Inputmask('+7(999)-999-9999').mask(bookingInpPhone)
    new Inputmask('99999999').mask(bookingInpTicket)

    validate.addField(bookingInpFullname, [
        {
            rule: 'required',
            errorMessage: 'введите имя',
        },
        {
            validator(value) {
                return value.trim().length >= 3
            },
            errorMessage: 'введите больше букв имени',
        },
    ])
    validate.addField('.booking__input_phone', [
        {
            rule: 'required',
            errorMessage: 'введите телефон',
        },
        {
            validator(value) {
                const phone = bookingInpPhone.inputmask.unmaskedvalue()
                return phone.length === 10 && !!Number(phone)
            },
            errorMessage: 'неверный телефон',
        },
    ])
    validate.addField(bookingInpTicket, [ // '.booking__input_tiket'
        {
            rule: 'required',
            errorMessage: 'заполните номер билета',
        },
        {
            validator(value) {
                const ticket = bookingInpTicket.inputmask.unmaskedvalue()
                return ticket.length === 8 && !!Number(ticket)
            },
            errorMessage: 'неверный номер билета',
        },
    ])
        .onFail((fields) => {
            // console.log('field:', fields)
            let errMsg = ''
            for (const key in fields) {
                if (!Object.hasOwnProperty.call(fields, key))
                    continue
                const el = fields[key]
                if (!el.isValid) {
                    errMsg += `${el.errorMessage}, `
                }
            }
            notification.show(errMsg.slice(0, -2), false)
        })
}