import express from 'express'

// Maak een nieuwe express app
const server = express()

// Stel de public map in
server.use(express.static('public'))

// Stel de view engine in
server.set('view engine', 'ejs')
server.set('views', './views')

// Stel afhandeling van formulieren inzx
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

// Maak een route voor de index
server.get('/', (request, response) => {
    const baseurl = "https://api.visualthinking.fdnd.nl/api/v1/"
    const slug = request.query.comment
    const url = `${baseurl}comment/${slug}`

    console.log(url)

    fetchJson(url).then((data) => {
        response.render('index', data)
    })
})

server.get('/new', (request, response) => {
    response.render('form')
})

server.post('/new', (request, response) => {
    // console.log(request.body)

    const baseurl = "https://api.visualthinking.fdnd.nl/api/v1/"

    const url = `${baseurl}comments`
    console.log(url)

    postJson(url, request.body).then((data) => {
        let newComment = { ...request.body }

        console.log(data)

        if (data.success) {
            response.redirect('/new/?memberPosted=true')
            // TODO: squad meegeven, message meegeven
            // TODO: Toast meegeven aan de homepagina
        } else {
            // response.redirect('/new/?memberPosted=false')
            const errormessage = `${data.message}: Werkt niet:(`
            const newdata = { error: errormessage, values: newComment }

            response.render('form', newdata)
        }
    })
})

// Stel het poortnummer in
server.set('port', 8000)

// Start met luisteren
server.listen(server.get('port'), () => {
    console.log(`Application started on http://localhost:${server.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
async function fetchJson(url) {
    return await fetch(url)
        .then((response) => response.json())
        .catch((error) => error)
}

/**
 * postJson() is a wrapper for the experimental node fetch api. It fetches the url
 * passed as a parameter using the POST method and the value from the body paramater
 * as a payload. It returns the response body parsed through json.
 * @param {*} url the api endpoint to address
 * @param {*} body the payload to send along
 * @returns the json response from the api endpoint
 */
export async function postJson(url, body) {
    return await fetch(url, {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
        .then((response) => response.json())
        .catch((error) => error)
}