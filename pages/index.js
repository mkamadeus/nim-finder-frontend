import Link from 'next/link'
import StudentComponent from '../components/StudentComponent.js'
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import HeadComponent from '../components/HeadComponent.js'
import React from 'react'
import axios from 'axios'

export default class IndexPage extends React.Component {
  constructor(props)
  {
    super(props)
    this.geprek = ['Ayam Geprek Freedom', 'Krisbar Disitu', 'Krisbar Gemesnya', 'Ayam Geprek Bakso']
    this.state = {
      geprekIndex: Math.floor(Math.random() * this.geprek.length),
      query: "",
      response: []
    }
  }
  
  componentDidMount()
  {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      gapi.load('client:auth2', () => {
        gapi.client.setApiKey(null)
        gapi.client.init({
          clientId: '922354667314-87s0oulmd0incnhekssf7h5fr9ucdo4u.apps.googleusercontent.com',
          apiKey: 'AIzaSyAdizAVRKgDYvSTVvFAm02jJcNPLmdNPFQ',
          discoveryDocs: 'https://sheets.googleapis.com/$discovery/rest?version=v4',
          scopes: 'https://www.googleapis.com/auth/spreadsheets.readonly'
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          // authorizeButton.onclick = handleAuthClick;
          // signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          // appendPre(JSON.stringify(error, null, 2));
        });
        this.setState({ gapiReady: true });
      });
    };

    document.body.appendChild(script);
  }

  render()
  {
    return (
      <div>
        <HeadComponent />
        <div className="container mx-auto p-6">
          <div className="flex flex-col md:items-center px-3 my-3 mb-5">
            <div className="flex items-center">
              <h1 className="font-bold text-blue-800 text-xl md:text-2xl lg:text-3xl">Geprek NIM Finder</h1>
              <div className="mx-2">
                <Link href="/help">
                  <HelpOutlineOutlinedIcon fontSize="small" className="text-gray-400 hover:text-gray-600" />
                </Link>
              </div>
            </div>
            <h2 className="font-light italic text-gray-500 text-sm">Geprek-ed by {this.geprek[this.state.geprekIndex]}.</h2>
          </div>
          <div className="flex w-full my-3">
            <input type="text" placeholder="Masukkan kata pencarian..." className="rounded-full bg-gray-200 w-full p-2 px-4 border-2 border-transparent text-blue-800 font-semibold focus:text-black focus:border-solid focus:bg-white focus:border-blue-300 focus:shadow md:focus:shadow-md lg:focus:shadow-lg transition duration-300 ease-out" onInput={this.queryHandler.bind(this)}/>
            {this.state.gapiReady?<button onClick={()=>gapi.auth2.getAuthInstance().signIn()}>help</button>:null}
          </div>
          <div>
            {
            this.state.response.length !== 0 ?
              <div className="flex justify-center text-xs text-gray-400 italic">
                Ditemukan {this.state.response.length} hasil.
              </div>
            :
              null
            }
          </div>
          <div className="py-2">
            {
              this.state.response.length !== 0 ?
              this.state.response.map((student, index) => {
                return (
                  <div className="px-2">
                    <StudentComponent
                      key={index}
                      name={student['nama']}
                      jurusan={student['jurusan'] || student['fakultas']}
                      nimFakultas={student['nim_fakultas']}
                      nimJurusan={student['nim_jurusan']}
                    />
                    <hr />
                  </div>
                )
              })
              :
              (this.state.query.length <= 2 ?
              <div className="flex justify-center text-gray-400 text-xs">
                <div>
                  Hasil pencarian akan muncul di sini.
                </div>
              </div>
              : 
              <div className="flex justify-center text-gray-400 text-xs">
                <div>
                  Tidak ditemukan apa-apa, mungkin salah geprek.
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    )
  }

  async queryHandler(e) {
    await this.setState({query: e.target.value})
    console.log(this.state.query)
    console.log(this.state.query.length)
    if(this.state.query.length > 2)
    {
      const response = await axios.get('http://localhost:3000/api/nimfinder?keyword=' + this.state.query)
      this.setState({response : response.data})
    }
    else
    {
      this.setState({response: []})
    }
  }
}
