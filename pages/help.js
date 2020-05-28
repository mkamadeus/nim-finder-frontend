import React from "react";
import Link from "next/link";
import HeadComponent from "../components/HeadComponent";
import InlineMarkdownComponent from "../components/InlineMarkdownComponent";
import axios from "axios";

export default class HelpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      facultiesLoaded: false,
      majorsLoaded: false,
    };
  }

  componentDidMount() {
    this.getFaculties();
    this.getMajors();
  }

  render() {
    const facultiesList = () => {
      console.log(this.facultyMap);
      return Object.keys(this.facultyMap).map((value) => {
        return (
          <li className="list-disc my-1" key={value.toString() + "_fakultas"}>
            <InlineMarkdownComponent>{value}</InlineMarkdownComponent> -{" "}
            {this.facultyMap[value]}.
          </li>
        );
      });
    };

    const majorsList = () => {
      console.log(this.majorMap);
      return Object.keys(this.majorMap).map((value) => {
        return (
          <li className="list-disc my-1" key={value.toString() + "_jurusan"}>
            <InlineMarkdownComponent>{value}</InlineMarkdownComponent> -{" "}
            {this.majorMap[value]}.
          </li>
        );
      });
    };

    return (
      <div>
        <HeadComponent />
        <div className="container mx-auto p-6">
          <div className="flex flex-col my-3 px-3">
            <h1 className="font-bold text-blue-800 text-xl md:text-2xl lg:text-3xl">
              Geprek Help!
            </h1>
            <h2 className="font-light italic text-gray-500 text-sm">
              Sedikit bantuan dari sobat geprek.
            </h2>
          </div>
          <div className="flex flex-col my-3 text-gray-700 text-sm md:text-base lg:w-1/2 xl:w-2/3 px-3">
            <div className="my-2">
              Halo! Jika Anda berada di page ini, Anda tentu ingin mengetahui
              lebih banyak terkait situs ini.
            </div>
            <div className="my-2">
              Situs ini dibuat dengan tujuan untuk mencari nama dan NIM bagi
              mahasiswa ITB. Tenang saja, situs ini tidak mengumbar data pribadi
              dari mahasiswa ITB kok :-)
            </div>
            <div className="my-2">
              Untuk mencari mahasiswa ITB yang dimaksud, bisa dilakukan
              pencarian terhadap nama, NIM, fakultas, atau jurusan yang
              bersangkutan.
            </div>
            <div className="my-2">
              Selain itu, untuk keperluan administrasi kalian, sedang
              dikembangkan <i>feature</i> untuk konversi hasil pencarian ke
              bentuk Google Sheets.
            </div>
            <div className="my-2">
              Berikut ini penjelasan terkait beberapa mode pencarian yang bisa
              dilakukan.
              <ul className="pl-6 my-1">
                <li className="list-disc my-1">
                  <span className="font-bold">Pencarian lewat nama</span>
                  <br /> Cukup dengan mengetik nama yang dicari.
                </li>
                <li className="list-disc my-1">
                  <span className="font-bold">Pencarian lewat NIM</span>
                  <br /> Cukup dengan mengetik NIM fakultas/jurusan yang dicari.
                </li>
                <li className="list-disc my-1">
                  <span className="font-bold">Pencarian lewat fakultas</span>
                  <br /> Dilakukan dengan mengetik dalam format{" "}
                  <InlineMarkdownComponent>
                    [inisial fakultas][tahun]
                  </InlineMarkdownComponent>
                  , contohnya
                  <InlineMarkdownComponent>
                    stei18
                  </InlineMarkdownComponent>
                  .
                </li>
                <li className="list-disc my-1">
                  <span className="font-bold">Pencarian lewat jurusan</span>
                  <br /> Dilakukan dengan mengetik dalam format{" "}
                  <InlineMarkdownComponent>
                    [inisial jurusan][tahun]
                  </InlineMarkdownComponent>
                  , contohnya
                  <InlineMarkdownComponent>
                    mene18
                  </InlineMarkdownComponent>
                  .
                </li>
              </ul>
            </div>
            <div className="my-2">
              <div className="flex flex-col">
                <div>
                  Untuk daftar inisial fakultas lengkapnya sebagai berikut:
                </div>
                <div>
                  <ul className="pl-6 my-1">
                    {this.state.facultiesLoaded ? facultiesList() : null}
                  </ul>
                </div>
              </div>
              <div className="flex flex-col">
                <div>
                  Untuk daftar inisial jurusan lengkapnya sebagai berikut:
                </div>
                <div>
                  <ul className="pl-6 my-1">
                    {this.state.majorsLoaded ? majorsList() : null}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="underline text-blue-700 text-right md:text-left my-3">
            <Link href="/">Kembali ke laman utama</Link>
          </div>
        </div>
      </div>
    );
  }

  async getFaculties() {
    this.facultyMap = await axios.get(
      "http://localhost:3000/api/nimfinder/faculties"
    );
    this.facultyMap = this.facultyMap.data;
    this.setState({ facultiesLoaded: true });
  }

  async getMajors() {
    this.majorMap = await axios.get(
      "http://localhost:3000/api/nimfinder/majors"
    );
    this.majorMap = this.majorMap.data;
    this.setState({ majorsLoaded: true });
  }
}
