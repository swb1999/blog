var query = require("../../config/db_connect")
var express = require("express")
var router = express.Router()
var generateUUID = require("../common/Unique")
var creatTime = require("../common/creatTime")
const moment = require('moment'); //数据库时间转js时间格式

// 接口文档添加接口
router.post("/", function(req, res, next) {
    var sql = `insert into apilist(id,title,url,type,sendparams,getparams,backorfont,time) 
    values('${generateUUID()}','${req.body.title}','${req.body.url}','${req.body.type}','${req.body.sendparams}','${req.body.getparams}','${req.body.backorfont}','${creatTime()}')`
    console.log(sql)
    query(sql, function(err, rows, fields) {
        if (err) {
            res.send({
                code: "2001",
                msg: "数据插入失败"
            })
        } else {
            res.send({
                code: "2000",
                msg: "数据插入成功"
            })
        }

    })
})

// 接口查询
router.get("/list", function(req, res, next) {
        var sql = `select * from apilist where backorfont='${req.query.type}' order by time desc`
        console.log(sql)
        query(sql, function(err, rows, fields) {
            if (err) {
                res.send({
                    code: "2011",
                    msg: "数据查询失败"
                })
            } else {
                rows.map(function(i) {
                    return i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
                });
                res.send({
                    code: "2010",
                    msg: "数据查询成功",
                    data: rows
                })
            }

        })
    })
    // 接口文档修改接口
router.post("/amend", function(req, res, next) {
        var sql = `update apilist set title='${req.body.title}',url='${req.body.url}',type='${req.body.type}',sendparams='${req.body.sendparams}',getparams='${req.body.getparams}',backorfont='${req.body.backorfont}',time='${creatTime()}' where id='${req.body.id}'`
        query(sql, function(err, rows, fields) {
            if (err) {
                res.send({
                    code: "2021",
                    msg: "数据插入失败"
                })
            } else {
                res.send({
                    code: "2022",
                    msg: "数据插入成功"
                })
            }

        })
    })
    // 接口文档删除接口
router.post("/delete", function(req, res, next) {
    var sql = `delete from apilist where id='${req.body.id}'`
    console.log(req.body.id)
    query(sql, function(err, rows, fields) {
        if (err) {
            res.send({
                code: "2031",
                msg: "删除数据失败"
            })
        } else {
            res.send({
                code: "2032",
                msg: "删除数据成功"
            })
        }

    })
})

module.exports = router;