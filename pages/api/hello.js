// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    const request = await fetch('https://economia.awesomeapi.com.br/last/USD-ARS')

    const data = await request.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json(error)
  }
}
