<template>
    <section>
        <div class="post">
            <header>
                <h2 class="posttitle"><a href="javascript:;" rel="bookmark">{{keydata.article_name}}</a></h2>
            </header>
            <div class="postdate">
                <p>{{index}}</p>
            </div>
            <div class="postcontent">
                <p>{{keydata.daodu}}</p>
            </div>
            <div class="postdetails">
                <p class="postedby">
                    <span class="sep">发表时间</span>
                    <a href="javascript:;" rel="bookmark">
                        <time class="entry-date" :datetime="keydata.time" pubdate="">{{keydata.time}}</time>
                    </a>
                    <span class="sep"> 作者</span>
                    <span class="author vcard">
                        <a href="javascript:;">{{keydata.editer}}</a>
                    </span>
                </p>
                <router-link :to="{name:'single',params:keydata}" tag="p" class="postcomments">
                    <span>阅读全文</span>
                </router-link>
            </div>
        </div>
    </section>  
</template>
<script>
    export default {
        props:["keydata","index"],
        created(){
           
        }
    }
</script>

<style lang="scss" scoped>
    .posttitle{
        font-family: Georgia, "Times New Roman", Times, serif;
        font-size: 26px;
        font-weight: normal;
        letter-spacing: -0.5px;
        width: 100%;
        border-top: 1px solid #EDEDED;
        border-bottom: 1px solid #EDEDED;
        padding: 5px 0;
        margin-bottom: 10px;
        a{
            color: #000;
            text-decoration: none;
        }
        a:hover{
            color: #888A13;
        }
    }
    .postdate{
        background-image: url("/static/images/circle-yellow.png");
        width: 85px;
        height: 74px;
        margin:-75px 0 0 -102px;
        float: left;
        text-align: center;
        padding-top: 16px;
        background-repeat: no-repeat;
        text-shadow: #FEFFA9 1px 1px 0px;
        background-color: transparent;
        font-size: 36px;
        font-weight: 600;
    }
    .postcontent{
        color: #959494;
        font-size: 12px;
        margin-bottom: 14px;
        p{
            display: -webkit-box;
            -webkit-line-clamp:4;
            -webkit-box-orient:vertical;
            word-break: break-all;
            overflow: hidden;
            line-height: 19px;
        }
    }
    .postdetails{
        height: 32px;
        line-height: 32px;
        border-top: 1px solid #EDEDED;
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 50px;
        font-size: 12px;
    }
    .postedby{
        float: left;
    }
    .postcomments{
        float: right;
        cursor: pointer;
    }
    .postcomments:hover{
        color: lightblue;
    }
    time{
        color: #959494;
    }
    a{
        color: #000;
        text-decoration: none;
    }
</style>

