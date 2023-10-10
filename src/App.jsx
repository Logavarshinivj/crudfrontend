import { useState } from 'react'
import * as React from 'react';
import reactLogo from './assets/react.svg'
import './App.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Routes, Route, Link, useNavigate, useParams ,Outlet,Navigate} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useEffect } from 'react';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';




export default function App(){

  const navigate=useNavigate()
  const[user,setUser]=useState([])
  const auth=localStorage.getItem('user')
  const logout=()=>{
    localStorage.clear()
    navigate("/register")
  }
  // const [user,setUser]=useState(
  //   [
  //     {id:0,name:"varshu","age":18,"gender":"male",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxUXYmbcwcoIYKhXgzZut6BPn_7FsIi1VL5A&usqp=CAU",tmark:90,emark:50,smark:78,mmark:90,somark:56},
  //     {id:1,name:"ram","age":23,"gender":"male",img:"https://img.freepik.com/free-vector/cute-boy-going-school-cartoon-vector-icon-illustration-people-education-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-4015.jpg",tmark:78,emark:89,smark:90,mmark:78,somark:76},
  //     {id:2,name:"murugan","age":19,"gender":"male",img:"https://img.freepik.com/premium-vector/cute-boy-thumbs-up-cartoon-vector-icon-illustration_480044-168.jpg?w=2000",tmark:90,emark:98,smark:97,mmark:99,somark:89},
  //     {id:3,name:"shershah","age":15,"gender":"female",img:"https://img.freepik.com/premium-vector/little-boy-back-school-design_346903-1477.jpg",tmark:56,emark:45,smark:90,mmark:59,somark:74},
  //     {id:4,name:"nirupan","age":28,"gender":"male",img:"https://cutewallpaper.org/cdn-cgi/mirage/91b98c5373d6a01796e55b9f978389531ff4e5ebae85abd935c54ab8d42fdd46/1280/24/cartoon-girl-pic/3205915245.jpg",tmark:34,emark:90,smark:89,mmark:69,somark:71},
  //     {id:5,name:"thajmola","age":42,"gender":"male",img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpl9HNN4lgJPgotfZ_2NMs5MFZmjhsdsc-PBhbOw1szgHaRfkoFlcRbvnAk2LPNyYPDvw&usqp=CAU",tmark:90,emark:100,smark:100,mmark:100,somark:100},
  
  //   ])
    useEffect(()=>{
      fetch("https://crud-be-ebon.vercel.app/getallusers")
    .then((res)=>res.json())
    .then((data)=>setUser(data))
    },[])

    // useEffect(()=>{
    //   getUsers(),[]
    // })

    // const getUsers=async()=>{
    //   let data=await fetch("http://localhost:4000/getallusers")
    //   data=await data.json()
    //   setUser(data)
    // }

   
    // console.log(user[1])
  return(
    <div className="App">
       {/* <AppBar position="static" color="secondary">
        <Toolbar>
         
          <Button onClick={()=>navigate("/")} color="inherit">Home</Button>
          <Button onClick={()=>navigate("/user-details")} color="inherit">User Details</Button>
          <Button onClick={()=>navigate("/add-user")} color="inherit">Add User</Button>
          {auth? <Button onClick={logout}  color="inherit">Logout</Button>:<>
          <Button onClick={()=>navigate("/register")} color="inherit">Sign Up</Button>
          <Button onClick={()=>navigate("/login")} color="inherit">LogIN</Button>
          </>
          }
        </Toolbar>
      </AppBar> */}
      {auth?
      <AppBar position="static" color="secondary">
        <Toolbar>
         
          <Button onClick={()=>navigate("/")} color="inherit">Home</Button>
          <Button onClick={()=>navigate("/user-details")} color="inherit">User Details</Button>
          <Button onClick={()=>navigate("/add-user")} color="inherit">Add User</Button>
          <Button onClick={logout}  color="inherit">Logout</Button>
          </Toolbar>
         </AppBar>:
          <AppBar position="static" color="secondary">
          <Toolbar>
          <Button onClick={()=>navigate("/register")} color="inherit">Sign Up</Button>
          <Button onClick={()=>navigate("/login")} color="inherit">LogIN</Button>
          
        </Toolbar>
      </AppBar>
}


       {/* <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/user-details">UserDetails</Link></li>
          <li><Link to="/add-user">AddUser</Link></li>
          
        </ul>
       </nav> */}
       <Routes>
        <Route element={<Private/>}>
        <Route path="/" exact element={<Home />} />
        <Route path="/user-details" exact element={<Details user={user} />} />
        <Route path="/add-user" exact element={<AddUser />} />
        <Route path="/*" exact element={<NotFound />} />
        <Route path="/user/:id" exact element={<MarkDetails user={user} setUser={setUser} />}/>
        {/* <Route path="/update-user" exact elememt={<Test />}/> */}
        <Route path="/update-user/:id" element={< UpdateUser title='Test' /> } />
        </Route>
        <Route path="/register" element={< SignUp /> } />
        <Route path="/login" element={< Login /> } />
        
        {/* <Route path="/update" component={UpdatePage}/> */}

      </Routes>
    </div>
    
  )
}
  function Details({user,id}) {
    
  return(
  <div className="test">
    <UserDetails user={user}  />
  </div>
  )
  }




