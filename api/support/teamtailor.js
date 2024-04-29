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

    getHeaders() {
        return {
            Authorization: `Token token=${this.token}`,
            "X-Api-Version": this.apiVersion,
            "Content-Type": "application/vnd.api+json"
        }
    }

    async executeRequest(method, requestURL, body = '') {
        try {
            return await axios({
                method: method,
                url: requestURL,
                headers: await this.getHeaders(),
                data: body
            })
        } catch (error) {
            return {
                status: error.response.status,
                data: error.response.data
            }
        }
    }

    async listJobs() {
        const requestURL = `${this.baseAPI}/jobs`;
        return await this.executeRequest('GET', requestURL);
    }

    async changeJobTitle(jobId, jobTitle) {
        const requestURL = `${this.baseAPI}/jobs/${jobId}`;
        const body = {
            data: {
                id: `${jobId}`,
                attributes: {
                    title: `${jobTitle} (TEST)`,
                },
                type: "jobs"
            }
        }
        return await this.executeRequest('PATCH', requestURL, body);
    }

    async getJob(jobId) {
        const requestURL = `${this.baseAPI}/jobs/${jobId}`;
        return await this.executeRequest('GET', requestURL)
    }
}

module.exports = Teamtailor;