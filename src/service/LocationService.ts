import axios from "axios"

interface StreetNumber {
	number: string;
	location: string;
	direction: string;
	distance: string;
	street: string;
}

interface Building {
	name: any[];
	type: any[];
}

interface Neighborhood {
	name: any[];
	type: any[];
}

interface AddressComponent {
	city: string;
	province: string;
	adcode: string;
	district: string;
	towncode: string;
	streetNumber: StreetNumber;
	country: string;
	township: string;
	building: Building;
	neighborhood: Neighborhood;
	citycode: string;
}

interface Regeocode {
	addressComponent: AddressComponent;
	formatted_address: string;
}

interface LocationResult {
	status: string;
	regeocode: Regeocode;
	info: string;
	infocode: string;
}

export default class LocationService {

  private static instance: LocationService

  private constructor() {}

  public static newInstance(): LocationService {
    return this.instance || (this.instance = new LocationService())
  }

  public async location2Address(longtitude: string, latitude: string) : Promise<string> {
    const resp = await axios.get(`https://restapi.amap.com/v3/geocode/regeo?key=696d4de11b128b12bac4eeacc6d97fbc&location=${longtitude},${latitude}`)
    const result = resp.data as LocationResult
    return result.regeocode.formatted_address
  }
}