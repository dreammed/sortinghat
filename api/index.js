const express = require('express')
const app = express()
const cors = require('cors')
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

const axios = require('axios').default;

router.get('/', async (req, res) => {
    const name = await callApi()
    res.send(name)
})

async function callApi(){ 
    try {
        const apiData = await axios.get('https://api.namefake.com/')
        // console.log('api',apiData.data.name);
        return apiData.data.name;
    } catch (error) {
        console.log(error);
        return error;
    }
}

app.use(router)
module.exports = {
    path: '/api',
    handler: app
}