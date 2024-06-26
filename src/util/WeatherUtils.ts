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

const directionArr = ["北", "东北偏北", "东北", "东北偏东", "东", "东南偏东", "东南", "东南偏南", "南",
  "西南偏南", "西南", "西南偏西", "西", "西北偏西", "西北", "西北偏北"]

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

function windDegree2ReableDirection(degrees: number) {
  let index = 0;
  if (348.75 <= degrees && degrees <= 360) {
    index = 0;
  } else if (0 <= degrees && degrees <= 11.25) {
    index = 0;
  } else if (11.25 < degrees && degrees <= 33.75) {
    index = 1;
  } else if (33.75 < degrees && degrees <= 56.25) {
    index = 2;
  } else if (56.25 < degrees && degrees <= 78.75) {
    index = 3;
  } else if (78.75 < degrees && degrees <= 101.25) {
    index = 4;
  } else if (101.25 < degrees && degrees <= 123.75) {
    index = 5;
  } else if (123.75 < degrees && degrees <= 146.25) {
    index = 6;
  } else if (146.25 < degrees && degrees <= 168.75) {
    index = 7;
  } else if (168.75 < degrees && degrees <= 191.25) {
    index = 8;
  } else if (191.25 < degrees && degrees <= 213.75) {
    index = 9;
  } else if (213.75 < degrees && degrees <= 236.25) {
    index = 10;
  } else if (236.25 < degrees && degrees <= 258.75) {
    index = 11;
  } else if (258.75 < degrees && degrees <= 281.25) {
    index = 12;
  } else if (281.25 < degrees && degrees <= 303.75) {
    index = 13;
  } else if (303.75 < degrees && degrees <= 326.25) {
    index = 14;
  } else if (326.25 < degrees && degrees < 348.75) {
    index = 15;
  } else {
    return "错误";
  }
  return directionArr[index];
}


const exportedObject =  {
  weatherCode2Str,
  weatherCode2Color,
  windDegree2ReableDirection
}

export default exportedObject