import express from "express";
import expressLayouts from'express-ejs-layouts';
import markdown from 'markdown-it';

import { apiHandler, url } from "../api-handler.js";
import { PAGES } from "./dataset.js";

const app = express();
const md = new markdown();

app.use("/static", express.static("./static"));

app.use(expressLayouts);

app.set('layout', './layout/main');
app.set("view engine", "ejs");
app.set("views", "./templates");

// Ladda data från API, bygg html och skicka som svar

app.get("/", async (req, res) => {
    // movies.data  []
    const data = await apiHandler(url);
    const movies = data.data.map(element => {
        return {
            id : element.id,
            ... element.attributes,
        }
    });
    
    if(movies){
        res.render('index', { movies } );
    } else {
        res.status(404).render('404');
    }
});

app.get("/movies/:id", async (req, res) => {

    const data = await apiHandler(url, req.params.id);
    const movie = { id: data.data.id,
                ...data.data.attributes,
            }

            const movieIntro = md.render(movie.intro);

    if(movie){
        res.render('movie', {movie,movieIntro });
    } else {
        res.status(404).render('404');
    }
});

// Handles requests that have a match on the PAGES array.
// else it returns a 404 template. 

app.get('/:path', (req, res) => {

    if(PAGES.includes(req.params.path)){
        res.render(`${req.params.path}`)
    } else {
        res.status(404).render('404');
    }
});

export default app;