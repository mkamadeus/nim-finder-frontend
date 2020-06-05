import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import onClickOutside from "react-onclickoutside";

export default onClickOutside(
  class SortByComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        showMenu: false,
        indexSelected: 0,
      };
    }

    handleClickOutside = (event) => {
      this.setState({ showMenu: false });
    };

    render() {
      return (
        <div className="flex flex-row items-center -mx-2 relative">
          <div
            className="flex flex-row items-center justify-center rounded-full shadow mx-2 p-2 w-8 h-8 hover:shadow-md focus:outline-none transition duration-150"
            onClick={() => {
              this.setState({ showMenu: !this.state.showMenu });
            }}
            style={{ background: "#fff" }}
          >
            <FontAwesomeIcon
              icon={this.props.icon}
              className="text-blue-800"
              style={{ fontSize: "15px" }}
            />
          </div>
          {this.state.showMenu ? (
            <div
              className="flex flex-col text-xs mx-2 w-32 italic text-gray-500 absolute left-0 z-10 border border-gray-300 rounded bg-white shadow"
              style={{ bottom: "120%" }}
            >
              {this.props.selection.map((value, index) => {
                return (
                  <React.Fragment key={value[0] + "_selection"}>
                    <div
                      className="flex flex-row justify-between p-2"
                      onClick={() => {
                        this.setState({ indexSelected: index });
                        this.props.onSelect(value[1]);
                      }}
                    >
                      <div>{value[0]}</div>
                      {this.state.indexSelected === index ? <div>✓</div> : null}
                    </div>
                    {index !== this.props.selection.length - 1 ? <hr /> : null}
                  </React.Fragment>
                );
              })}
            </div>
          ) : null}
        </div>
      );
    }
  }
);
