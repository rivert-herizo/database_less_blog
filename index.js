import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

var blog_posts = [{title:"This is post 1", content: "This is content 1"}, {title:"This is post 2", content: "This is content 2"}];

app.get('/', (req, res) => {
    res.render('index.ejs', {posts : blog_posts });
});

app.post('/submit', (req, res) => {
    const title = req.body['title'];
    const content = req.body['content'];

    const new_post = {title, content};
    blog_posts.push(new_post);

    res.render("index.ejs", {posts: blog_posts});
})

app.post('/edit', (req, res) => {
    const title = req.body['edit-title'];
    const content = req.body['edit-content'];
    const id = Number(req.body['id']);

    const edited_post = {title, content};
    blog_posts[id] = edited_post;

    res.render("index.ejs", {posts: blog_posts});
})

app.post('/delete', (req, res) => {
    const id = Number(req.body['delete_id']);

    
    delete blog_posts[id];

    res.render("index.ejs", {posts: blog_posts});
})

app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
})

