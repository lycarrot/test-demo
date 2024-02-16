import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import KoaCompress from 'koa-compress'
import KoaValidate from 'koa-validate'
import koaCors from 'koa2-cors'
import bunyan from 'bunyan'
import logger, { requestLogger } from 'koa-bunyan-logger'
import type { RequestData } from 'koa-bunyan-logger'
import config from 'config'
import router from './routes'

const app = new Koa()

const customLogger = bunyan.createLogger({ name: 'backend', level: 'trace' })

app
  .use(logger(customLogger))
  .use(
    requestLogger({
      //@ts-ignore
      updateLogFields: (data: RequestData) => {
        return {
          method: data.req.method,
          url: data.req.url,
          //@ts-ignore
          status: data.res?.statusCode,
          //@ts-ignore
          duration: data.duration,
        }
      },
    }),
  )
  .use(KoaCompress())
  .use(
    koaCors({
      origin: '*',
      credentials: true,
    }),
  )

  .use(
    bodyParser({
      jsonLimit: '10mb',
      textLimit: '10mb',
      enableTypes: ['json', 'form', 'text'],
    }),
  )
  .use(router.routes())
  .use(router.allowedMethods())

KoaValidate(app)

app.listen(config.get('port'), () => {
  console.log('Server is running on port 3000')
})
