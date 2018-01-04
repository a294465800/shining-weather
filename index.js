#!/usr/bin/env node
const axios = require('axios')
const host = 'http://www.sojson.com/open/api/weather/json.shtml'

const data = {}

if (process.argv[2]) {
  data.params = {
    city: process.argv[2]
  }
} else {
  console.log('Please enter city name first!')
  return
}

let forecast = false
if (process.argv[3] === 'forecast') {
  forecast = true
}

function getForcast(data){
  data.forEach((value, index) => {
    console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
    console.log(`日期：${value.date}`)
    console.log(`天气：${value.type}`)
    console.log(`日出时间：${value.sunrise}    日落时间：${value.sunset}`)
    console.log(`最${value.high}    最${value.low}`)
    console.log(`风向：${value.fx}    风力：${value.fl}`)
    console.log(`适宜活动：${value.notice}`)
  })
}

axios.get(host, data)
  .then(res => {
    const weather_info = res.data
    const weather = res.data.data
    const date = `${weather_info.date.substring(0,4)}-${weather_info.date.substring(4,6)}-${weather_info.date.substring(6,8)}`
    console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
    console.log('\x1b[35m%s\x1b[0m','当前查询')
    console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
    console.log(`当前城市：${weather_info.city}`)
    console.log(`当前日期：${ new Date(date)}`)
    console.log(`温度：${weather.wendu}℃    湿度：${weather.shidu}    pm2.5：${weather.pm25}`)
    console.log(`空气质量： ${weather.quality}    适宜活动：${weather.ganmao}`)
    console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
    console.log('\x1b[35m%s\x1b[0m','昨日天气')
    console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
    const yesterday = weather.yesterday
    console.log(`昨天日期：${yesterday.date}`)
    console.log(`天气：${yesterday.type}`)
    console.log(`日出时间：${yesterday.sunrise}    日落时间：${yesterday.sunset}`)
    console.log(`最${yesterday.high}    最${yesterday.low}`)
    console.log(`风向：${yesterday.fx}    风力：${yesterday.fl}`)
    console.log(`适宜活动：${yesterday.notice}`)
    if(forecast){
      console.log('\x1b[32m%s\x1b[0m', '-----------------------------------------------')
      console.log('\x1b[35m%s\x1b[0m',`天气预测`)
      getForcast(weather.forecast)
    }
  })
  .catch(err => {
    console.log('出错啦！天气不知道去哪查了~')
  })