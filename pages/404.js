import React, { Component } from 'react'

export default class GeprekFailedPage extends Component {
  render() {
    return (
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-20 h-20 my-2">
            <img src="./logo.svg" className="object-contain" style={{filter:"grayscale(40%) contrast(70%)"}} />
          </div>
          <div className="text-gray-700 font-bold text-5xl">404</div>
          <div className="text-gray-600 italic">Lhoo.. kayaknya salah geprek deh.</div>
        </div>
      </div>
    )
  }
}
