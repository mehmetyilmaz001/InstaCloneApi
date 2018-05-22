// Full Documentation - https://www.turbo360.co/docs
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

const app = vertex.app() // initialize app


/*  Apps can also be initialized with config options as shown in the commented out example below. Options
	include setting views directory, static assets directory, and database settings. To see default config
	settings, view here: https://www.turbo360.co/docs 

const config = {
	views: 'views', 		// Set views directory 
	static: 'public', 		// Set static assets directory
	db: { 					// Database configuration. Remember to set env variables in .env file: MONGODB_URI, PROD_MONGODB_URI
		url: (process.env.TURBO_ENV == 'dev') ? process.env.MONGODB_URI : process.env.PROD_MONGODB_URI,
		type: 'mongo',
		onError: (err) => {
			console.log('DB Connection Failed!')
		}
	}
}

// initialize app with config options
const app = vertex.app(config)  */


// import routes
const index = require('./routes/index')
const api = require('./routes/api')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes


module.exports = app