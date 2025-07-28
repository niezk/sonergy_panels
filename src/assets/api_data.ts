const url = 'https://web-production-c8ee.up.railway.app'

async function getRealReport(index: number, data_length: number) {
  try {
    const data = []
    const path = '/api/data/real'
    const response = await fetch(`${url}${path}?page=${index}&total_data=${data_length}`)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    const page_length = result.total_pages

    for (let i = 1; i <= page_length; i++) {
      const response = await fetch(`${url}${path}?page=${i}&total_data=${data_length}`)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const result = await response.json()
      data.push(
        ...result.data.map((el: { time: string; consume: string }) => [el.time, el.consume]),
      )
    }
    return data
  } catch (err) {
    console.log(err)
    return []
  }
}

async function getForecasting() {
  const path = 'api/data/forecast'
  try {
    const response = await fetch(`${url}/${path}?periods=90`)
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const result = await response.json()
    const data = result.data.map((el: {ds: number, yhat: number}) => [el.ds, el.yhat])
    return data
  } catch (err) {
    console.log(err)
  }
}

export default { getRealReport, getForecasting }
