/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.7.16-log : Database - blog_sql
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`blog_sql` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `blog_sql`;

/*Table structure for table `apilist` */

DROP TABLE IF EXISTS `apilist`;

CREATE TABLE `apilist` (
  `id` varchar(200) NOT NULL,
  `title` varchar(1000) DEFAULT NULL,
  `url` varchar(1000) DEFAULT NULL,
  `type` varchar(200) DEFAULT NULL,
  `sendparams` longtext,
  `getparams` longtext,
  `backorfont` varchar(200) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `apilist` */

insert  into `apilist`(`id`,`title`,`url`,`type`,`sendparams`,`getparams`,`backorfont`,`time`) values ('M2NlOGMxNmEtYmMyMC00YTYxLTljYWQtNDUxZDI5NGI0YjFm','后台删除一级类名','/api/back_class/delete_one','post','{\n id:string  //一级类名的id\n enname_one：string    //一级类名的英文标识\n}','{\n    \"code\": \"1071\",//1071成功 ，1070失败\n    \"msg\": \"删除数据成功\"\n}','back','2017-09-03 17:57:35'),('MjE5ZGI5NzQtYzFmOS00ZmQyLWE5ZDQtM2JiY2FlZjYwYTdm','接口文档添加','/api/apilist/','post','title:sting  //接口标题\nurl:string  //接口地址\ntype：string //接口类型\nsendparams：string //发送的参数\ngetparams：string //响应参数\nbackorfont：string //前台或后台接口','{\n   code: \"2001\",  //2001失败、2000成功\n   msg: \"数据插入失败\"  //返回消息\n }','back','2017-09-03 11:37:24'),('MTU3MDA3MTctZjVjNi00MDAyLTlhMDktN2RhMzdjODQ0MTMw','二级类名的添加','/api/back_class/add_two_class','post','{\n  oneId:\"Y2Y2NWRhZDQtODJhMy00ODMwLTllODgtNjhkNGNmMTU3Y2U0\",  //所属一级分类id\n  enname_two:sring   //二级英文标识\n  cnname_two:sring   //二级名称\n}','{\n    \"code\": \"1032\",  //1030：英文标识冲突； 1031数据库错误 1032数据插入成功\n    \"msg\": \"数据插入成功\"\n}','back','2017-09-03 14:54:32'),('NDI0MmVjNGEtZjI4ZC00N2U3LWIyMzItMjBmZWQ5ODdmYjM3','接口列表查询','/api/apilist/list','get','{\n type:\"back/font\"  //back为后台接口 font为前台接口\n}','{\n  code: \"2010/2011\",  // 2010查询成功，2011查询失败\n  msg: \"数据查询成功\",\n  data: rows/null    //rows列表数组，失败时为null\n }','back','2017-09-03 13:37:46'),('NDk3YmFiYzAtZDAyOS00ZmI0LThlMDItZGFhMTgyNDBlOTkw','后台删除二级分类','/api/back_class/delete_two','post','{\n  oneId：string  //一级分类id\n  twoId:string   //二级分类id\n  enname_one:string //一级分类英文标识\n}','{\n    \"code\": \"1071\",   //1071成功  //1073，1070失败\n    \"msg\": \"删除数据成功\"\n}','back','2017-09-04 08:40:19'),('NWZiYjQwMzctNTc2Mi00MzMwLTg3NjUtMTE3ZmI1NjM2OWMy','后台读取分类列表','/api/back_class/class_list','get','无','{\n    \"code\": \"1043\",//1041查询一级分类失败，1042二级查询失败， 1043成功\n    \"data\": [\n        {   //一级分类以对象的方式显示\n            \"onedata\": {\n                \"id\": \"MTI4NjJhNDEtZGJlMy00ZjliLWE3MmQtYmViNDQ2NWViZWI0\",\n                \"enname\": \"eqe\",\n                \"cnname\": \"一\",\n                \"time\": \"2017-09-03T07:46:48.000Z\"\n            },\n             //二级分类以数组的方式显示\n            \"twodata\": [\n                {\n                    \"id\": \"ODAxYjY4OGEtNDYwMS00ZWJiLWI4Y2UtODFkNmFhYmJjZThj\",\n                    \"parent_id\": \"MTI4NjJhNDEtZGJlMy00ZjliLWE3MmQtYmViNDQ2NWViZWI0\",\n                    \"enname\": \"qweqe\",\n                    \"cnname\": \"二\",\n                    \"article_num\": 0,\n                    \"time\": \"2017-09-03T07:46:48.000Z\"\n                }\n            ]\n        }\n    ],\n    \"msg\": \"查询成功\"\n}','back','2017-09-03 16:08:57'),('NWZmM2NkODQtNWUwYi00YjEyLTk2MTItMTM2Y2UzZDU0YjVi','后台用户登录接口','/api/back_class','post','{\n loginname:string,    //登录名\n loginpw:string,    //登录密码\n}','{\n   code: \"1001/1002/1003\",     //1001:登录成功,1002:登录失败，1003：用户名不存在\n   userid: string/null,       //string为登录成功后的用户id，null为失败\n   msg: \"登录成功\"\n }','back','2017-09-03 13:52:37'),('NzQ5N2IyNTYtZGFlMC00Y2I3LWIyZjgtMDI0NWYxMzcxMzNm','接口文档修改','/api/apilist/amend','post','{\n id:string，     //接口id\n title:string，  //接口标题\n url:string，    //接口地址\n type:string，   //接口请求类型\n sendparams:string，//接口发送参数\n getparams:string， //接口返回参数\n backorfont:string，//归属前台还是后台\n}','{\n code: \"2022/2021\",    //2022插入数据成功，2021失败\n msg: \"数据插入成功\"  \n}','back','2017-09-03 13:45:10'),('ODdjMTVkMTMtZTI0ZS00ZmNhLTkxMTYtOWRhZGNmNDQ5NGQ0','前台获取所有可显示的文章接口','/api/front_article/getArticleAll','get','无','{\n    \"code\": \"6012\",  //6012成功 6011失败\n    \"data\": [\n        {\n            \"LIST\": 1,\n            \"id\": \"OWZjNjY4ZDctNTQxMC00NTU3LTk0NWEtODU5NjcwMmZhZjE1\",\n            \"oneId\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",\n            \"twoId\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",\n            \"article_name\": \"天气很好\",\n            \"editer\": \"张三\",\n            \"content\": \"这里的天气很美啊\",\n            \"TIME\": \"2017-09-04T01:49:21.000Z\",\n            \"visitors\": 0,\n            \"daodu\": \"天气\",\n            \"imgsrc\": \"\",\n            \"recommend\": 1,\n            \"art_show\": 1,\n            \"time\": \"2017-09-04 17:28:42\"\n        }\n    ],\n    \"msg\": \"查询成功\"\n}','font','2017-09-04 17:30:51'),('OGRiM2UyMDktOTQ3Yy00OTVhLWI3NjItMzJkNGIxYzBkNjYz','后台所有文章列表数据','/api/back_article/getArticle','get','无','{\n    \"code\": \"3022\",//3021失败，3022成功\n    \"data\": [\n        {\n            \"LIST\": 1,     //当前文章编号\n            \"id\": \"OWZjNjY4ZDctNTQxMC00NTU3LTk0NWEtODU5NjcwMmZhZjE1\", //文章id\n            \"oneId\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",//一级类名id\n            \"twoId\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",//二级类名id\n            \"article_name\": \"天气很好\", //文章名称\n            \"editer\": \"张三\",           //作者\n            \"content\": \"这里的天气很美啊\", //文章内容\n            \"TIME\": \"2017-09-04T01:49:21.000Z\", //文章时间\n            \"visitors\": 0,                 //访问人数\n            \"daodu\": \"天气\",               //导读\n            \"imgsrc\": \"\",                  //导图地址\n            \"recommend\": 1,                //是否推荐显示\n            \"art_show\": 1,                 //文章是否显示\n            \"time\": \"2017-09-04 11:15:08\"  //创建时间\n        }\n    ],\n    \"msg\": \"查询成功\"\n}','back','2017-09-04 12:05:14'),('OGY4NjJkYzgtM2FjMy00Zjc3LWIzMzQtMTc1YmJjYWRmZjY3','一二级类名的查询接口','/api/back_article/getClass','get','无','{\n    \"code\": \"3001\", //3001成功；3000失败\n    \"data\": [\n        [     //第一个数组中为类名一的数据\n            {\n                \"id\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",\n                \"enname\": \"eqe\",\n                \"cnname\": \"一\",\n                \"time\": \"2017-09-04 09:49:21\"\n            }\n        ],\n        [    //第二个数组中为二级类名的数据\n            {\n                \"id\": \"OTE5ZDBiMDEtMGU4NC00N2UxLThlZmEtOTBhYzk3YTNmOGFi\",\n                \"parent_id\": \"YmM0ZjgwMjctMWI3NS00ZjNkLTkyODUtYjU2MWJhOGYyMzA3\",\n                \"enname\": \"qweqe\",\n                \"cnname\": \"二\",\n                \"article_num\": 0,\n                \"time\": \"2017-09-04 09:49:21\"\n            }\n        ]\n    ],\n    \"msg\": \"查询成功\"\n}','back','2017-09-04 10:26:14'),('OTBjNTg3MWMtMjc4NC00YjIzLWEzMTgtY2Y1NTk4NjMzYmE0','根据一级分类查询二级分类列表','/api/front_article/getClassTwo','post','{\n  oneId：string  //所属一级分类的id\n}','{\n    \"code\": \"6020\",\n    \"msg\": \"数据查询成功\",\n    \"data\": [\n        {\n            \"id\": \"ZGJhZDdjMTQtMjJlZS00YjNjLWExYzgtYWY4ZWE1OThkNDc1\",\n            \"parent_id\": \"ZDVjYjEyOTgtZjU3Ni00N2I3LTk1NDQtMzJiNTI2YWI4YjIy\",\n            \"enname\": \"qweqer\",\n            \"cnname\": \"二\",\n            \"article_num\": 0,\n            \"time\": \"2017-09-04 11:11:04\"\n        }\n    ]\n}','font','2017-09-04 18:43:45'),('YjMzN2Q4NzEtOTEwYS00NWJhLWExOGYtZDVkMmQyMjg4YWU0','文章添加接口','/api/back_article/addArticle','post','{\n  oneId：string    // 文章所归属的一级分类id\n  twoId：string    // 文章所归属的二级分类id\n  article_name：string    //文章标题\n  editer：string    // 作者\n  content：string    // 文章的内容\n  time：string    //  文章的创建时间\n  daodu：string    // 文章的导读\n  imgsrc：string    //为可选项，标题导图\n  recommend：1/0    //boolen值，1代表true，0代表false 是否在首页推荐显示\n  art_show：1/0     // boolen值，1代表true，0代表false 是否显示\n  enname_one：string    //一级分类的英文标识，根据此字段插入不同的表\n}','{\n    \"code\": \"3011\",  //3010为添加失败，3011为添加成功\n    \"msg\": \"添加成功\"\n}','back','2017-09-04 10:57:32'),('YjNkNTNhMzctZTYzZS00Y2YxLTlkNGMtZjNiMWY3NjliMzBi','接口文档删除接口','/api/apilist/delete','post','{\n id:string    //删除接口的id\n}','{\n   code: \"2032/2031\",  //2031删除失败，2032删除成功\n   msg: \"删除数据成功\"\n  }','back','2017-09-03 13:47:52'),('YmQ4YjQ2NDQtNDA2ZC00NWI0LWE4YzktOTNlNGZmOWUyZmFj','后台修改一级类名','/api/back_class/amend_class_one','post','{\n oldenname_one:string  //原一级类名的英文标识\n enname_one：string    //新改变一级类名的英文标识\n cnname_one：sting     //新改变一级类名的中文标识\n}','{\n  code: \"1052\",//1052成功，1501修改表失败，1503更新类名失败，1050英文标识冲突\n   msg: \"修改表成功\"\n}','back','2017-09-03 17:15:11'),('YWIxZjhhMzAtNjhmMy00OTRiLThkMjctYjAxNjkyYWMwZmUy','后台修改文章接口','/api/back_article/amendArticle','post','{\n  id:string           //  当前文章的唯一标识\n  article_name：string    //文章标题\n  visitors：string    //当前文章的访客量\n  editer：string    // 作者\n  content：string    // 文章的内容\n  time：string    //  文章的创建时间\n  daodu：string    // 文章的导读\n  imgsrc：string    //为可选项，标题导图\n  recommend：1/0    //boolen值，1代表true，0代表false 是否在首页推荐显示\n  art_show：1/0     // boolen值，1代表true，0代表false 是否显示\n  enname_one：string    //一级分类的英文标识，根据此字段插入不同的表\n}','{\n  code: \"3031\",  //3031成功，3030失败\n  msg: \"修改成功\"\n}','back','2017-09-04 12:10:37'),('YWQxNmY3MzItYzQ3ZC00M2MwLTg0N2YtNDgzY2FjM2NiMGVl','后台一级分类添加','/api/back_class/add_class_one','post','{\n enname_one：string   //一级英文标识\n cnname_one：string   //一级中文\n enname_two：string   //二级英文标识\n cnname_two：string   //二级中文\n}','{\n   code: \"1010\",     //1010：分类一英文标识冲突/1012：分类二英文标识冲突\"/1011：分类一插入数据库失败/1013：分类二插入数据库失败/1014：数据插入成功\n\n   msg: \"分类二英文标识冲突\"\n}','back','2017-09-03 14:24:09'),('YzQ3ZmZmODQtY2ZkYy00MzBlLWEyNjgtMWU1MjE1MGEwNjJh','获取头部导航数据','/api/front_article/getNav','get','无','{\n    \"code\": \"6010\",   //6010成功， 6011失败\n    \"msg\": \"数据查询成功\",\n    \"data\": [\n        {\n            \"id\": \"ZDVjYjEyOTgtZjU3Ni00N2I3LTk1NDQtMzJiNTI2YWI4YjIy\",//一级分类id\n            \"enname\": \"eqew\",   //一级分类标识\n            \"cnname\": \"一\",     //一级分类名称\n            \"time\": \"2017-09-04 11:11:04\"\n        }\n    ]\n}','font','2017-09-04 17:18:02'),('ZDI3NjUwYWEtNzc5Ni00ZTYxLTg1NDYtMDgxM2I0NDg4YmRh','一级类名接口查询','/api/back_class/select_one_class','get','无','{\n    \"code\": \"1021\",\n    \"data\": [\n        {\n            \"id\": \"Y2Y2NWRhZDQtODJhMy00ODMwLTllODgtNjhkNGNmMTU3Y2U0\", //id\n            \"enname\": \"eqe\",   //英文标识\n            \"cnname\": \"一\",    //中文名称\n            \"time\": \"2017-09-03 14:16:53\"  //时间\n        }  \n    ],\n    \"msg\": \"数据查询成功\"\n}','back','2017-09-03 14:32:54'),('ZDUyNTg4YmMtZGU5ZC00MWU3LWIwZmItNWE0NmZiNmZhYjMx','后台修改二级分类','/api/back_class/amend_class_two','post','{\n oldenname_two:string  //原二级类名的英文标识\n enname_two：string    //新改变二级类名的英文标识\n cnname_two：sting     //新改变二级类名的中文标识\n}','{\n    \"code\": \"1062\",//1060二级类名冲突，1062成功，1063修改类名失败\n    \"msg\": \"修改表成功\"\n}','back','2017-09-03 17:23:20'),('ZGQ2ZmQ1ZTQtYWU0ZS00ZGM0LWJhNzUtM2Q1ZDAzMTkzNDIx','后台文章删除接口','/api/back_article/deleteOne','post','{\n  enname_one：string  //一级类名的英文标识，文章表名\n  id：string          //文章的id\n}','{\n    \"code\": \"3041\",   //3041删除成功， 3040删除失败\n    \"msg\": \"删除成功\"\n}','back','2017-09-04 13:07:11');

/*Table structure for table `food` */

DROP TABLE IF EXISTS `food`;

CREATE TABLE `food` (
  `LIST` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `oneId` varchar(255) DEFAULT NULL,
  `twoId` varchar(255) DEFAULT NULL,
  `article_name` varchar(255) DEFAULT NULL,
  `editer` varchar(255) DEFAULT NULL,
  `content` longtext,
  `TIME` datetime DEFAULT NULL,
  `visitors` int(11) DEFAULT NULL,
  `daodu` varchar(255) DEFAULT NULL,
  `imgsrc` varchar(255) DEFAULT NULL,
  `recommend` tinyint(4) DEFAULT NULL,
  `art_show` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LIST` (`LIST`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

/*Data for the table `food` */

/*Table structure for table `one_class` */

DROP TABLE IF EXISTS `one_class`;

CREATE TABLE `one_class` (
  `id` varchar(200) NOT NULL,
  `enname` varchar(200) DEFAULT NULL,
  `cnname` varchar(200) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `one_class` */

insert  into `one_class`(`id`,`enname`,`cnname`,`time`) values ('YTkyZDc4MWUtMDQ2MS00ZjBjLTllODEtNWQ0MWRlZTdlMGU3','food','美食','2017-09-06 09:42:00'),('ZDlhZjJkZjMtYmE2My00OWQ4LWJjOGYtMzY5OWVlYzkyNDc5','tec','技术','2017-09-05 14:54:39');

/*Table structure for table `tec` */

DROP TABLE IF EXISTS `tec`;

CREATE TABLE `tec` (
  `LIST` int(11) NOT NULL AUTO_INCREMENT,
  `id` varchar(255) NOT NULL,
  `oneId` varchar(255) DEFAULT NULL,
  `twoId` varchar(255) DEFAULT NULL,
  `article_name` varchar(255) DEFAULT NULL,
  `editer` varchar(255) DEFAULT NULL,
  `content` longtext,
  `TIME` datetime DEFAULT NULL,
  `visitors` int(11) DEFAULT NULL,
  `daodu` varchar(255) DEFAULT NULL,
  `imgsrc` varchar(255) DEFAULT NULL,
  `recommend` tinyint(4) DEFAULT NULL,
  `art_show` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LIST` (`LIST`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tec` */

/*Table structure for table `two_class` */

DROP TABLE IF EXISTS `two_class`;

CREATE TABLE `two_class` (
  `id` varchar(200) NOT NULL,
  `parent_id` varchar(200) NOT NULL,
  `enname` varchar(200) DEFAULT NULL,
  `cnname` varchar(200) DEFAULT NULL,
  `article_num` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `two_class` */

insert  into `two_class`(`id`,`parent_id`,`enname`,`cnname`,`article_num`,`time`) values ('MmI4MTI0NzUtN2ZmYS00YmJhLTgyYjYtZWU1M2FiODM2YzQx','ZDlhZjJkZjMtYmE2My00OWQ4LWJjOGYtMzY5OWVlYzkyNDc5','zhousan','周三',0,'2017-09-05 09:27:45'),('NjFjY2QyYTctM2FhNy00ZWQwLTk1YjQtMWI3YjBlOGYwOGE2','YTkyZDc4MWUtMDQ2MS00ZjBjLTllODEtNWQ0MWRlZTdlMGU3','gong','宫保鸡丁',0,'2017-09-06 09:42:00'),('YzQ2YjVlZjMtNTA3MS00NzBmLWI4OTQtMjM5ZDNhYmY4ZTY2','MTZmNGFlYWYtMmQyMC00Mzc0LWI2NDYtNDZmYjA5M2Q4Mjlj','sfd','fds',0,'2017-09-05 08:59:03');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `privilege` int(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`password`,`privilege`) values (1,'root','root123',0),(4,'sec','sec111',1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
