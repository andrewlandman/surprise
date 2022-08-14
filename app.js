import express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as crypto from 'crypto';
import * as dns from 'dns';
import {publicIpv4} from 'public-ip';
//import {fileURLToPath} from 'url';
//import {dirname} from 'path';

//const __filename = fileURLToPath(import.meta.url);
//const __dirname = dirname(__filename);

const app = express();

// TODO: print out domain name before hash path
// get public ip address
//const ip = await publicIpv4();
//console.log(ip);

// get domain name
//const dnsPromises = dns.promises;
//const domain = await dnsPromises.reverse(ip);
//console.log(domain);

// get file list in current directory
const files = fs.readdirSync('.', {withFileTypes: true})
    .filter(item => !item.isDirectory())
    .map(item => item.name);

// create link routes
files.forEach(file => {
    const hash = crypto.createHash('sha256')
        .update(file)
        .digest('hex');

    console.log('/surprise/' + hash, file);

    app.get('/surprise/' + hash, (req, res) => {
        //res.sendFile(__dirname + '/' + file);
        //res.sendFile(file, {root: './'});
        res.download(file, file);
    });
});

// start server
const port = 8000;
app.listen(port, () => {
    console.log('Listening on port', port);
});