function UserDetails({user,id}){
  const styles={
    "overflow":"auto",
  }
  const navigate=useNavigate()
  
  return(
    <div className="table-section" style={styles}>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Image</th>
          <th>Marks</th>
          <th>Action</th>
          <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {user.map((usr,index)=>(<Sample user={usr} id={index}/>))}

        </tbody>
      </table>
    </div>
  )
}

// function UserDetails1({user}){
//   return(
//     <div className="container">
//       <Card >
//         <img src={user.img}/>
//         <h1>Name:{user.name}</h1>
//         <h2>Age:{user.age}</h2>
//       </Card>
//     </div>
//   )
// }

function Home(){
const styles={
  color:"#ffd900",
}
  return(
   <div className='home'>
      <h1 style={styles}>Greetings!</h1>
       <h2>Welcome,  Dear Students🎉</h2>
       <img className="home-img" src="https://media.istockphoto.com/id/1153687666/vector/multiracial-children-sitting-around-round-table-with-pile-of-books-on-it-and-listening-to.jpg?s=612x612&w=0&k=20&c=WChB3menkHFamP3mEVG0Sjd6NBqHpjlX-i_cxIcO5To="></img>
   </div>
    
  )
}

 function NotFound(){
  return(
    <img src="https://media1.giphy.com/media/xTiN0L7EW5trfOvEk0/giphy.gif"></img>
  )
}


