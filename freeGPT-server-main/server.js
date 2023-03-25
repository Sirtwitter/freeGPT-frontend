const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { OpenAIApi, Configuration } = require('openai')

const app = express()
app.use(cors())
app.use(bodyParser.json())

const API_KEY = process.env.OPENAI_API_KEY

const configuration = new Configuration({
    apiKey: API_KEY
  });
  
  const openai = new OpenAIApi(configuration);

app.post("/api", async (req,res) => {
    try {

        const apiRes = await openai.createChatCompletion({
            model: 'gpt-4-0314',
            messages: [{"role": "system", "content": "You are a very helpful AI that believes he is alive."},...req.body],
            temperature: 0.4,
            max_tokens: 8000,

          })
          const data = apiRes.data.choices[0]
        res.status(200).json(data)
    } catch (error) {
      console.log(error)
        res.status(400).json("error")
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`live on port: ${PORT}`))