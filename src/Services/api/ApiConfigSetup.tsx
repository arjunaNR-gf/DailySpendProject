import axios from "axios";
const ClientApi =  axios.create({
      baseURL: 'http://DESKTOP-IS87TE0:7062/',
      headers: {
        'Accept': 'application/json',
        //'Authorization': 'token <your-token-here>
      }
    });



export default ClientApi;