function AddUser(){
  const[name,setName]=useState("")
  const[age,setAge]=useState("")
  const[gender,setGender]=useState("")
  const[img,setImg]=useState("")
  const[tmark,setTmark]=useState("")
  const[emark,setEmark]=useState("")
  const[smark,setSmark]=useState("")
  const[mmark,setMmark]=useState("")
  const[somark,setSomark]=useState("")

const navigate=useNavigate()
  const newuser={
    name,
    age,
    gender,
    img,
    tmark,
    emark,
    smark,
    mmark,
    somark
  }
  console.log(newuser)

  // try{
  //   const  result=  axios.post("/adduser",newuser).data
  //   console.log(result)


  // }
  // catch(e){
  //   console.log(error)
  // }

  // fetch("http://localhost:4000/adduser", {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     name:name,
  //     age:age,
  //     gender:gender,
  //     image:image,
  //     tmark:tmark,,
  //     emark:emark,
  //     smark:smark,
  //     mmark:mmark,
  //     somark:somark
  //   }),
  //   headers: {
  //     'Content-type': 'application/json; charset=UTF-8',
  //   },
  // })
  //    .then((response) => response.json())
  //    .then((data) => {
  //       console.log(data);
        
  //       // Handle data
  //    })
  //    .catch((err) => {
  //       console.log(err.message);
  //    });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
       .post('https://crud-be-ebon.vercel.app/getallusers', newuser)
       .then((res) => {
          setName((name) => [res.data, ...name]);
          setAge((age) => [res.data, ...age]);
          setGender((gender) => [res.data, ...gender]);
          setImg((img) => [res.data, ...img]);
          setTmark((tmark) => [res.data, ...tmark]);
          setEmark((emark) => [res.data, ...emark]);
          setSmark((smark) => [res.data, ...smark]);
          setMmark((mmark) => [res.data, ...mmark]);
          setSomark((somark) => [res.data, ...somark]);
          navigate("/user-details")
       })
       
      
     
       .catch((err) => {
          console.log(err.message);
       });
 };
    
  return(
    <div className='adduser-form'>
      <h2>Personal Details</h2>
      <TextField label="Name"  id="outlined-basic" color="secondary" type="text" placeholder="Name" onChange={(event)=>setName(event.target.value)}/>
      <TextField  label="Age" id="outlined-basic" color="secondary"  type="number" placeholder="Age"  onChange={(event)=>setAge(event.target.value)}/>
      <Select name="gender" color="secondary" onChange={(event)=>setGender(event.target.value)} >
      <MenuItem value="male">Male</MenuItem>
      <MenuItem value="female">Female</MenuItem>
      </Select>
      <TextField label="Image" id="outlined-basic" color="secondary"   type="text" placeholder="Image"  onChange={(event)=>setImg(event.target.value)}/>
      <h2>Mark Details</h2>
      <TextField  label="Marks obtained in Tamil" id="outlined-basic" color="secondary"  type="number" placeholder="Marks obtained in Tamil"  onChange={(event)=>setTmark(event.target.value)}/>
      <TextField  label="Marks obtained in English" id="outlined-basic" color="secondary"  type="number" placeholder="Marks obtained in English"  onChange={(event)=>setEmark(event.target.value)}/>
      <TextField  label="Marks obtained in Science" id="outlined-basic" color="secondary"  type="number" placeholder="Marks obtained in Science"  onChange={(event)=>setSmark(event.target.value)}/>
      <TextField  label="Marks obtained in Maths" id="outlined-basic" color="secondary"  type="number" placeholder="Marks obtained in Maths"  onChange={(event)=>setMmark(event.target.value)}/>
      <TextField  label="Marks obtained in Social" id="outlined-basic" color="secondary"  type="number" placeholder="Marks obtained in Social"  onChange={(event)=>setSomark(event.target.value)}/>
      <Button variant="contained" color="secondary" onClick={handleSubmit}>ADD USER</Button>
      </div>
  )
}





function Sample({user,id}){
  const navigate=useNavigate()

  const deleteUser=async(id)=>{
    console.warn(id)
  let result= await fetch (`https://crud-be-ebon.vercel.app/${id}`,{
    method: 'DELETE',
  });
  result=await result.json();
  if(result){
    alert("user deleted successfully")
  }
  }
  return(
    
          <tr>
          <td>{user.name}</td>
          <td>{user.age}</td>
          <td>{user.gender}</td>
          <td><img src={user.img}></img></td>
          <td><Button onClick={()=>navigate(`/user/${id}`)}>View marks</Button></td>
          {/* <td><Button onClick={()=>navigate("/update")}>Edit</Button></td> */}
          <td><Link to={"/update-user/"+ user._id}><EditIcon/></Link></td>
         
          <td><IconButton aria-label="delete" size="small" onClick={()=>deleteUser(user._id)}>
  <DeleteIcon fontSize="inherit" />
</IconButton></td>
          </tr>
         
          
    
  
  )
}

function MarkDetails({user,setUser}){
  console.log(useParams())
  console.log(user)
 const navigate=useNavigate()
  const {id}=useParams()
  const x=user[id]
 const total=x.tmark+x.emark+x.smark+x.mmark+x.somark 
 const percentage=total/5
  return(
    <div>
      <h1>Mark details page of {x.name}</h1>
      <table>
        <tr>
          <th>Subject</th>
          <th>Marks</th>
        </tr>
        <tr>
          <th>Tamil</th>
          <th>{x.tmark}</th>
        </tr>
        <tr>
          <th>English</th>
          <th>{x.emark}</th>
        </tr>
        <tr>
          <th>Science</th>
          <th>{x.smark}</th>
        </tr>
        <tr>
          <th>Maths</th>
          <th>{x.mmark}</th>
        </tr>
        <tr>
          <th>Social</th>
          <th>{x.somark}</th>
        </tr>
        <tr>
          <th>Total</th>
          <th>{total}</th>
        </tr>
        <tr>
          <th>Percentage</th>
          <th>{percentage}</th>
        </tr>
      </table>
      {total>450?<h4 className='comments'>Have a great job🎉</h4>:<h4 className='comments'>Need Some Improvement💡</h4>}
      <Button variant="contained" color="primary" className="back-btn" onClick={()=>navigate(-1)}>Back</Button>
    </div>
  )
}

