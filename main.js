import './style.css'
import  TomSelect from 'tom-select'

const MAX_COMEDIANTS = 6
const bookingComediansList = document.querySelector('.booking__comedians-list')

const createComedianBlock = (comedians) => {
    const bookingComedian = document.createElement('li')
    bookingComedian.classList.add('booking__comedian')
    bookingComedian.innerHTML = `
    <select class="booking__select booking__select_comedian" name="comedian">
    </select>

    <select class="booking__select booking__select_time" name="time">
    </select>
    <input type="hidden" name="booking">

    <!--  <button class="booking__hall">Зал 1</button> -->
    `;
    const bookingHall = document.createElement('button')
    bookingHall.classList.add('booking__hall')
    bookingHall.type = 'button'

    const inputHidden =  bookingComedian.querySelector('[name=booking]')
    // console.log('inputHidden', inputHidden)
    const comSelect = bookingComedian.querySelector('.booking__select_comedian')
    const comSelectTom = new TomSelect(comSelect, {
        hideSelected: true,
        placeholder: 'Выбрать комика',
        options: comedians.map(el => ({value:el.id, text:el.comedian})),
    })
    const timeSelect = bookingComedian.querySelector('.booking__select_time')
    const timeSelectTom = new TomSelect(timeSelect, {
        hideSelected: true,
        placeholder: 'Время',
    })
    timeSelectTom.disable()
    comSelectTom.on('change', (id) => {
        const { performances } = comedians.find(el => el.id === id)
        // console.log('id', id, 'performances', performances)
        timeSelectTom.clear()
        timeSelectTom.clearOptions()
        inputHidden.value = ``
        bookingHall.textContent = ''

        timeSelectTom.addOptions(
            performances.map(el => ({value: el.time, text: el.time, }))
        )
        timeSelectTom.enable()
        comSelectTom.blur()
    })
    timeSelectTom.on('change', (time) => {
        if(!time)
            return
        const comId = comSelectTom.getValue()
        const { performances } = comedians.find(el => el.id === comId)
        // console.log('comId', comId, 'time', time, 'performances', performances)
        const {hall} = performances.find(el => el.time === time)
        inputHidden.value = `${comId},${time}`
        bookingHall.textContent = hall
        bookingComedian.append(bookingHall)
        timeSelectTom.blur()
    })

    const createNextBookingComedian = () => { // ! to do append(nextComedianBlock)
        const cLen = document.querySelectorAll('.booking__comedian').length
        if(cLen >= MAX_COMEDIANTS)
            return
        const nextComedianBlock = createComedianBlock(comedians)
        document.querySelector('.booking__comedians-list').append(nextComedianBlock)

        timeSelectTom.off('change', createNextBookingComedian)
    }
    timeSelectTom.on('change', createNextBookingComedian)

    return bookingComedian
}

async function getComedians(){
    const resp = await fetch('http://localhost:8080/comedians')
    return resp.json()
}
const init = async () => {
    const comedians = await getComedians()
    document.querySelector('.event__info-item_comedians .event__info-number').textContent = comedians.length
    // console.log('comedians', comedians)

    const comedianBlock = createComedianBlock(comedians)
    bookingComediansList.append(comedianBlock)
}

init()



