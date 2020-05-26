import React, { Component } from "react";

export default class LoadMoreComponent extends Component {
  render() {
    return (
      <button
        className="py-2 px-4 shadow-md rounded-lg text-center text-white bg-blue-800 w-full hover:shadow-lg"
        onClick={this.props.onClick}
      >
        {this.props.children || "Load More..."}
      </button>
    );
  }
}
