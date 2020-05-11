import React from 'react';
import Head from 'next/head';

export default class HeadComponent extends React.Component {

  render()
  {
    return (
      <Head>
        <title>Geprek NIM Finder</title>
        <meta name="title" content="Geprek NIM Finder" />
        <meta name="description" content="Geprek NIM Finder untuk mahasiswa-mahasiswa ITB disertai dengan beberapa kemampuan lainnya." />
        <meta name="keywords" content="geprek, nim, finder, nim finder, geprek nim" />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="mkamadeus" />
      </Head>
    )
  }
}