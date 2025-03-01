import axios from "axios"

export interface LocationResult {
  status: number
  message: string
  request_id: string
  result: Result
}

export interface Result {
  location: Location
  address: string
  address_component: AddressComponent
  ad_info: AdInfo
  address_reference: AddressReference
  formatted_addresses: FormattedAddresses
}

export interface Location {
  lat: number
  lng: number
}

export interface AddressComponent {
  nation: string
  province: string
  city: string
  district: string
  street: string
  street_number: string
}

export interface AdInfo {
  nation_code: string
  adcode: string
  phone_area_code: string
  city_code: string
  name: string
  location: Location2
  nation: string
  province: string
  city: string
  district: string
  _distance: number
}

export interface Location2 {
  lat: number
  lng: number
}

export interface AddressReference {
  town: Town
  landmark_l2: LandmarkL2
}

export interface Town {
  id: string
  title: string
  location: Location3
  _distance: number
  _dir_desc: string
}

export interface Location3 {
  lat: number
  lng: number
}

export interface LandmarkL2 {
  id: string
  title: string
  location: Location4
  _distance: number
  _dir_desc: string
}

export interface Location4 {
  lat: number
  lng: number
}

export interface FormattedAddresses {
  recommend: string
  rough: string
  standard_address: string
}


export default class LocationService {

	private static instance: LocationService
	private cache: Map<string, string> = new Map<string, string>()

	private constructor() { }

	public static newInstance(): LocationService {
		return this.instance || (this.instance = new LocationService())
	}

	public async location2Address(longtitude: string, latitude: string): Promise<string> {
		const key = `${longtitude},${latitude}`
		if (this.cache.has(key)) {
			return this.cache.get(key)!
		}
		const resp = await axios.get(`https://lbs.ismy.wang/ws/geocoder/v1?location=${latitude},${longtitude}&get_poi=0&key=OA4BZ-FX43U-E5VV2-45M6S-C4HD3-NIFFI&output=json`)
		const data = resp.data as LocationResult
		let address = data.result.formatted_addresses?.recommend
		if (!address) {
			address = '未知'
		}
		this.cache.set(key, address)
		return address
	}
}