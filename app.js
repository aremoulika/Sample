var express=require('express')
//var sql=require('mysql2')
var bp=require('body-parser')
var encodedata=bp.urlencoded({extended:true})

var app=express()
// var client=sql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'Durga3006@sql',
//     database:'canteen'
// })
app.set('view engine','ejs')

app.get('/',function(req,res){
    res.render('home')
})

app.get('/register',function(req,res){
    res.render('reg')
})
app.post('/register',encodedata,function(req,res){
    var name=req.body.name;
    var rno=req.body.rno;
    var phno=req.body.phno;
    var pwd=req.body.pwd;
    console.log(name,rno,phno,pwd)
    var sql="INSERT INTO details(rno,name,pwd,phno) VALUES('"+rno+"','"+name+"','"+pwd+"','"+phno+"')"
    client.connect(function(err){
        if(err) throw err;
    client.query(sql,function(err,result){
        if(err){
            throw err;
        }
        else{
            home.ejs// var sql1="create table "+rno+" (tokenid int(5),items json,cost int,status varchar(15),orderdate date,deliverydate date,primary key (tokenid))"
            client.query(sql1,function(err,data){
                if(err) throw err
                console.log('table created')
            })
            res.render('pages/home')
            console.log("user created");
            res.redirect('/')
        }
    })
})
})

app.get('/login',function(req,res){
    res.render('login')
})
app.post('/login',encodedata,function(req,res){
    var rno=req.body.rno;
    var pwd=req.body.pwd;
    client.connect(function(err){
        if(err) throw err;
        else{
            var sql1="select * from details"
            client.query(sql1,function(err,data){
                if(err) throw err;
                var flag=0;
                for(let x of data){
                    if(x['rno']==rno && x['pwd']==pwd){
                        console.log(rno,pwd)
                        flag=1;
                    }
                }
                if(flag==1)
                {
                    console.log("valid user");
                    res.redirect('/')
                }
                else{
                    console.log("invalid user");
                    res.redirect('/');
                }
                // if(flag==1){
                //     var sql2="select name,email from stu_todo where email='"+email+"'"
                //     client.query(sql2,function(err,result){
                //         if(err) throw err
                //         for(let x of result){
                //             global.n=x['name']
                //             global.e=x['email']
                //         }
                //     })
                //     res.redirect('/user')
                // }
                // else{
                //     res.redirect('/home')
                // }
            })
        }
    })
})


app.listen(2002)