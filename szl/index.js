const express = require('express');
var mysql = require('mysql');
const app = express();
const data = [
    { id: '0001', name: 'RFID' },
    { id: '0002', name: 'WEB' },
    { id: '0003', name: 'JAVA' }
];
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200); /让options请求快速返回/
    }
    else {
        next();
    }
});

app.get('/courses', function (req, res) {
    res.send(JSON.stringify(data));
});

app.get('/user', function (req, res) {


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });

    connection.connect();

    var sql = "SELECT * FROM stu WHERE name='" + req.query.name + "'";
    //查询
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send('查询失败');
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        const users = [];
        for (let item of result) {
            users.push({
                id: item.id,
                username: item.username,
                password: item.password
            })
        }
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
    //res.send('查询完成！');
});

app.post('/user', function (req, res) {
    console.log(JSON.stringify(req.query));
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });

    connection.connect();

    var sql = "select * from stuL where count='" + req.query.name + "'";
    查询
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: 'Not exactly account'
            }));
            return;
        }

        console.log('--------------------------SELECT----------------------------');
        console.log(result);
        const users = [];
        for (let item of result) {
            if (item.username == req.query.name && item.userpassword == req.query.password) {
                res.send(JSON.stringify({
                    succ: true,
                    msg: req.query.name
                }));
                users.push({
                    id: item.id,
                    username: item.username,
                    password: item.password
                })
            } else {
                res.send(JSON.stringify({
                    succ: false,
                    msg: '用户名或密码错误'
                }));
            }
        }
        console.log('------------------------------------------------------------\n\n');
    });

    connection.end();
    res.send('查询完成！');


    if (req.query.name !== 'abc' || req.query.password !== '123') {
        res.send(JSON.stringify({
            succ: false,
            msg: 'Login Fail'
        }));
    } else {
        res.send(JSON.stringify({
            succ: true,
            msg: 'Login Success'
        }));
    }
});
//app.post('/', function (req, res) { res.send('Got␣a␣POST␣request') });


app.put('/led/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });

    connection.connect();
    let sql = "UPDATE device SET status=" + status + " WHERE id=\'" + id + "\'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            res.send('修改失败');
            return;
        }
        let sql2 = "select*from device where id=\'" + id + "\'";
        connection.query(sql2, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR]-', err.message);
                res.send(JSON.stringify({
                    succ: false,
                    msg: '查询失败!'
                }));
                return;
            }
            const obj = {
                id: id,
                status: result[0].customer_status
            }
            res.send(JSON.stringify(obj));
        });

        console.log(sql);
        connection.end();

    });
});

app.get('/led/:id', function (req, res) {
    const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });
    connection.connect();
    let sql = "select*from device where id='" + id + "'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.send(JSON.stringify({
                succ: false,
                msg: '查询失败!'
            }));
            return;
        }
        const resp = {
            id: id,
            status: result[0].status,
            customer_status: result[0].customer_status
        }

        res.send(JSON.stringify(resp));
        connection.end();
    });
});

app.post('/led/:id/:status', function (req, res) {
    const id = req.params["id"];
    const status = req.params["status"];
    console.log(status);
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });
    connection.connect();
    let sql = "UPDATE device SET customer_status=" + status + " WHERE id=\'" + id + "\'";
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[UPDATE ERROR]-', err.message);
            res.send('查询失败');
            res.send(JSON.stringify({
                succ: false,
                msg: 'faild'
            }));
            return;
        }
        res.send(JSON.stringify({
            succ: true,
            msg: 'success'
        }));
        // let sql2 = "select status from device where id=" + id + ";"
        // connection.query(sql2, function (err, result) {
        //     if (err) {
        //         res.send(JSON.stringify({
        //             succ: false,
        //             msg: '失败'
        //         }));
        //         return;
        //     }
        // });
    });

});

app.post('/led/:id', function (req, res) {
    const id = req.params["id"];
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });
    connection.connect();
    let sql = "INSERT INTO device VALUES('" + id + "',0,0);";
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(JSON.stringify({
                succ: false,
                msg: '插入失败'
            }));
            return;
        }
        res.send(JSON.stringify({
            succ: true,
            msg: '插入成功'
        }));
        // let sql2 = "select*from device;"
        // connection.query(sql2, function (err, result) {
        //     if (err) {
        //         console.log('失败');
        //         return;
        //     }
        //     res.send(JSON.stringify(result));
        // });
    });
    connection.end();
});

app.get('/led', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        port: '3306',
        database: 'web'
    });
    connection.connect();
    var sql = "select*from device;"
    connection.query(sql, function (err, result) {
        if (err) {
            res.send(JSON.stringify({
                succ: false,
                msg: '失败'
            }));
            return;
        }
        res.send(JSON.stringify(result));
    });
});
app.use(express.static('dist'));
app.listen(3000, () => console.log('Example app listening on port 3000!'));