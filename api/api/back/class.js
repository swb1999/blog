var query = require("../../config/db_connect")
var express = require("express")
var router = express.Router()
var generateUUID = require("../common/Unique") //生成唯一标识
var creatTime = require("../common/creatTime") //创建时间
const moment = require('moment'); //格式化数据库时间

// 用户登录接口
router.post("/", function(req, res, next) {
        var sql = "select * from user"
        query(sql, function(err, rows, fields) {
            let state = false;
            let user = false;
            let userI = null
            rows.forEach(function(i) {
                if (req.body.loginname === i.name) {
                    user = true
                    state = req.body.loginpw === i.password
                    userI = i
                }
            });
            // 判断用户是否存在
            if (user) {
                // 判断用户名密码是否正确
                if (state) {
                    res.send({
                        code: "1001",
                        userid: userI.id,
                        msg: "登录成功"
                    })
                } else {
                    res.send({
                        code: "1002",
                        userid: null,
                        msg: "登录失败"
                    })
                }
            } else {
                res.send({
                    code: "1003",
                    userid: null,
                    msg: "用户名不存在"
                })
            }


        })
    })
    // 一级分类添加
    // 检测一级二级分类中英文标识是否已经存在方法
var testsqlFn = function(req, res, next, sql) {
        return new Promise(function(resolve, reject) {
            query(sql, function(err, rows, fields) {
                console.log(rows)
                if (rows.length > 0) {
                    reject("err")
                } else {
                    resolve("ok")
                }
            })
        })
    }
    // sql执行成功与否的检测
var sqlStateFn = function(req, res, next, sql) {
        return new Promise(function(resolve, reject) {
            query(sql, function(err, rows, fields) {
                console.log(err)
                if (err) {
                    reject("err")
                } else {
                    resolve("ok")
                }
            })
        })
    }
    // 添加一级分类
router.post("/add_class_one", function(req, res, next) {
    var oneid = generateUUID()
        //    一级分类英文标识sql查询
    var sqltest1 = `select id from one_class where enname='${req.body.enname_one}'`
        // 二级分类英文标识sql查询
    var sqltest2 = `select id,article_num from two_class where enname='${req.body.enname_two}'`
        // 一级分类插入数据sql
    var sqlinsert1 = `insert into one_class(id,enname,cnname,time) values('${oneid}','${req.body.enname_one}','${req.body.cnname_one}','${creatTime()}')`
        // 二级分类插入数据sql
    var sqlinsert2 = `insert into two_class(id,parent_id,enname,cnname,article_num,time) values('${generateUUID()}','${oneid}','${req.body.enname_two}','${req.body.cnname_two}',0,'${creatTime()}')`
        // 创建文章表
    var createTable = `CREATE TABLE ${req.body.enname_one} (LIST INT(11) UNIQUE NOT NULL AUTO_INCREMENT, id VARCHAR(255) UNIQUE PRIMARY KEY, oneId VARCHAR(255), twoId VARCHAR(255), article_name VARCHAR(255), editer VARCHAR(255), content LONGTEXT, TIME DATETIME, visitors INT, daodu VARCHAR(255), imgsrc VARCHAR(255), recommend TINYINT, art_show TINYINT);`
    testsqlFn(req, res, next, sqltest1).then(function(data) {
        return sqlStateFn(req, res, next, sqlinsert1)
    }, function(err) {

        res.send({
            code: "1010",
            msg: "分类一英文标识冲突"
        })
    }).then(function(data) {

        return testsqlFn(req, res, next, sqltest2)

    }, function(err) {
        res.send({
            code: "1011",
            msg: "数据库操作失败"
        })
    }).then(function() {
        return sqlStateFn(req, res, next, sqlinsert2)
    }, function(err) {
        res.send({
            code: "1012",
            msg: "分类二英文标识冲突"
        })
    }).then(function(data) {
        query(createTable, function(err, rows, fields) {
            try {
                if (err) {
                    res.send({
                        code: "1015",
                        msg: "创建表失败"
                    })
                } else {
                    res.send({
                        code: "1014",
                        msg: "数据插入成功"
                    })
                }
            } catch (err) {
                console.log(err)
            }

        })
    }, function(err) {
        res.send({
            code: "1013",
            msg: "数据库操作失败"
        })
    }).catch(function(err) {
        console.log(err)
    })
})


