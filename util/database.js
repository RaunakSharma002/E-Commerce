const mysql = require('mysql2');

const pool = mysql.createPool({ //----pool of connections for multiple query
    host: 'localhost', //---database ip address
    user: 'root', //--userr name 
    database: 'node-complete', //--schema name
    password: '07022002',
});

module.exports = pool.promise();
