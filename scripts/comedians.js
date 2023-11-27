import TomSelect from "tom-select";

const MAX_COMEDIANS = 6

export const createComedianBlock = (comedians) => {
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