//一级类名的查询//
router.get("/select_one_class", function(req, res, next) {
    var sql = "select * from one_class"
    query(sql, function(err, rows, fields) {
        try {
            rows.map(function(i) {
                return i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
            });
            if (err) {
                res.send({
                    code: "1022",
                    data: null,
                    msg: "查询失败"
                })
            } else {
                res.send({
                    code: "1021",
                    data: rows,
                    msg: "数据查询成功"
                })
            }
        } catch (err) {
            console.log(err)
        }

    })

})

//二级类名的添加
router.post("/add_two_class", function(req, res, next) {
    // 二级分类英文标识sql查询
    var sqltest2 = `select id,article_num from two_class where enname='${req.body.enname_two}'`
        // 二级分类插入数据sql
    var sqlinsert2 = `insert into two_class(id,parent_id,enname,cnname,article_num,time) values('${generateUUID()}','${req.body.oneId}','${req.body.enname_two}','${req.body.cnname_two}',0,'${creatTime()}')`
    testsqlFn(req, res, next, sqltest2).then(function(data) {
        return sqlStateFn(req, res, next, sqlinsert2)
    }, function(err) {
        res.send({
            code: "1030",
            msg: "分类二英文标识冲突"
        })
    }).then(function(data) {
        res.send({
            code: "1032",
            msg: "数据插入成功"
        })
    }, function(err) {
        res.send({
            code: "1031",
            msg: "数据库操作失败"
        })
    }).catch(function(err) {
        console.log(err)
    })
})

// 查询列表公用sql
var selectfn = function(req, res, next, sql) {
    return new Promise(function(resolve, reject) {
        query(sql, function(err, rows, fields) {
            if (err) {
                reject("err")
            } else {
                resolve(rows)
            }
        })
    })
}

// 类名管理列表数据读取
router.get("/class_list", function(req, res, next) {
    var sqlone = "select * from one_class"
    var sqltwo = "select * from two_class"
    var onedata = null
    selectfn(req, res, next, sqlone).then(function(data) {
        onedata = data
        return selectfn(req, res, next, sqltwo)
    }, function(err) {
        res.send({
            code: "1041",
            data: null,
            msg: "查询失败"
        })
    }).then(function(data) {
        let resdata = []
        onedata.forEach(function(i) {
            let everydata = {
                onedata: i,
                twodata: []
            }
            data.forEach(function(j) {
                if (i.id == j.parent_id) {
                    everydata.twodata.push(j)
                }
            })

            resdata.push(everydata)
        })
        console.log(resdata)
        res.send({
            code: "1043",
            data: resdata,
            msg: "查询成功"
        })
    }, function(err) {
        res.send({
            code: "1042",
            data: null,
            msg: "查询失败"
        })
    }).catch(function(err) {
        console.log(err)
    })


})


// 修改一级分类
router.post("/amend_class_one", function(req, res, next) {

    //    一级分类英文标识sql查询
    var sqltest1 = `select id from one_class where enname='${req.body.enname_one}'`
        // 修改一级分类
    var updatesql = `update one_class set enname='${req.body.enname_one}',cnname='${req.body.cnname_one}',time='${creatTime()}' where enname='${req.body.oldenname_one}'`

    // 修改文章表
    var amendTable = `alter table ${req.body.oldenname_one} rename ${req.body.enname_one}`
    console.log(amendTable)
    testsqlFn(req, res, next, sqltest1).then(function(data) {
        // 检测更新有没有成功
        return sqlStateFn(req, res, next, updatesql)
    }, function(err) {
        res.send({
            code: "1050",
            msg: "分类一英文标识冲突"
        })
    }).then(function(data) {

        query(amendTable, function(err, rows, fields) {
            try {
                if (err) {
                    res.send({
                        code: "1051",
                        msg: "修改表失败"
                    })
                } else {
                    res.send({
                        code: "1052",
                        msg: "修改表成功"
                    })
                }
            } catch (err) {
                console.log(err)
            }
        })


    }, function(err) {
        res.send({
            code: "1053",
            msg: "修改表失败"
        })
    }).catch(function(err) {
        console.log(err)
    })
})

