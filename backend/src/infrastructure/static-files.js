import serveStatic from 'serve-static'
import connectHistoryApiFallback from 'connect-history-api-fallback'
import path from 'path'

export const serveStaticFiles = app => {
  app.use('/', (a, b, next) => {
    console.log('local', __dirname, path.join(__dirname + '../../../../gui/dist/'))
    next()
  })

  if (!(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development' || 1 === 1)) {
    // Static file middleware
    app.use('/', serveStatic(path.join(__dirname + '../../../../gui/dist/')))

    // Rewrite requests to index.html as the VueJS frontend only utilises one index file.
    // Navigation in the application is handled using JavaScript with the help of the HTML5 History API.
    // This results in issues when the user hits the refresh button or is directly accessing a page other than the landing page,
    // as the express server bypasses the VueJS index file to locate the file at this location...
    app.use(connectHistoryApiFallback())

    app.use('/', serveStatic(path.join(__dirname + '../../../../gui/dist/')))
  }
}
