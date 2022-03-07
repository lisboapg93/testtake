import axios from "axios"
import express from "express"

const app = express()
app.use(express.json())

app.get('/github', async( req, res) => {
    async function Auth(){ 
        const url = 'httt://api.github.com/users/takenet/repos'
        const { data } = await axios.get(url)

        return data
    }
    console.log(data)
    const data = await Auth()

    return res.status(200).send(data)
})

app.listen("3000", () => console.log('Server Funcionando'))
