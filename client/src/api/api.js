let api_client;
(function(){

    let axios = require('axios');
    let baseUrl = "http://localhost:5000/api";

    api_client = {

        todoNotes: function(){
            return axios.get(`${baseUrl}/todo`).then(res => res.data.data);
        },

        doneNotes: function(){
            return axios.get(`${baseUrl}/done`).then(res => res.data.data);
        }

    }
})();

export default api_client;