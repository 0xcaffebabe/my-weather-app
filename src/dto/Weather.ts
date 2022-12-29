export default interface Weather {
	current: {
		feelsLike: {
			unit: string
			value: string
		}
		humidity: {
			unit: string
			value: string
		}
		pressure: {
			unit: string
			value: string
		}
		pubTime: string
		temperature: {
			unit: string
			value: string
		}
		uvIndex: string
		visibility: {
			unit: string
			value: string
		}
		weather: string
		wind: {
			direction: {
				unit: string
				value: string
			}
			speed: {
				unit: string
				value: string
			}
		}
	}
	forecastDaily: {
		aqi: {
			brandInfo: {
				brands: Array<{
					brandId: string
					logo: string
					names: {
						zh_TW: string
						en_US: string
						zh_CN: string
					}
					url: string
				}>
			}
			pubTime: string
			status: number
			value: Array<number>
		}
		moonPhase: null
		precipitationProbability: {
			status: number
			value: Array<string>
		}
		pubTime: string
		status: number
		sunRiseSet: {
			status: number
			value: Array<{
				from: string
				to: string
			}>
		}
		temperature: {
			status: number
			unit: string
			value: Array<{
				from: string
				to: string
			}>
		}
		weather: {
			status: number
			value: Array<{
				from: string
				to: string
			}>
		}
		wind: {
			direction: {
				status: number
				unit: string
				value: Array<{
					from: string
					to: string
				}>
			}
			speed: {
				status: number
				unit: string
				value: Array<{
					from: string
					to: string
				}>
			}
		}
	}
	forecastHourly: {
		aqi: {
			brandInfo: {
				brands: Array<{
					brandId: string
					logo: string
					names: {
						zh_TW: string
						en_US: string
						zh_CN: string
					}
					url: string
				}>
			}
			pubTime: string
			status: number
			value: Array<number>
		}
		desc: string
		status: number
		temperature: {
			pubTime: string
			status: number
			unit: string
			value: Array<number>
		}
		weather: {
			pubTime: string
			status: number
			value: Array<number>
		}
		wind: {
			status: number
			value: Array<{
				datetime: string
				direction: string
				speed: string
			}>
		}
	}
	indices: {
		indices: Array<{
			type: string
			value: string
		}>
		pubTime: string
		status: number
	}
	alerts: Array< {
    locationKey: string
    alertId: string
    pubTime: string
    title: string
    type: string
    level: string
    detail: string
    images: {
      icon: string
      notice: string
    }
    defense: Array< {
      defenseIcon: string
      defenseText: string
    } >
  } >
	yesterday: {
		aqi: string
		date: string
		status: number
		sunRise: string
		sunSet: string
		tempMax: string
		tempMin: string
		weatherEnd: string
		weatherStart: string
		windDircEnd: string
		windDircStart: string
		windSpeedEnd: string
		windSpeedStart: string
	}
	url: {
		weathercn: string
		caiyun: string
	}
	brandInfo: {
		brands: Array<{
			brandId: string
			logo: string
			names: {
				zh_TW: string
				en_US: string
				zh_CN: string
			}
			url: string
		}>
	}
	sourceMaps: {
		current: {
			feelsLike: string
			weather: string
			temperature: string
			humidity: string
			pressure: string
			windDir: string
			windSpeed: string
			uvIndex: string
		}
		indices: {
			feelsLikeV1: string
			pressureV1: string
			uvIndexV1: string
			sportsV1: string
			carWashV1: string
		}
		daily: {
			preciProbability: string
			weather: string
			temperature: string
			sunRiseSet: string
			aqi: string
			wind: string
		}
		clientInfo: {
			appVersion: number
			isLocated: boolean
			isGlobal: boolean
			appKey: string
			locale: string
		}
		hourly: {
			weather: string
			temperature: string
			aqi: string
			wind: string
			desc: string
		}
	}
	updateTime: number
	aqi: {
		aqi: string
		brandInfo: {
			brands: Array<{
				brandId: string
				logo: string
				names: {
					zh_TW: string
					en_US: string
					zh_CN: string
				}
				url: string
			}>
		}
		co: string
		no2: string
		o3: string
		pm10: string
		pm25: string
		primary: string
		pubTime: string
		so2: string
		src: string
		status: number
		suggest: string
		pm25Desc: string
		pm10Desc: string
		no2Desc: string
		so2Desc: string
		coDesc: string
		o3Desc: string
	}
	chs: Array<{
		type: string
	}>
	minutely: {
		status: number
		new: string
		probability: {
			maxProbability: string
			probabilityDesc: string
			probabilityDescV2: string
		}
		precipitation: {
			description: string
			firstRainOrSnow: boolean
			headDescription: string
			headIconType: string
			isModify: boolean
			isRainOrSnow: number
			isShow: boolean
			kmNum: number
			modifyInHour: boolean
			probability: Array<number>
			pubTime: string
			shortDescription: string
			status: number
			value: Array<number>
			weather: string
		}
	}
}