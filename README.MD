# NODEJS APP DEMO - APXC Log Engine

this nodejs script it's a simple rest app engine for get a Product to integrate a [APXC Log Engine](https://log.apserial.it)



init a demo script

```bash
git clone https://github.com/APXc/apxc_log_engine_getstarted.git
```

```bash
cd apxc_log_engine_getstarted
npm install
```



for start go to a file on `/APXC_LOG_ENGINE/log.js` and modify a constant `TOKEN` with the value of your token create on portal 

```javascript

const TOKEN = 'YOUR_TOKEN'; // Modify THIS!
const URL_LOG = 'https://log.apserial.it/log/'
const ORIGIN = 'DEMO NODEJS';

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



```

then run the following command

```bash
npm start
```

Now you can try making an http request to the endpoint

```bash
curl --location 'http://localhost:3000/process' \
--header 'Content-Type: application/json' \
--data '{
    "id" : "1"
}'
```



for read a function of write log go to file `/controler/general.js`

```javascript

InitalLog = async (obj, group) => {
    await sendLog(LEVEL.INIT, "Intial Process", 'Send Request',obj, group);
}

ErrorLog  = async (obj, message, group) => {
    await sendLog(LEVEL.ERROR, `Error On Process - ${message}`, 'Send Request', obj, group);

}
WarnLog  = async (obj, message, group) => {
    await sendLog(LEVEL.WARNING,  `Warning On Process - ${message}`, 'Send Request', obj, group);
}

infoLog  = async (obj,  message, group) => {
    await sendLog(LEVEL.INFO, `Warning On Process - ${message}`, 'Send Request', obj, group);
}

CompleteLog  = async (obj, group) => {
    await sendLog(LEVEL.COMPLETE, "Completed On Process", 'Send Request', obj, group);
}

```

if you need support please write an e-mail to support@apserial.it


