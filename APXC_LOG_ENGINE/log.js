const axios = require('axios');


const TOKEN = 'YOUR_TOKEN'; // Modify THIS!
const URL_LOG = 'https://log.apserial.it/log/'
const ORIGIN = 'DEMO NODEJS';

const LEVEL = {
    INFO : 'INFO',
    ERROR : "ERROR",
    WARNING : "WARNING",
    COMPLETE : "COMPLETE",
    INIT : "INIT"
}

async function sendLog(level, message, action, object, group){
    let data = {
        "level": LEVEL[level],
        "message": message,
        "content": JSON.stringify(object),
        "origin": ORIGIN,
        "action": action,
        "group": group
    };

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: URL_LOG,
        headers: {
            'Authorization': `Bearer ${TOKEN}` ,
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });
}

module.exports = {
    sendLog : sendLog,
    LEVEL : LEVEL
}