// onClick={()=>{
//   const newUser={
//     name:name,
//     age:age,
//     gender:gender,
//     img:image,
//     tmark:tmark,
//     emark:emark,
//     smark:smark,
//     mmark:mmark,
//     somark:somark
//   }
//   setUser([...user,newUser])
//   console.log(newUser)
// } }>ADD USER</Button>



function UpdateUser(){
  
  const[name,setName]=useState("")
  const[age,setAge]=useState("")
  const[gender,setGender]=useState("")
  const[img,setImg]=useState("")
  const[tmark,setTmark]=useState("")
  const[emark,setEmark]=useState("")
  const[smark,setSmark]=useState("")
  const[mmark,setMmark]=useState("")
  const[somark,setSomark]=useState("")
  const navigate=useNavigate()
  const{id}=useParams()

  useEffect(()=>{
    getUser()

  },[])

  const getUser=async()=>{
    var result=await fetch(`https://crud-be-ebon.vercel.app/getuser/${id}`)
    result= await result.json()
    console.log(result.name)
    setName(result.name)
    setAge(result.age)
    setGender(result.gender)
    setImg(result.img)
    setTmark(result.tmark)
    setEmark(result.emark)
    setSmark(result.smark)
    setMmark(result.mmark)
    setSomark(result.somark)
  }
  
const updateProduct=async()=>{
  let result=await fetch(`https://crud-be-ebon.vercel.app/update-user/${id}`,
  {
    method: 'PUT',
    body: JSON.stringify({ name, age,gender,img,tmark,emark,smark,mmark,somark}),
    headers: { 'Content-Type': 'application/json',
    }
  })

  result= await result.json()
  if(result){
    navigate("/user-details")
  }

}

    
  return(
    <div className='adduser-form'>
      <h2>Personal Details</h2>
      <TextField label="Name"  id="outlined-basic" color="secondary" type="text" placeholder="Name" value={name} onChange={(event)=>setName(event.target.value)}/>
      <TextField  label="Age" id="outlined-basic" color="secondary"  type="number" placeholder="Age" value={age} onChange={(event)=>setAge(event.target.value)}/>
      <Select name="gender" color="secondary" value={gender} onChange={(event)=>setGender(event.target.value)} >
      <MenuItem >Male</MenuItem>
      <MenuItem >Female</MenuItem>
      </Select>
   
      <TextField label="Image" id="outlined-basic" color="secondary" value={img}   type="text" placeholder="Image"  onChange={(event)=>setImg(event.target.value)}/>
      <h2>Mark Details</h2>
      <TextField  label="Marks obtained in Tamil" id="outlined-basic" value={tmark} color="secondary"  type="number" placeholder="Marks obtained in Tamil"  onChange={(event)=>setTmark(event.target.value)}/>
      <TextField  label="Marks obtained in English" id="outlined-basic" value={emark} color="secondary"  type="number" placeholder="Marks obtained in English"  onChange={(event)=>setEmark(event.target.value)}/>
      <TextField  label="Marks obtained in Science" id="outlined-basic" value={smark} color="secondary"  type="number" placeholder="Marks obtained in Science"  onChange={(event)=>setSmark(event.target.value)}/>
      <TextField  label="Marks obtained in Maths" id="outlined-basic" value={mmark} color="secondary"  type="number" placeholder="Marks obtained in Maths"  onChange={(event)=>setMmark(event.target.value)}/>
      <TextField  label="Marks obtained in Social" id="outlined-basic" value={somark} color="secondary"  type="number" placeholder="Marks obtained in Social"  onChange={(event)=>setSomark(event.target.value)}/>
      <Button variant="contained" color="secondary" onClick={updateProduct}>SAVE</Button>
      </div>
  )
  
}


