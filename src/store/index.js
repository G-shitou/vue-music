import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import recommend from './modules/recommend'
import recommendList from './modules/recommendList'
import player from './modules/player'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state:{

    },
    mutations:{
        
    },
    modules: {
        recommend,
        recommendList,
        player
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})