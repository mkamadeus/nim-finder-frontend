import React from 'react';
import Link from 'next/link';
import HeadComponent from '../../components/HeadComponent';

export default class HelpPage extends React.Component {
  render()
  {
    return(
      <div>
        <HeadComponent/>
        <div className="container mx-auto p-6">
          <div className="flex flex-col my-3 px-3">
              <h1 className="font-bold text-blue-800 text-xl md:text-2xl lg:text-3xl">Geprek Help!</h1>
              <h2 className="font-light italic text-gray-500 text-sm">Sedikit bantuan dari sobat geprek.</h2>
          </div>
          <div className="flex flex-col my-3 text-gray-700 text-sm md:text-base lg:w-1/2 xl:w-1/3 px-3 text-justify">
            <div className="my-2">
              Halo! Jika Anda berada di page ini, Anda tentu ingin mengetahui lebih banyak terkait situs ini.
            </div>
            <div className="my-2">
              Situs ini dibuat dengan tujuan untuk mencari nama dan NIM bagi mahasiswa ITB. Tenang saja, situs ini tidak mengumbar data pribadi dari mahasiswa ITB kok :-)
            </div>
            <div className="my-2">
              Untuk mencari mahasiswa ITB yang dimaksud, bisa dilakukan pencarian terhadap nama, NIM, fakultas, atau jurusan yang bersangkutan.
            </div>
            <div className="my-2">
              Selain itu, untuk keperluan administrasi kalian, sedang dikembangkan <i>feature</i> untuk konversi hasil pencarian ke bentuk Google Sheets.
            </div>
          </div>
          <div className="underline text-blue-700 text-right md:text-left my-3">
            <Link href="/">
              Kembali ke laman utama
            </Link>
          </div>
        </div>
      </div>
    )
  }
}