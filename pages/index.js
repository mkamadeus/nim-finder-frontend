import Link from "next/link";
import StudentComponent from "../components/StudentComponent.js";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import HeadComponent from "../components/HeadComponent.js";
import LoadMoreComponent from "../components/LoadMoreComponent.js";
import React from "react";
import axios from "axios";
import SortByComponent from "../components/SortByComponent.js";

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props);

    this.geprek = [
      "Ayam Geprek Freedom",
      "Krisbar Disitu",
      "Krisbar Gemesnya",
      "Ayam Geprek Bakso",
    ];

    this.state = {
      geprekIndex: Math.floor(Math.random() * this.geprek.length),
      query: "",
      sortedBy: 0,
      page: 0,
      currentCount: 0,
      responseCount: 0,
      response: [],
    };
  }

  render() {
    const statusMessage = () => {
      if (this.state.response.length !== 0) {
        return `Menunjukan ${this.state.response.length} dari ${this.state.responseCount} hasil.`;
      } else if (this.state.query.length <= 2) {
        return `Hasil pencarian akan muncul di sini.`;
      } else {
        return `Tidak ditemukan apa-apa, mungkin salah geprek.`;
      }
    };

    const studentList = () => {
      if (this.state.response.length !== 0) {
        return this.state.response.map((student, index) => {
          return (
            <div className="px-2" key={index}>
              <StudentComponent
                name={student["nama"]}
                jurusan={student["jurusan"] || student["fakultas"]}
                nimFakultas={student["nim_fakultas"]}
                nimJurusan={student["nim_jurusan"]}
              />
              <hr />
            </div>
          );
        });
      } else {
        return null;
      }
    };

    const showLoadMore = () => {
      if (
        this.state.query.length <= 2 ||
        this.state.currentCount >= this.state.responseCount
      ) {
        return null;
      } else {
        return (
          <LoadMoreComponent onClick={this.onLoadMore.bind(this)}>
            Geprekin lagi...
          </LoadMoreComponent>
        );
      }
    };

    return (
      <div className="">
        <HeadComponent />
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:items-center px-3 my-3 mb-5">
            <div className="flex items-center">
              <h1 className="font-bold text-blue-800 text-xl md:text-2xl lg:text-3xl">
                Geprek NIM Finder
              </h1>
              <div className="mx-2">
                <Link href="/help">
                  <HelpOutlineOutlinedIcon
                    fontSize="small"
                    className="text-gray-400 hover:text-gray-600"
                  />
                </Link>
              </div>
            </div>
            <h2 className="font-light italic text-gray-500 text-sm">
              Geprek-ed by {this.geprek[this.state.geprekIndex]}.
            </h2>
          </div>
          <div className="flex w-full my-3">
            <input
              type="text"
              placeholder="Masukkan kata pencarian..."
              className="rounded-full bg-gray-200 w-full p-2 px-4 border-2 border-transparent text-blue-800 font-semibold focus:text-black focus:border-solid focus:bg-white focus:border-blue-300 focus:shadow md:focus:shadow-md lg:focus:shadow-lg transition duration-300 ease-out focus:outline-none"
              onInput={this.queryHandler.bind(this)}
            />
          </div>
          <div className="flex justify-center text-xs text-gray-400 italic">
            {statusMessage()}
          </div>
          <div className="flex items-center justify-center">
            <div className="py-2 w-full md:w-2/3">{studentList()}</div>
          </div>
          <div className="flex justify-center py-4 w-full">
            <div className="w-full md:w-64">{showLoadMore()}</div>
          </div>
        </div>
        <div className="fixed" style={{ bottom: "15px", left: "15px" }}>
          <div className="flex flex-row py-2 -mx-2">
            <div className="px-2">
              <SortByComponent
                icons={[
                  require("@fortawesome/free-solid-svg-icons/faSortAlphaUp")
                    .faSortAlphaUp,
                  require("@fortawesome/free-solid-svg-icons/faSortAlphaDown")
                    .faSortAlphaDown,
                  require("@fortawesome/free-solid-svg-icons/faSortNumericUp")
                    .faSortNumericUp,
                  require("@fortawesome/free-solid-svg-icons/faSortNumericDown")
                    .faSortNumericDown,
                ]}
                sortResponse={this.onSortByClicked.bind(this)}
                sortedBy={[
                  "Sorted Alphabetically Ascending",
                  "Sorted Alphabetically Descending",
                  "Sorted Numerically Ascending",
                  "Sorted Numerically Descending",
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  async queryHandler(e) {
    await this.setState({ query: e.target.value });
    if (this.state.query.length > 2) {
      const response = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.prod_api
            : process.env.dev_api
        }api/nimfinder/?keyword=${this.state.query}`
      );
      this.setState({
        response: response.data.data,
        responseCount: response.data.count,
        currentCount: response.data.data.length,
      });
      this.sortResponse();
    } else {
      this.setState({ response: [], responseCount: 0, currentCount: 0 });
    }
    this.setState({ page: 0 });
  }

  async onLoadMore(e) {
    const response = await axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? process.env.prod_api
          : process.env.dev_api
      }api/nimfinder/?keyword=${this.state.query}&page=${(
        parseInt(this.state.page) + 1
      ).toString()}`
    );
    console.log(response);
    this.setState({
      response: this.state.response.concat(response.data.data),
      page: response.data.page,
      currentCount: this.state.currentCount + response.data.data.length,
    });
    await this.sortResponse();
  }

  sortingFunctions = [
    (x, y) => {
      return x.nama.localeCompare(y.nama);
    },
    (x, y) => {
      return y.nama.localeCompare(x.nama);
    },
    (x, y) => {
      return x.nim_fakultas.localeCompare(y.nim_fakultas);
    },
    (x, y) => {
      return y.nim_fakultas.localeCompare(x.nim_fakultas);
    },
  ];

  async onSortByClicked() {
    await this.setState({ sortedBy: (this.state.sortedBy + 1) % 4 });
    this.sortResponse();
  }

  async sortResponse() {
    const sortedResponse = [...this.state.response].sort(
      this.sortingFunctions[this.state.sortedBy]
    );
    await this.setState({ response: sortedResponse });
  }
}
