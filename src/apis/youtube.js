import axios from 'axios';

const KEY = 'AIzaSyCfp-GM00zS4c2THe7dtaK03cVJTE4MiVQ';

export default axios.create({
  baseURL: 'https://www.googleapis.com/youtube/v3',
  params: {
    part: 'snippet',
    maxResults: 20,
    key: KEY,
    type: "video"
  },
});
