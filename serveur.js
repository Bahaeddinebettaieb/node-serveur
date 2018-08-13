var express= require("express");
var cors= require("cors");
const bodyparser= require ("body-parser");
var mysql= require('mysql');

var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'dbnode'
    });
con.connect(function(err) {
    if(err) throw err;
    console.log('connected');
})

var app= express();

app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
    app.get("/allS", function(req,res){

    // res.send("ok");
        users =[{
        id_Utilisateur:1,
        nom:'Bettaieb',
        prenom:'Bahaeddine',
        email:'baha.1996.bt@gmail.com',
        etat:'faible',
        role:'Admin'
    },{
        id_Utilisateur:2,
        nom:'Rassas',
        prenom:'Ahmed Amine',
        email:'AmineRassas@gmail.com',
        etat:'faible',
        role:'utilisateur'
    },{
        id_Utilisateur:3,
        nom:'Bettaieb',
        prenom:'Walaeddine',
        email:'WalaBettaieb@gmail.com',
        etat:'faible',
        role:'Utilisateur'
    },{
        id_Utilisateur:4,
        nom:'Bettaieb',
        prenom:'Fathi',
        email:'FathiBettaieb@gmail.com',
        etat:'faible',
        role:'SupUtilisateur'
    }];
    res.send(JSON.stringify(users));
    })

        // function select all user
    app.get("/all", function(req,res){
        con.query("select * from user", function(err,result){
            if(err){
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    })

    app.get("/email", function(req,res){
        con.query("select email from user", function(err,result){
            if(err){
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    })

        // function for login
    /*app.post("/veriforg",function(req,res){
        console.log(req.body.email);
        con.query("select count(*) as found from user where email='"+req.body.email+"' and password="+req.body.password, function(err,result){
        //con.query("select count(*) from user where email='baha.1996.bt@gmail.com' and password=123123", function(err,result){ 
    if(err){
        res.send("erreur");
        console.log(err);
        }else {
            console.log(result[0].found);
            if (result[0].found === 1){
            res.status(200).send(JSON.stringify(result));	
            }else{
                res.status(500).send("erreur");	
            }
            console.log(JSON.stringify(result));
        }
        })
    })*/

    app.post("/verif",function(req,res){
        console.log(req.body.email);
        con.query("select * from user where email='"+req.body.email+"' and password="+req.body.password, function(err,result){
        //con.query("select count(*) from user where email='baha.1996.bt@gmail.com' and password=123123", function(err,result){ 
    if(err){
        res.send("erreur");
        console.log(err);
        }else {
            console.log(result[0].email);
            if (result[0].email ){
            res.status(200).send(JSON.stringify(result));	
            }else{
                res.status(500).send("erreur");	
            }
            console.log(JSON.stringify(result));
        }
        })
    })


    // function that return user using email 
    app.post("/getnom",function(req,res){
        console.log(req.body.email);
        con.query("select nom from user where email='"+req.body.email, function(err,result){ 
    if(err){
        res.send("erreur");
        console.log(err);
        }else {
            console.log(result[0].found);
            if (result[0].found === 1){
            res.status(200).send(JSON.stringify(result));	
            }else{
                res.status(500).send("erreur");	
            }
            console.log(JSON.stringify(result));
        }
        })
    })

        // function for add a new user
    app.post("/ajout",function(req,res){
        con.query("insert into user (nom,prenom,email,etat,role,password,telephone,adresse) values ('"+req.body.nom+"','"+req.body.prenom+"','"+req.body.email+"',\"active\",'"+req.body.role+"',"+req.body.pass+","+req.body.tel+",'"+req.body.adr+"')", function(err,result){
        if(err){
            res.send("erreur");
            console.log(err);}
            else {
                console.log(result.affectedRows);
                if (result.affectedRows === 1){
                    res.status(200).send(JSON.stringify(result));	
                    console.log("utilisateur ajoutee");
                }else{
                    res.status(500).send("erreur");	
                }
            }
        })
    })

        //function for remove user
    app.post("/removeuser",function(req,res){+
        con.query("DELETE from user where id_Utilisateur ="+req.body.id+"",function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    })

        // function for update user
    app.post("/updateuser",function(req,res){
    // console.log(req.body.tel);
        con.query("update user set nom ='"+req.body.nom+"',prenom = '"+req.body.prenom+"',email ='"+req.body.email+"',role = '"+req.body.role+"', password = "+req.body.pwd+", telephone = "+req.body.tel+", adresse = '"+req.body.adr+"' where id_Utilisateur ="+req.body.id,function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    })

        //function for select one user using the id
    app.post("/getuser",function(req,res){
        con.query("select * from user where id_Utilisateur ="+req.body.id ,function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
        })
    })
        // function for select user using the email
    app.post("/getuseremail",function(req,res){
        con.query("select * from user where email = '"+req.body.email+"'",function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
        })
    })



        // funcrion for select all tickets
    app.get("/alltick", function(req,res){
        con.query("select * from ticket", function(err,result){
            if(err){
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
            }
        })
    })

        //function for remove ticket
    app.post("/removeticket",function(req,res){+
        con.query("DELETE from ticket where id_ticket ="+req.body.id+"",function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
                console.log('ticket effacer');
            }
        })
    })

    //function for select one ticket
    app.post("/getticket",function(req,res){
        con.query("select * from ticket where id_ticket ="+ req.body.id ,function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur uyfytfyt");
            }else{
                res.send(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
        })
    })

    //function for update ticket
    app.post("/updateticket",function(req,res){
         con.query("update ticket set label ='"+req.body.label+"',description = '"+req.body.description+"',statut ='"+req.body.statut+"', responsable = '"+req.body.responsable+"', demandeur = '"+req.body.demandeur+"', dateouv = '"+req.body.dateouv+"', datefer = '"+req.body.datefer+"' where id_ticket ="+req.body.id,function (err ,result){
             if(err){
                 console.log(err);
                 res.send("erreur");
             }else{
                 res.send(JSON.stringify(result));
             }
         })
     })  

     // function for add a new ticket
    app.post("/ajouttick",function(req,res){
        con.query("insert into ticket (label,description,statut,demandeur,responsable,urgence,dateouv,datefer) values ('"+req.body.label+"','"+req.body.description+"',\"Ouvert\",'"+req.body.demandeur+"','"+req.body.responsable+"','"+req.body.urgence+"','"+req.body.dateouv+"','"+req.body.datefer+"')", function(err,result){
        if(err){
            res.send("erreur");
            console.log(err);}
            else {
                console.log(result.affectedRows);
                if (result.affectedRows === 1){
                    res.status(200).send(JSON.stringify(result));	
                    console.log("ticket ajoutee");
                }else{
                    res.status(500).send("erreur");	
                }
            }
        })
    })

     // function for select statut of ticket using the id
     app.post("/getstatut",function(req,res){
        con.query("select statut from ticket where id_ticket = "+req.body.id,function (err ,result){
            if(err){
                console.log(err);
                res.send("erreur");
            }else{
                res.send(JSON.stringify(result));
                console.log(JSON.stringify(result));
            }
        })
    })

    
     
    app.listen(3000, function() {
        console.log("http://localhost:3000");
    })