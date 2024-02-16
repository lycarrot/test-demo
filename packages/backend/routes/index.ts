import Router from 'koa-router'
import fs from 'fs'
import path from 'path'

const router = new Router({
  prefix: '/api',
})

const loadRoutes = (dir: string, prePath?: string) => {
  const files = fs.readdirSync(dir)
  const routeFiles = files.filter((file) => file !== 'index.ts')
  routeFiles.forEach((file) => {
    const filePath = path.join(dir, file)
    const isDirectory = fs.statSync(filePath).isDirectory()
    const routePath = prePath + path.basename(file, '.ts')
    if (isDirectory) {
      loadRoutes(filePath, routePath + '/')
    } else {
      const route = require(path.join(dir, file)).default as Router
      router.use(`${routePath}`, route.routes(), route.allowedMethods())
    }
  })
}

loadRoutes(path.join(__dirname), '/')

export default router
