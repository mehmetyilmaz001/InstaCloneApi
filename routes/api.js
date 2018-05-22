// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/*  This is a sample API route. */

router.get('/:resource', (req, res) => {

	const { resource } = req.params;
	const { query } = req;

	turbo.fetch(resource, query).then((data) => {
		console.log(data);
		res.json({
			confirmation: 'success',
			data: data,
			query: req.query // from the url query string
		})
	}).catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Something went wrong!'
		})
	});

	console.log(req.params.resource)
	console.log(req.query)
	
})

router.post('/signup', (req, res) => {

	turbo.createUser(req.body)
	.then(data =>{
		res.json({
			confirmation: 'success',
			data: data
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
	
})

 router.post('/login', async (req, res) => {

	try{
		let userWithPhotos = {};

		const user = await turbo.login(req.body);
		const photos = await turbo.fetch('photo', {user: user.id});

		userWithPhotos = {
			user: user,
			photos: photos
		}

		res.json({
			confirmation: 'success',
			data: userWithPhotos
		});

		console.log(userWithPhotos);
		
	}catch(err){
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	}

	//console.log(userWithPhotos)

	//  turbo.login(req.body)
	// .then(user => {
		
	// 	let userWithPhotos = {};

	// 	 turbo.fetch('photo', {user: user.id}).then(data => {
	// 		userWithPhotos = {
	// 			user: user, 
	// 			photos : data
	// 		}
	// 	});
		
	// 	return userWithPhotos
	// })
	// .then(data =>{
	// 	console.log(data);
	// 	res.json({
	// 		confirmation: 'success',
	// 		data: data
	// 	})
	// })
	// .catch(err => {
	// 	res.json({
	// 		confirmation: 'fail',
	// 		message: err.message
	// 	})
	// })
	
})


router.post("/users/:id/photo", function(req, res){
	const userId = req.params.id;

	console.log(req.params);

	const myPhoto = {
		url: req.body.imageUrl, 
		user: userId
	};

	turbo.create("photo", myPhoto)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: data
		});
		return
	})
	.catch( err => {
		res.json({
			confirmation: 'fail',
			message: 'Something went wrong!'
		
		});
		return
	})
})


router.get('/:resource/:id', (req, res) => {
	res.json({
		confirmation: 'success',
		resource: req.params.resource,
		id: req.params.id,
		query: req.query // from the url query string
	})
})



module.exports = router
