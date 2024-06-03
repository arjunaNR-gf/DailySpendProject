import axios from "axios";
const ClientApi =  axios.create({
      baseURL: 'https://192.168.0.106/',
      headers: {
        'Accept': 'application/json',
        //'Authorization': 'token <your-token-here>
      }
    });



export default ClientApi;