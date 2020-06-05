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
      loading: false,
    };

    this.inputTimer = null;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.scrollListener);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.scrollListener);
  }

  scrollListener = () => {
    const windowScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = windowScroll / height;
    if (scrolled === 1) {
      this.onLoadMore();
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query.length <= 2 && this.state.loading) {
      this.setState({ loading: false });
    }
    if (prevState.query !== this.state.query) {
      this.queryDelay();
    }
  }

  async queryDelay() {
    clearTimeout(this.inputTimer);
    await this.setState({ loading: true });
    this.inputTimer = setTimeout(async () => {
      if (this.state.query.length > 2) {
        const response = await axios.get(
          `${
            process.env.NODE_ENV === "production"
              ? process.env.prod_api
              : process.env.dev_api
          }api/nimfinder/?keyword=${this.state.query}`
        );
        await this.setState({ loading: false });
        this.setState({
          response: response.data.data,
          responseCount: response.data.count,
          currentCount: response.data.data.length,
        });
      } else {
        this.setState({ response: [], responseCount: 0, currentCount: 0 });
      }
    }, 350);
  }

  render() {
    const statusMessage = () => {
      if (this.state.loading) {
        return `Loading...`;
      } else if (this.state.response.length !== 0) {
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

    return (
      <div className="">
        <HeadComponent />
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:items-center px-3 mt-3">
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
          <div
            className="sticky pt-5 pb-3"
            style={{
              top: "0px",
              background:
                "linear-gradient(180deg, rgba(255,255,255,1) 52%, rgba(255,255,255,0.8) 74%, rgba(255,255,255,0.7) 83%, rgba(255,255,255,0.2) 99%)",
            }}
          >
            <div className="flex w-full mb-3">
              <input
                type="text"
                placeholder="Masukkan kata pencarian..."
                className="rounded-full bg-gray-200 w-full p-2 px-4 border-2 border-transparent text-blue-800 font-semibold focus:text-black focus:border-solid focus:bg-white focus:border-blue-300 focus:shadow md:focus:shadow-md lg:focus:shadow-lg transition duration-300 ease-out focus:outline-none"
                onInput={this.queryHandler.bind(this)}
              />
            </div>
            <div className="flex justify-center text-xs text-gray-600 italic">
              {statusMessage()}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="py-2 w-full md:w-2/3">{studentList()}</div>
          </div>
        </div>
      </div>
    );
  }

  async queryHandler(e) {
    await this.setState({ query: e.target.value });
    this.setState({ page: 0 });
  }

  async onLoadMore(e) {
    if (this.state.currentCount < this.state.responseCount) {
      await this.setState({ loading: true });
      const response = await axios.get(
        `${
          process.env.NODE_ENV === "production"
            ? process.env.prod_api
            : process.env.dev_api
        }api/nimfinder/?keyword=${this.state.query}&page=${(
          parseInt(this.state.page) + 1
        ).toString()}`
      );
      await this.setState({ loading: false });
      this.setState({
        response: this.state.response.concat(response.data.data),
        page: response.data.page,
        currentCount: this.state.currentCount + response.data.data.length,
      });
    }
  }
}
