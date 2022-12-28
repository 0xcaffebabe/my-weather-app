let weatherMap = [
  {
    "code": 0,
    "wea": "晴",
    color: ['#197fd6', '#6da6e4']
  },
  {
    "code": 1,
    "wea": "多云",
    color: ['#477ead', '#5280b1']
  },
  {
    "code": 2,
    "wea": "阴",
    color: ['#25272b', '#667f9b']
  },
  {
    "code": 3,
    "wea": "阵雨",
    color: ['#477ead', '#414449']
  },
  {
    "code": 4,
    "wea": "雷阵雨",
    color: ['#477ead', '#707377']
  },
  {
    "code": 5,
    "wea": "雷阵雨并伴有冰雹",
    color: ['#477ead', '#707377']
  },
  {
    "code": 6,
    "wea": "雨夹雪"
  },
  {
    "code": 7,
    "wea": "小雨",
    color: ['#253a50', '#529ada']
  },
  {
    "code": 8,
    "wea": "中雨",
    color: ['#172533', '#529ada']
  },
  {
    "code": 9,
    "wea": "大雨",
    color: ['#0d151d', '#204464']
  },
  {
    "code": 10,
    "wea": "暴雨",
    color: ['#080d13', '#0f263a']
  },
  {
    "code": 11,
    "wea": "大暴雨",
    color: ['#080d13', '#0f263a']
  },
  {
    "code": 12,
    "wea": "特大暴雨",
    color: ['#080d13', '#0f263a']
  },
  {
    "code": 13,
    "wea": "阵雪"
  },
  {
    "code": 14,
    "wea": "小雪"
  },
  {
    "code": 15,
    "wea": "中雪"
  },
  {
    "code": 16,
    "wea": "大雪"
  },
  {
    "code": 17,
    "wea": "暴雪"
  },
  {
    "code": 18,
    "wea": "雾",
    color: ['#80848b', '#667f9b']
  },
  {
    "code": 19,
    "wea": "冻雨"
  },
  {
    "code": 20,
    "wea": "沙尘暴"
  },
  {
    "code": 21,
    "wea": "小雨-中雨"
  },
  {
    "code": 22,
    "wea": "中雨-大雨"
  },
  {
    "code": 23,
    "wea": "大雨-暴雨"
  },
  {
    "code": 24,
    "wea": "暴雨-大暴雨"
  },
  {
    "code": 25,
    "wea": "大暴雨-特大暴雨"
  },
  {
    "code": 26,
    "wea": "小雪-中雪"
  },
  {
    "code": 27,
    "wea": "中雪-大雪"
  },
  {
    "code": 28,
    "wea": "大雪-暴雪"
  },
  {
    "code": 29,
    "wea": "浮沉"
  },
  {
    "code": 30,
    "wea": "扬沙"
  },
  {
    "code": 31,
    "wea": "强沙尘暴"
  },
  {
    "code": 32,
    "wea": "飑"
  },
  {
    "code": 33,
    "wea": "龙卷风"
  },
  {
    "code": 34,
    "wea": "若高吹雪"
  },
  {
    "code": 35,
    "wea": "轻雾"
  },
  {
    "code": 53,
    "wea": "霾"
  },
  {
    "code": 99,
    "wea": "未知"
  }
]

function weatherCode2Str(code: string | number): string {
  return weatherMap.find(v => v.code + '' === code)?.wea || '未知'
}

function weatherCode2Color(code: string | number): [string, string] {
  const color = weatherMap.find(v => v.code + '' === code)?.color
  if (color) {
    return [color[0], color[1]]
  }
  return ['#197fd6', '#6da6e4']
}


export default {
  weatherCode2Str,
  weatherCode2Color
}