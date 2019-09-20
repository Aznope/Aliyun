const express = require('express');
const app = express();
const data = [
    { id: '0001', name: 'RFID' },
    { id: '0002', name: 'WEB' },
    { id: '0003', name: 'JAVA' }
];
app.get('/', (req, res) => res.send('hello world'));
app.get('/', (req, res) => res.send(JSON.stringify(data)));
app.post('/', function (req, res) { res.send('Got␣a␣POST␣request') });
app.use(express.static('dist'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));