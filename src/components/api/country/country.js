import axios from 'axios';

export async function getCountryList(){
    const URL = `https://visa.enverhq.com/api/countries`;
    return await axios(URL, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };

  export async function getCountryDetail(code,type){
    const URL = `http://private-fcdf84-prebookvisa.apiary-mock.com/api/countries/${code}?visaType=`+type;
    console.log(URL)
    return await axios(URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    })
      .then(res => res.data)
      .catch(error => {
        throw error;
      });
  };