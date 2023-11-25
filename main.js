import './style.css'
import TomSelect from 'tom-select'
import {Notification} from './scripts/Notification.js'
import Inputmask from 'inputmask'
import JustValidate from 'just-validate';

const notification = Notification.getInstance()
// console.log('notification:', notification)
// setTimeout(()=>{
//     // notification.show("test message", true)
//     notification.show("test message", false)
// }, 300)

const MAX_COMEDIANS = 6
const bookingComediansList = document.querySelector('.booking__comedians-list')
const bookingForm = document.querySelector('.booking__form')
const validate = new JustValidate(bookingForm, {
    errorFieldCssClass: 'booking__input_invalid',
    successFieldCssClass: 'booking__input_valid',
})

const bookingInpFullname = document.querySelector('.booking__input_fullname')
const bookingInpPhone = document.querySelector('.booking__input_phone')
const bookingInpTicket = document.querySelector('.booking__input_tiket')

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
            if(!Object.hasOwnProperty.call(fields, key))
                continue
            const el = fields[key]
            if(!el.isValid){
                errMsg += `${el.errorMessage}, `
            }
        }
        notification.show(errMsg.slice(0,-2), false)
    })


const createComedianBlock = (comedians) => {
    const bookingComedian = document.createElement('li')
    bookingComedian.classList.add('booking__comedian')
    bookingComedian.innerHTML = `
<!-- ???  name="comedian" -->
    <select class="booking__select booking__select_comedian">
    </select>

    <select class="booking__select booking__select_time" name="time">
    </select>
    <input type="hidden" name="booking">

    <!--  <button class="booking__hall">Зал 1</button> -->
    `;
    const bookingHall = document.createElement('button')
    bookingHall.classList.add('booking__hall')
    bookingHall.type = 'button'

    const inputHidden = bookingComedian.querySelector('[name=booking]')
    // console.log('inputHidden', inputHidden)
    const comSelect = bookingComedian.querySelector('.booking__select_comedian')
    const comSelectTom = new TomSelect(comSelect, {
        hideSelected: true,
        placeholder: 'Выбрать комика',
        options: comedians.map(el => ({value: el.id, text: el.comedian})),
    })
    const timeSelect = bookingComedian.querySelector('.booking__select_time')
    const timeSelectTom = new TomSelect(timeSelect, {
        hideSelected: true,
        placeholder: 'Время',
    })
    timeSelectTom.disable()
    comSelectTom.on('change', (id) => {
        const {performances} = comedians.find(el => el.id === id)
        // console.log('id', id, 'performances', performances)
        timeSelectTom.clear()
        timeSelectTom.clearOptions()
        inputHidden.value = ``
        bookingHall.textContent = ''

        timeSelectTom.addOptions(
            performances.map(el => ({value: el.time, text: el.time,}))
        )
        timeSelectTom.enable()
        comSelectTom.blur()
    })
    timeSelectTom.on('change', (time) => {
        if (!time)
            return
        const comId = comSelectTom.getValue()
        const {performances} = comedians.find(el => el.id === comId)
        // console.log('comId', comId, 'time', time, 'performances', performances)
        const {hall} = performances.find(el => el.time === time)
        inputHidden.value = `${comId},${time}`
        bookingHall.textContent = hall
        bookingComedian.append(bookingHall)
        timeSelectTom.blur()
    })

    const createNextBookingComedian = () => { // ! to do append(nextComedianBlock)
        const cLen = document.querySelectorAll('.booking__comedian').length
        if (cLen >= MAX_COMEDIANS)
            return
        const nextComedianBlock = createComedianBlock(comedians)
        document.querySelector('.booking__comedians-list').append(nextComedianBlock)

        timeSelectTom.off('change', createNextBookingComedian)
    }
    timeSelectTom.on('change', createNextBookingComedian)

    return bookingComedian
}

async function getComedians() {
    const resp = await fetch('http://localhost:8080/comedians')
    return resp.json()
}

const init = async () => {
    const comedians = await getComedians()
    document.querySelector('.event__info-item_comedians .event__info-number').textContent = comedians.length
    console.log('comedians', comedians)
    for(const comed of comedians){
        comed.comedian = comed.comedian.toLowerCase()
        console.log('comed.comedian:', comed.comedian)
    }

    const comedianBlock = createComedianBlock(comedians)
    bookingComediansList.append(comedianBlock)

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
}

init()



