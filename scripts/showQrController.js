import QRCode from 'qrcode'

// var QRCode = require('qrcode')
import { HtmlNotification } from "./HtmlNotification"


const displayQRCode = (data) => {
  let error = false
  const modal= document.querySelector('.modal')
  const canvas= document.querySelector('#qrCanvas')
  const closeButton  = document.querySelector('.modal__close')

  QRCode.toCanvas(canvas, data, (err) => {
    if(err){
      console.error('err: ', err);
      error = true
      return
    }
    console.log('QR код создан');
  })

  if(error){
    HtmlNotification.getInstance().show("QRCode что то не так")
    return
  }

  modal.classList.add('modal_show')
  window.addEventListener('click', ({target}) => {
    console.log('target: ', target);
    if(target === closeButton || target === modal){
      modal.classList.remove('modal_show')
      canvas.getContext('2d').clearRect(0,0,canvas.width,canvas.height)
    }
  })

}

export const showQrController = (perfomance) =>{
  perfomance.addEventListener('click', ({target}) => {
    if(target.closest('.booking__hall')){
      const bookingData = target.dataset.booking
      displayQRCode(bookingData)
    }
  })
}