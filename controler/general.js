const path = require("path");
const axios = require('axios');
const {sendLog, LEVEL} = require("../APXC_LOG_ENGINE/log");

exports.getGen = (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
};

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


exports.Process = async (req, res) => {
    const group = 'PROCESS'


    await InitalLog(req.body, group);
    let idProduct = req.body.id;

    if(!idProduct) {
        await ErrorLog(req.body, "The Request not have a ID!", group);
        res.status(400).json({
            status : "Error",
        });
    }
    else {
        axios.get(`https://fakestoreapi.com/products/${idProduct}`).then(async ( axres) => {
            let obj = axres.data;
            if(obj.description.length > 40) {
                await WarnLog(obj, `Attention the Product ${idProduct} have a desc over size!`, group);
            }
            await infoLog(obj, `this product have Price ${obj.price}`, group);
            await CompleteLog(obj, group);
            res.status(200).json({
                status : "OK",
                product : obj,
            });

        }).catch(async (err) => {
            await ErrorLog(err, "Error Request");
            res.status(400).json({
                status : "Error",
            });
        })
    }

}

