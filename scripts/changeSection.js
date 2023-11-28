export const initChangeSection = (bookingForm,
                                  event,
                                  booking,
                                  eventButtonReserve,
                                  eventButtonEdit,
                                  bookingTitle) => {


    eventButtonReserve.style.transition = 'opacity 0.5s, visibility 0.5s'
    eventButtonEdit.style.transition = 'opacity 0.5s, visibility 0.5s'
    eventButtonReserve.classList.remove('event__button_hidden')
    eventButtonEdit.classList.remove('event__button_hidden')

    const changeSection = () => {
        event.classList.toggle('event_hidden')
        eventButtonEdit.classList.toggle('button_hidden')
        eventButtonReserve.classList.toggle('button_hidden')
        booking.classList.toggle('booking_hidden')
    }

    eventButtonReserve.addEventListener('click', (s)=>{
        changeSection()
        bookingForm.method = 'POST'
        bookingTitle.textContent = 'Забронируйте место в зале'
    })
    eventButtonEdit.addEventListener('click', (s)=>{
        changeSection()
        bookingForm.method = 'PATCH'
        bookingTitle.textContent = 'Редактирование брони'
    })
    return changeSection
}