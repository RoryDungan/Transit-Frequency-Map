import { decodeAsync } from '@msgpack/msgpack'

export default function (fetch) {
  const getCityData = async (cityId, time, frequency) => {
    const url = `/cities/${cityId}-${time}-${frequency}mins.msg`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Tried to GET ${url}, returned status ${res.status}`)
    }

    const decoded = await decodeAsync(res.body)

    return decoded
  }

  return {
    getCityData,
  }
}