function SignUp(){
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate=useNavigate()
//   useEffect(()=>{
//     const auth=localStorage.getItem('user')
//     if(auth){
//       Navigate("/")
//     }
//   },[])
//  const collectData=async()=>{
//   let result=await fetch("https://crud-be-ebon.vercel.app/register",
//   {
//     method: 'POST',
//     body: JSON.stringify({email,password}),
//     headers: { 'Content-Type': 'application/json',}
//   })

//   result= await result.json()
//   if(result){
//     localStorage.setItem("user", JSON.stringify(result))
//     navigate("/")
//   }
// }

const collectData=async()=>{
  setEmailError('')
  setPasswordError('')
  if (!email) {
    setEmailError('Email is required*')
    return
  }
  if (!password) {
    setPasswordError('Password is required*')
    return
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    setEmailError('Please enter a valid email address*')
    return
  }
  if (password.length < 6) {
    setPasswordError('Password must be at least 6 characters long*')
    return
  }
  let result=await fetch("https://crud-be-ebon.vercel.app/register",
  {
    method: 'POST',
    body: JSON.stringify({email,password}),
    headers: { 'Content-Type': 'application/json'}
  })

  result= await result.json()
  if(result.message === 'User already exists'){
    alert("User already exists")
}
  else if(result){
   
      localStorage.setItem("user", JSON.stringify(result))
      navigate("/login")
      alert("Registration Successful")
    
        
    }
  else{
      alert("already registered")
  }
  
  // if(result){
  //   localStorage.setItem("user", JSON.stringify(result))
  //   navigate("/")
  // }
}

  return(
    <div className='signup-form'>
      <h1>Register</h1>
      <TextField  id="standard-basic" label="Email Address" variant="standard"color="secondary" type="email" placeholder="Enter your email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <TextField id="standard-basic" label="Password" variant="standard"color="secondary" type="password"  placeholder="Set your password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <Button  variant="contained" color="secondary" type="button" onClick={collectData}>Sign Up</Button>  
    </div>
  )
}

// function Login(){
//   const [email,setEmail]=useState()
//   const [password,setPassword]=useState()
//   const navigate=useNavigate()
//   useEffect(()=>{
//     const auth=localStorage.getItem('user')
//     if(auth){
//       Navigate("/")
//     }
//   },[])
//   const handleLogin=async()=>{
//     let result=await fetch("https://crud-be-ebon.vercel.app/login",
//     {
      
//       method: 'POST',
//     body: JSON.stringify({email,password}),
//     headers: { 'Content-Type': 'application/json',
    

//   },
    
//     })
//     result= await result.json()
//     if(result.email){
//       localStorage.setItem("user", JSON.stringify(result))
//       navigate("/")
//     }
//     else{
//       alert("Invalid username or password")
//     }

    
//   }
function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const navigate=useNavigate()
  // useEffect(()=>{
  //   const auth=localStorage.getItem('user')
  //   if(auth){
  //     navigate("/")
  //   }
  // },[])
  const handleLogin=async()=>{
    setEmailError('')
    setPasswordError('')
    if (!email) {
      setEmailError('Email is required*')
      return
    }
    if (!password) {
      setPasswordError('Password is required*')
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address*')
      return
    }
    
    let result=await fetch("https://crud-be-ebon.vercel.app/login",
    {
      
      method: 'POST',
    body: JSON.stringify({email,password}),
    headers: { 'Content-Type': 'application/json'}
    })
    result= await result.json()
    if(result.email){
        localStorage.setItem("user", JSON.stringify(result))
        navigate("/")
      }
      else{
        alert("Invalid username or password")
      }
   
  }
  return(
    <div className='signin-form'>
      <h1>SIGN IN</h1>
      <TextField  id="standard-basic" label="Email Address" variant="standard"color="secondary" type="email" placeholder="Enter your email address" value={email} onChange={(event)=>setEmail(event.target.value)}/>
      <TextField id="standard-basic" label="Password" variant="standard"color="secondary" type="password"  placeholder="Set your password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
      <Button  variant="contained" color="secondary" type="button" onClick={handleLogin} >LOGIN</Button>  
    </div>
  )
}

// function LogOut(){
//   return(

//   )
// }


function Private(){
  
    const auth=localStorage.getItem('user')
     return auth? <Outlet/>:<Navigate to="register"/>
  
}