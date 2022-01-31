/* eslint-disable prefer-promise-reject-errors */
import net from 'react-native-tcp'
import { EscPos, ALIGNMENT, RASTER_MODE } from '@tillpos/xml-escpos-helper'
import { PrintOptions } from 'printer/types'
import ndarray from 'ndarray'
import Image from '@tillpos/xml-escpos-helper/lib/image'
import { PNG } from 'pngjs'

const connectToPrinter = (host: string, port: number, buffer: any) => {
  return new Promise((resolve, reject) => {
    let device: null | net.Socket = new net.Socket()
    device.on('close', () => {
      console.log('close')
      if (device) {
        device.end()

        device = null
      }
      resolve(true)
    })
    device.on('error', reject)
    device.connect(port, host, () => {
      if (device) {
        device.write(buffer)
        device.emit('close')
      }
    })
  })
}

export const getBuffer = async (options: PrintOptions) => {
  const buffer = EscPos.getBufferBuilder()

  if (options.image) {
    try {
      const imgData = PNG.sync.read(
        Buffer.from(
          options.image.replace(/&#x2F/g, '/').slice('data:image/png;base64,'.length),
          'base64'
        )
      )
      const pixels = ndarray(
        new Uint8Array(imgData.data),
        [imgData.width | 0, imgData.height | 0, 4],
        [4, (4 * imgData.width) | 0, 1],
        0
      )
      buffer
        .startAlign(ALIGNMENT.CENTER)
        .printImage(new Image(pixels), RASTER_MODE.NORMAL)
        .resetAlign()
    } catch (error) {
      console.log('error', error)
    }
  }
  buffer.lineFeed().printText(options.text).lineFeed()

  if (options.qr) {
    // const res = await qrcode.to(options.qr, {})
    // const imgData = PNG.sync.read(res)
    // const pixels = ndarray(
    //   new Uint8Array(imgData.data),
    //   [imgData.width | 0, imgData.height | 0, 4],
    //   [4, (4 * imgData.width) | 0, 1],
    //   0
    // )
    // buffer
    //   .startAlign(ALIGNMENT.CENTER)
    //   .printImage(new Image(pixels), RASTER_MODE.NORMAL)
    //   .resetAlign()
    // buffer.startAlign(ALIGNMENT.CENTER).printQRcode(options.qr).resetAlign()
  }
  if (options.cut) {
    buffer.paperCut()
  }
  return buffer.build()
}

export const print = (options: PrintOptions) =>
  new Promise((resolve, reject) => {
    const buffer = getBuffer(options)
    connectToPrinter(options.printer.host, options.printer.port, buffer)
      .then(resolve)
      .catch(reject)
  })
