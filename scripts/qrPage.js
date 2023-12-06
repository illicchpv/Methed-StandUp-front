// http://localhost:5173/Methed-StandUp-front/qr.html?t=987654321
// https://illicchpv.github.io/Methed-StandUp-front/qr.html?t=12344321

import { HtmlNotification } from "./HtmlNotification"
import { getClient, getComedians } from "./api"
import { displayBooking, displayClientInfo } from "./display"
import { showQrController } from "./showQrController"

const getTicket = () => {
  const qstring = window.location.search
  // console.log('qstring: ', qstring);
  const urlParams = new URLSearchParams(qstring)
  return urlParams.get('t')
}

export const initQrPage = async () => {
  const clientInfo = document.querySelector('.booking__client-info')
  const perfomance = document.querySelector('.booking__perfomance')
  // console.log('perfomance: ', perfomance);

  const ticket = getTicket()
  console.log('ticket: ', ticket);
  if(ticket){
    const clientData = await getClient(ticket)
    console.log('clientData: ', clientData);
    displayClientInfo(clientInfo, clientData)
    const comediansData = await getComedians()
    console.log('comediansData: ', comediansData);
    displayBooking(perfomance, clientData, comediansData)
    showQrController(perfomance)
  }else{
    HtmlNotification.getInstance().show('Произошла ошибка, проверьте ссылку')
  }

}