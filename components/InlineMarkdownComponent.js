import React, { Component } from 'react'

export default class InlineMarkdownComponent extends Component {
  render() {
    return (
      <span className="bg-blue-200 text-blue-700 font-mono tracking-tight p-1 text-center mx-1">
        {this.props.children}
      </span>
    )
  }
}
