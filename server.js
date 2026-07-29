const express=require('express');
const mysql= require('mysql2');
const cors= require('cors');
const app=express();

app.use(cors());
app.use(express.json());
app.use(express.static('.'));// it will serve index.html,style.css,script.js

// mysql connection setup (pool setup connects multipule connection so that connection does't crash)
const db= mysql.createPool({
    host:'localhost',
    user:'root',
    password:'Avishka@1234',
    database:'saas_dashboard'
});
// to fetch posts
app.get('/api/posts',(req,res)=>{
    let q=`SELECT * FROM posts ORDER BY id DESC`;
    db.query(q,(err,result)=>{
        if(err){
            console.error("get error:",err.message)
            return res.status(500).json({error:err.message});
        } 
        res.json(result);
    });
});
// to inser new post
app.post('/api/posts',(req,res)=>{
    console.log("incoming data:",req.body);
    let sql='';
    let data=[];
    if (Array.isArray(req.body)) {
        // Bulk Insert Case
        sql = `INSERT INTO posts (title, release_date, views, status) VALUES ?`;
        data = [req.body.map(post => [post.title,
             post.date && post.date.trim()!==''? post.date:null,
              post.views, post.status])];
    } else {
        // Single Form Submit Case (Modal Form se jo aata hai)
        const { title, date, views, status } = req.body;
        const releaseDate = date && date.trim() !== '' ? date : null;
        sql = `INSERT INTO posts (title, release_date, views, status) VALUES (?, ?, ?, ?)`;
        data = [title, date, views, status];
    }
    db.query(sql, data, (err, result) => {
        if (err) {
            console.error(" MySQL Insert Error:", err.message);
            return res.status(500).json({ error: err.message });
        }
        console.log(" Data successfully saved in MySQL! Row ID:", result.insertId || result.affectedRows);
        res.json({ message: "Post saved successfully!", result });
    });
});
// to delete post
app.delete("/api/posts/:id",(req,res)=>{
    const {id}=req.params;
    let q=`DELETE FROM posts WHERE id = ?`;
    db.query(q,[id],(err,result)=>{
        if(err){
            console.error(" Delete Error:", err.message);
             return res.status(500).json({ error: err.message });
        }
        res.json({message:"post deleted successfully"});
    });
});
app.get("/",(req,res)=>{
    res.send("success");
})
app.listen(8080,()=>{
    console.log("server successfully running on port 8080")
});

