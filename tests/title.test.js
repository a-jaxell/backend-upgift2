import request from "supertest";
import app from "../js/server/server-logic";

// testa ifall datan den får ifrån API är det samma som läggs in i HTML

test('Index contains a list of movies', async () => {
    const response = await request(app)
        .get('/')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .expect(200)

    expect(response.text.includes('Encanto')).toBeTruthy();

});

test('Individual movie-page contains correct title', async () => {
    const response = await request(app)
        .get('/movies/4')
        .expect(200)
        .expect('Content-Type', 'text/html; charset=utf-8')

    expect(response.text.includes('Totoro')).toBeTruthy();
    expect(response.text.includes('Encanto')).toBeFalsy();
})