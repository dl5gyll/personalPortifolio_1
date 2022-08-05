const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const ProjectController = require('../controllers/ProjectController')
const ServiceController = require('../controllers/ServiceController')

router.get('/', (req, res) => {
    const data = req.context

    //database
    const projectCtr = new ProjectController()

    //data rendering
    projectCtr.get()
    .then(projects =>{
        data['projects'] = projects
        res.render('landing', data)        
    })
    .then(posts => {
		data['posts'] = posts
		data['post1'] = posts[0]
		data['post2'] = posts[1]
		data['post3'] = posts[2]

		res.render('landing', data) // render landing.mustache
	})
    .catch(err =>{
        res.send('Oops! '+ err.message)
    })
    
    
})

//getting the slug url param from the data base
router.get('/project/:slug', (req, res)=>{
const data = req.context

const projectSlug = req.params.slug

//instance of the class controller ...db
const projectCtr = new ProjectController()
projectCtr.get({slug: projectSlug})

.then(projects => {
    if(projects.length == 0){
        throw new Error('Project not found')
        return
    }
    const project = projects[0]
    data['project'] = project
    res.render('project', data)
})
.catch(err=>{
    res.send('Oops! - ' + err.message)
})
})

router.get('/post/:slug', (req, res) => {
	const data = req.context

	let ctr = new controllers.post()
	ctr.get({slug:req.params.slug})
	.then(posts => {
		if (posts.length == 0){
			throw new Error('Post '+req.params.slug+' not found.')
			return
		}

		data['post'] = posts[0]
		data.setEntity(data.post)
		res.render('post', data)
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
})


router.get('/service/:id', (req, res)=>{
    const data = req.context
    
    const serviceName = req.params.id
    
    //instance of the class controller ...db
    const serviceCtr = new ServiceController()
    serviceCtr.get({id: serviceName})
    
    .then(services => {
        if(services.length == 0){
            throw new Error('Project not found')
            return
        }
        const service = services[0]
        data['service'] = service
        res.render('service', data)
    })
    .catch(err=>{
        res.send('Oops! - ' + err.message)
    })
    })


 

module.exports = router