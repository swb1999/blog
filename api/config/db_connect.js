var config = require("./db_config")
var mysql = require("mysql")

var pool = mysql.createPool(config.dev_db)

var query = function(sql, calback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log("数据库连接失败")
            calback(err, null, null)
        } else {
            connection.query(sql, function(qerr, rows, fields) {
                console.log("数据库连接成功")
                connection.release()
                calback(qerr, rows, fields)
            })
        }

    })
}

module.exports = query