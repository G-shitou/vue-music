export default {
    // 请求推荐页面轮播图
    slide:{
        url:'/api/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
        params:{}
    },
    // 请求推荐歌单
    recommends:{
        url:'/pcapi/cgi-bin/musicu.fcg',
        params:{
            data: {
                "recomPlaylist":{
                    "method":"get_hot_recommend",
                    "param":{"async":1,"cmd":2},
                    "module":"playlist.HotRecommendServer"
                }
            }
        }
    },
    // 请求推荐歌单详情
    recommendList:{
        url:'/api/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg',
        params:{
            'type':1,
            'utf8':1,
            'inCharset':'utf8',
            'outCharset':'utf-8'
        }
    },
    // 推荐歌单中获取歌曲信息
    getRecommendSong:{
        url:'/pcapi/cgi-bin/musicu.fcg',
        params:{
            comm:{
                uin:0,
                ct:24,
                cv:0,
                gzip:0,
                mcc:460,
                mnc:1
            },
            data_id:{
                module:"track_info.UniformRuleCtrlServer",
                method:"GetTrackInfo",
                param:{
                   
                }
            }
        }
    }
}