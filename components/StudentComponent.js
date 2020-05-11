import React from 'react';

export default class StudentComponent extends React.Component {

  constructor(props)
  {
    super(props)
    this.name = React.createRef();
    this.nimFakultas = React.createRef();
    this.nimJurusan = React.createRef();
  }

  copyToClipboard(elementRef)
  {x
    navigator.clipboard.writeText(elementRef.current.innerHTML)
  }

  render() {
    return(
      <div className="flex w-full my-2 md:my-1">
        <div className="flex flex-col w-3/4 justify-start md:items-center md:flex-row">
          <div className="font-semibold text-sm hover:bg-gray-300 hover:text-gray-800 md:text-base md:mr-2 transition duration-100" ref={this.name} onClick={() => this.copyToClipboard(this.name)}>
            {this.props.name || 'N/A'}
          </div>
          <div className="font-light text-xs tracking-wider md:text-sm">
            {this.props.jurusan || 'Teknik Wibu'}
          </div>
        </div>
        <div className="flex flex-col w-1/4 text-right items-end text-sm text-blue-800 font-light">
          <div className="w-20 text-xs md:text-base hover:bg-gray-300 hover:text-gray-800 transtition duration-100" ref={this.nimFakultas} onClick={() => this.copyToClipboard(this.nimFakultas)}>
            {this.props.nimFakultas || '16518000'}
          </div>
          <div className="w-20 text-xs md:text-base hover:bg-gray-300 hover:text-gray-800 transition duration-100" ref={this.nimJurusan} onClick={() => this.copyToClipboard(this.nimJurusan)}>
            {this.props.nimJurusan}
          </div>
        </div>
      </div>
    )
  }
}