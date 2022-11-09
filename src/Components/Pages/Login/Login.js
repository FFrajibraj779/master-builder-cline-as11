import React from "react";
import { UserContext } from "../../AuthContext/AuthContex";
import { useContext } from "react";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../image/googlelogo.png";
import useTitle from "../useTitle/useTitle";

const Login = () => {
  const { emailLogin, googleLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useTitle('login')
  const googleLoginBtn = () => {

    googleLogin()
      .then((result) => {
        const user = result.user;
        const currentUser={
          email:user?.email
        }
        // fetch('http://localhost:5000/jwt',{
        //   method:"POST",
        //   headers:{
        //     'content-type' : 'application/json'
        //   },
        //   body: JSON.stringify(currentUser)
        // })
        // .then(res=>res.json())
        // .then(data =>{
        //   console.log(data);
      
        //   localStorage.setItem('token', data.token)
        // })
        console.log(user);
        toast.success("login successfully");
        navigate('/');
      })
      .catch();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    emailLogin(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        const currentUser={
          email:user?.email
        }
        console.log(user);
        // fetch('http://localhost:5000/jwt',{
        //   method:"POST",
        //   headers:{
        //     'content-type' : 'application/json'
        //   },
        //   body: JSON.stringify(currentUser)
        // })
        // .then(res=>res.json())
        // .then(data =>{
        //   console.log(data);
      
        //   localStorage.setItem('token', data.token)
        // })
        toast.success("login successfully");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mx-auto lg:w-5/12 mb-4 border">
      <h3 className="text-center lg:text-3xl font-bold capitalize">
        Please LogIn
      </h3>

      <form className=" p-4 " onSubmit={handleLogin}>
        <label htmlFor="name">Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          className="border p-3 rounded-md w-5/6"
        />
        <br />
        <label htmlFor="name">password</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="border p-3 rounded-md w-5/6"
        />
        <br />

        <button
          type="submit"
          className=" btn btn-outline btn-primary w-64 lg:ml-20 mt-5"
        >
          Login
        </button>

        <div className="text-center mt-5">
          <p className="text-center">
            create a new account please{" "}
            <Link to="/register" className="text-red-300 underline">
              register
            </Link>
          </p>
        </div>

        <div className=" my-3 w-80  ">
          <button onClick={googleLoginBtn} className="flex gap-12 align-middle lg:ml-20 border border-blue-700 rounded-xl">
            <img src={logo} className="lg:w-14 w-6 border rounded-box " alt="" />
            <p className="font-bold lg:text-xl capitalize mr-2 lg:mt-1"> google login</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
