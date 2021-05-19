
import Axios from 'axios'

const API_KEY = "AIzaSyD_5CI1UgNAwPDn0wtIOOmj9Xmw8TOrggU";  


const Location = () => {
    const on = () => {
        Axios.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAFmIT_O5B5FZTEKvp8A4C74q1LL15S-6s')
    .then((res)=>{
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })
    }
    
        
    // }
    return (
        <div >
          <button onClick={on}>GET</button>
        </div>
    
      )
}

export default Location;