// 修改二级分类
router.post("/amend_class_two", function(req, res, next) {
    //    一级分类英文标识sql查询
    var sqltest1 = `select id from two_class where enname='${req.body.enname_two}'`
        // 修改一级分类
    var updatesql = `update two_class set enname='${req.body.enname_two}',cnname='${req.body.cnname_two}',time='${creatTime()}' where enname='${req.body.oldenname_two}'`
    testsqlFn(req, res, next, sqltest1).then(function(data) {
        // 检测更新有没有成功
        return sqlStateFn(req, res, next, updatesql)
    }, function(err) {
        res.send({
            code: "1060",
            msg: "分类二英文标识冲突"
        })
    }).then(function(data) {
        res.send({
            code: "1062",
            msg: "修改表成功"
        })

    }, function(err) {
        res.send({
            code: "1063",
            msg: "修改表失败"
        })
    }).catch(function(err) {
        console.log(err)
    })
})

//一级类名删除
router.post("/delete_one", function(req, res, next) {

    var sqlone = `delete from one_class where id='${req.body.id}'`

    var sqltwo = `delete from two_class where parent_id='${req.body.id}'`
    var sqlarticle = `DROP TABLE ${req.body.enname_one}`

    Promise.all([sqlStateFn(req, res, next, sqlone), sqlStateFn(req, res, next, sqltwo), sqlStateFn(req, res, next, sqlarticle)]).then(function() {
        res.send({
            code: "1071",
            msg: "删除数据成功"
        })
    }, function(err) {
        res.send({
            code: "1070",
            msg: "删除数据失败"
        })
    }).catch(function(err) {
        console.log(err)
    })
})

var testsqlstate = function(req, res, next, sql) {
        return new Promise(function(resolve, reject) {
            query(sql, function(err, rows, fields) {
                console.log(rows == undefined)
                if (rows > 0) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            })
        })
    }
    //二级类名删除
router.post("/delete_two", function(req, res, next) {


    // 在二级分类中删除当前分类
    var sqltwo = `delete from two_class where id='${req.body.twoId}'`
        // 在二级分类中查询是否还有当前一级分类中的数据
    var selecttwo = `select * from two_class where parent_id='${req.body.oneId}'`
        // console.log(selecttwo)
        // 如果在二级分类中还有当前一级分类的数据，则在文章表中删除相应二级分类的数据
    var sqlarticle = `delete from ${req.body.enname_one}  where twoId='${req.body.twoId}'`


    // 如果在二级分类中无当前一级分类的数据，则在删除当前一级分类，以及删除当前一级分类的表
    var sqlone = `delete from one_class where id='${req.body.oneId}'`
    var sqldrop = `DROP TABLE ${req.body.enname_one}`

    sqlStateFn(req, res, next, sqltwo).then(function(data) {
        return testsqlFn(req, res, next, selecttwo)
    }, function(err) {
        res.send({
            code: "1072",
            msg: "删除数据失败"
        })
    }).then(function(num) {

        Promise.all([sqlStateFn(req, res, next, sqlone), sqlStateFn(req, res, next, sqldrop)]).then(function() {
            res.send({
                code: "1071",
                msg: "删除数据成功"
            })
        }, function(err) {
            res.send({
                code: "1073",
                msg: "删除数据失败"
            })
        })

    }, function(err) {
        // 数据条数大于0
        sqlStateFn(req, res, next, sqlarticle).then(function(data) {
            res.send({
                code: "1071",
                msg: "删除数据成功"
            })
        }, function(err) {
            res.send({
                code: "1070",
                msg: "删除数据失败"
            })
        })
    }).catch(function(err) {
        console.log(err)
    })



})





// 测试接口
router.get("/aa", function(req, res, next) {
    res.send("hahah")
})

module.exports = router