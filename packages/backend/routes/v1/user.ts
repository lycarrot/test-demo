import Router from 'koa-router'
import axios from 'axios'
import { Context } from 'koa'

const router = new Router()

const getImg=(url:string)=>{
  return new Promise((resolve,reject)=>{
    axios.get(url).then(res=>{
    resolve(res.data)
    }).catch(err=>{
      reject(err)
      console.log('err',err)
    })
  })

}
router.get('/info', async (ctx: Context) => {
const id = Math.floor(Math.random() * 100) + 1;
  let res=await getImg(`https://picsum.photos/id/${id}/info`)as {download_url:string}
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      img:res.download_url,
      name:'lycarrot',
      num:10589245,
      desc:'description'
    },
  }
})

router.get('/pic-lists', async (ctx: Context) => {
  const { request } = ctx
  const { page, limit } = request.query
  let res=await getImg(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`) as {img:Record<string,any>[]}
  ctx.body = {
    code: 200,
    message: 'success',
    data:{
      lists:res,
      page,
      limit,
      total:50,
    },
  }
})


export default router
