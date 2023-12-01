export const displayClientInfo = (clientInfo, clientData) => {
  clientInfo.innerHTML += `
    <p class="booking__client-item">Имя: ${clientData.fullName}</p>
    <p class="booking__client-item">Телефон: ${clientData.phone}</p>
    <p class="booking__client-item">Билет: ${clientData.ticket}</p>
  `
}
export const displayBooking = (parent, clientData, comediansData) => {
  const bookingList = document.createElement('ul')
  bookingList.classList.add('booking__list')

  const bookingComedians = clientData.booking.map(el => {
    const comedian = comediansData.find(cel => {
      return cel.id === el.comedian
    })
    console.log('comedian: ', comedian);
    console.log('comedian.performances: ', comedian.performances);
    console.log('el.time: ', el.time);
    const perfomance = comedian.performances.find(perf => perf.time === el.time)
    return {comedian, perfomance}
  })

  bookingComedians.sort((a,b) => a.perfomance.time.localeCompare(b.perfomance.time))
  const comedianElems = bookingComedians.map(({comedian, perfomance}) => {
    const comedianEl = document.createElement('li')
    comedianEl.classList.add('booking__item')
    comedianEl.innerHTML = `
    <h3>${comedian.comedian}</h3>
    <p>Время: ${perfomance.time}</p>
    <button class="booking__hall" type="button"
      data-booking="${clientData.fullName} ${clientData.ticket} ${comedian.comedian} ${perfomance.time} ${perfomance.hall}"
    >${perfomance.hall}</button>
    `
    return comedianEl
  })
  bookingList.append(...comedianElems)
  parent.append(bookingList)
}
