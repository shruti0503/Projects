import {db} from '../db.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register =(req,res)=>{

    //check exisiting user
    const q = "SELECT * FROM user WHERE email = ? OR username = ?";
    console.log("ndewjk", req.body.email);


    db.query(q, [req.body.email, req.body.username], (err, data) => {
        // Rest of the code remains unchanged
    
        if(err) return res.json(err);
        if(data.length) return res.status(409).json("User already exists");

        //hashed passowrd , create a user
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password, salt)

        //inser user to db
        const q="INSERT INTO user(`username`, `email`,`password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ];
        

        db.query(q,[values],(err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("user has been created")
        } )


    })

}

export const login =(req,res)=>{
    //check if user exists
    const q="SELECT * FROM users WHERE username = ?";
    console.log(req)
    db.query(q,[req.body.username], (err,data)=>{ // data here is an array
        if(err) return res.json(err);
        if(data.length===0) return res.status(404).json("User not found")
    })
    
    // if exists then check passowrd , and compare text with the passwords 
    // using conpare fn of bycrptjs
   const isPass=bcrypt.compareSync(req.body.password,data[0].password);
   if(!isPass) return res.status(400).json("wrong username or password")
   // but the user info is not gonna be stored 
   // json authentication , before updating , deleting ensure that bekongs to us  , we use json web token

const token=jwt.sign({id:data[0].id}, "jwtkey") //token is stored in cookie 
const {password,...other}=data[0];
 res.cookie("access_token",token,{
    httpOnly:true
 }).status(200).json(other)

    
}

export const logout =(req,res)=>{
    
}

