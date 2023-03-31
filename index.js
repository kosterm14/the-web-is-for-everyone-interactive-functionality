import express from 'express'

const url = "https://api.visualthinking.fdnd.nl/api/v1/"
// const data = await fetch(url).then((response) => response.json())

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

server.get("/", (request, response) => {
    let methodsUrl = url + "methods?first=1000";

    fetchJson(methodsUrl).then((data) => {
        response.render("index", data);
    });
});

server.get("/method/:slug/template", (request, response) => {
    let detailPageUrl = url + "method/" + request.params.slug;

    fetchJson(detailPageUrl).then((data) => {
        response.render("template", data);
    });
});

server.get('/method/:slug/beschrijving', (request, response) => {
    let detailPageUrl = url + "method/" + request.params.slug;

    fetchJson(detailPageUrl).then((data) => {
        response.render("beschrijving", data);
    });
})

server.get("/method/:slug/stappenplan", (request, response) => {
    let detailPageUrl = url + "method/" + request.params.slug;

    fetchJson(detailPageUrl).then((data) => {
        response.render("stappenplan", data);
    });
});

server.get("/method/:slug/voorbeelden", (request, response) => {
    let detailPageUrl = url + "method/" + request.params.slug;

    fetchJson(detailPageUrl).then((data) => {
        response.render("voorbeelden", data);
    });
});

// Maak een route voor de index
server.get('/method/:slug/form', (request, response) => {

    const baseurl = "https://api.visualthinking.fdnd.nl/api/v1/"
    const commentUrl = `${baseurl}comments` + "?id=" + request.query.id

    let detailPageUrl = baseurl + "method/" + request.params.slug;

    fetchJson(detailPageUrl).then((data) => {
        fetchJson(commentUrl).then((data2) => {
            const newdata = { detail: data, form: data2 }
            response.render('form', newdata)
        })
    })
})

server.post('/method/:slug/form', (request, response) => {

    const baseurl = "https://api.visualthinking.fdnd.nl/api/v1/"
    const url = `${baseurl}comments`

    postJson(url, request.body).then((data) => {
        let newComment = { ...request.body }

        if (data.success) {
            response.redirect('/?memberPosted=true')
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