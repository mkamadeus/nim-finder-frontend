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
            className="flex flex-row items-center justify-center rounded-full shadow mx-2 h-8 w-8 hover:shadow-md focus:outline-none"
            // style={{ width: "50px", height: "50px" }}
            onClick={() => {
              this.setState({ showMenu: !this.state.showMenu });
            }}
            style={{ background: "#fff" }}
          >
            <FontAwesomeIcon
              // preserveAspectRatio="xMidyMid meet"
              // viewBox="0 0 50 50"
              icon={this.props.icon}
              className="text-blue-800"
              // size="1x"
              width="15"
              height="15"
              // style={{ fontSize: "8px" }}
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
