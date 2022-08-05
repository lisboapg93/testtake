import "dotenv/config"
import axios from "axios"
import express from "express"
import Moment from "moment"

const app = express()

app.use(express.json())

app.get(`/github`, async(req, res) => {
  async function Auth() {
    const url = `https://api.github.com/users/takenet/repos`
    
    const { data } = await axios.get(url)
    
    let dataFilter = []
    let newData = {}
    let createdData
    let projectName
    let language
    
    data.forEach((repos) => {
      if(repos.language==="C#") {
        createdData = repos.created_at
        projectName = repos.name
        language = repos.language

        newData = {
          created_at: Moment(createdData).utc().format("MM/DD/YYYY"),
          name: projectName,
          language: language
        }
        dataFilter.push(newData)
        return dataFilter 
      }

    })

    dataFilter.map(reposito => ({
      name: reposito.full_name,
      description: reposito.description,
      image: reposito.owner?.avatar_url
  }));
      
    function ordenateDate(firstDate, nextDate) {
      if(new Date(firstDate.created_at).getTime() > new Date(nextDate.created_at).getTime()) {
        return 1
      }else {
        return -1
      }
    }

    dataFilter = dataFilter.sort(ordenateDate)

    dataFilter.map((element) => {
      return {
        ...element, created_at: Moment(element.created_at).utc().format("DD/MM/YYYY")
      }
    })

    console.log(dataFilter)
    return dataFilter
  }
  
  const data = await Auth()
  
  return res.status(200).send(data)
})

app.listen(`${process.env.PORT}`, () => console.log('Server Funcionando'))
