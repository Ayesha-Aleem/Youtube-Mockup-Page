import express from "express"
import axios from 'axios'
import dotenv from "dotenv";
const app=express()
import cors from "cors";
const port=9000
const apiKey='AIzaSyBrHAdKDDKDexQ0KOgKi8F8gj-BV-WYYmQ'
const baseApiUrl="https://www.googleapis.com/youtube/v3"
const {google}=require('googleapis')
const youtube=google.youtube({
  version:'v3',
  auth:apiKey,
})

app.use(express.json());
 app.use(cors());
dotenv.config();
//https://www.googleapis.com/youtube/v3/search?key=apiKey&type=video&partsnippet&q=foo
app.get("/",(req,res)=>{
  res.send("Hello from our api")
  })

app.get("/search", async (req, res, next) => {
    try {
      const searchQuery = req.query.search_query;
      const urls=`${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`
      const response=await axios.get(urls)
      console.log(response);
      // const description=response.data.items.map((item:any)=>item.snippet.description)
      // const url=response.data.items.map((item:any)=>item.snippet.thumbnails.medium.url)
      // res.send({description,url});
    } 
    catch (err) {
      console.log(err)
    }
  });

  app.get("/search-with-googleapis", async (req, res, next) => {
    try {
      const searchQuery = req.query.search_query;
      const response=youtube.search.list({
        part:'snippet',
        q:searchQuery
      })
      const titles=response.data.items.map((item:any)=>item.snippet.title)
      console.log(titles)
    } 
    catch (err) {
      next(err);
    }
  });

app.listen(port,()=>{
    console.log(`App is running on port ${port}`)
})
