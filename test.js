// import axios from 'axios'
const axios = require('axios')
const url = 'https://7dd2f8e8-6102-492c-a522-b5a7db2ab00a.lafyun.com/file/public/6579877e-34e4-482d-b0a3-8fb58a0cbfc0.mp3'
const r = await axios.get(url, {responseType: 'arraybuffer'})
console.log(r);