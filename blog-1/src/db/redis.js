const redis = require("redis")
const { REDIS_CONF } = require("../conf/db")

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.log(err)
})

function set(key, val) {
    if (val instanceof Object) {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val === null) {
                resolve(val)
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val)
            }
        })

    })
    // redisClient.get(key, (err, val) => {
    //     if (err) {
    //         console.error(err)
    //         return
    //     }
    //     console.log("val", val)

    //     //退出
    //     // redisClient.quit()
    // })
}

module.exports = {
    get,
    set
}