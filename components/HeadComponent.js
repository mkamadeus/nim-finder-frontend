import React from 'react';
import Head from 'next/head';

export default class HeadComponent extends React.Component {

  render()
  {
    return (
      <Head>
        <title>Geprek NIM Finder</title>
        <link rel="icon" href="/favicon.ico"></link>
        <meta name="title" content="Geprek NIM Finder" />
        <meta name="description" content="Geprek NIM Finder untuk mahasiswa-mahasiswa ITB disertai dengan beberapa kemampuan lainnya." />
        <meta name="keywords" content="geprek, nim, finder, nim finder, geprek nim" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#2B6CB0" />
        <meta name="msapplication-navbutton-color" content="#2B6CB0" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#2B6CB0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="author" content="mkamadeus" />
      </Head>
    )
  }
}