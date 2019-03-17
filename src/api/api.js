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
            'outCharset':'utf-8',
            'format': 'json'
        }
    },
    // 推荐歌单中获取歌曲信息
    getRecommendSong:{
        url:'/pcapi/cgi-bin/musicu.fcg',
        params:{
            detail:{
                module:"music.pf_song_detail_svr",
                method:"get_song_detail",
                param:{
                }
            }
        }
    },
    //获取歌曲token
    getVkey:{
        url:'/api/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    },
    // 获取排行榜
    getRanking:{
        url:'/api/v8/fcg-bin/fcg_myqq_toplist.fcg',
        params:{
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1
        }
    }
}