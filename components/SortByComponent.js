import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class SortByComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ascending: 0,
    };
  }

  render() {
    return (
      <div className="flex flex-row items-center -mx-2">
        <div
          className="flex flex-row items-center justify-center rounded-full shadow mx-2 w-8 h-8 hover:shadow-md focus:outline-none transition duration-150"
          onClick={() => {
            this.setState({
              ascending: (this.state.ascending + 1) % 4,
            });
            this.props.sortResponse();
          }}
          style={{ background: "#fff" }}
        >
          <FontAwesomeIcon
            icon={this.props.icons[this.state.ascending]}
            className="text-blue-800"
            style={{ fontSize: "20px" }}
          />
        </div>
        <div className="text-xs invisible md:visible mx-2 w-32 italic text-gray-500">
          {this.props.sortedBy[this.state.ascending]}
        </div>
      </div>

    );
  }
}
