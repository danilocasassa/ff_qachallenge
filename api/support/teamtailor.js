const axios = require('axios')
const path = require('path');
const dotenv = require('dotenv');
const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });

class Teamtailor {

    constructor() {
        this.baseAPI = process.env.BASE_URL;
        this.token = process.env.TOKEN;
        this.apiVersion = '20240404'
    }

    async listJobs() {
        const requestURL = `${this.baseAPI}/jobs`;
        const headers = {
            Authorization: `Token token=${this.token}`,
            "X-Api-Version": this.apiVersion
        }
        return await axios({
            method: 'GET',
            url: requestURL,
            headers: headers
        })
    }
}

module.exports = Teamtailor;