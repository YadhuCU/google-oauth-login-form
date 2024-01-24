import { useState, useRef, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdKey } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const usernameRef = useRef(null);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [usernameError, setUsernameError] = useState(false);
  const [show, setShow] = useState(true);

  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({});

  const container = useRef(null);

  // auto focusing input box
  useEffect(() => {
    if (usernameRef.current) {
      usernameRef.current.focus();
    }
  }, []);

  // google oauth
  useEffect(() => {
    if (Object.keys(user).length > 0) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => setProfile(res.data))
        .catch((error) => console.log("Error axios: -> ", error));
    }
  }, [user]);

  // gsap animation
  useGSAP(
    () => {
      gsap.from(".animation", {
        x: "100px",
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });
    },
    { dependencies: [profile], scope: container },
  );

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    if (value.match(/^[a-zA-Z0-9]*$/)) {
      setUsernameError(false);
    } else {
      setUsernameError(true);
    }
    setUsername(value);
  };

  const showPassword = () => {
    setShow((prev) => !prev);
  };

  const handleLogin = () => {
    const newProfile = {
      name: username,
      email: "",
    };
    setUsername("");
    setPassword("");
    setProfile(newProfile);
  };

  const loginUsingGoogle = useGoogleLogin({
    onSuccess: (res) => setUser(res),
    onError: (error) => console.log("Error", error),
  });

  const logout = () => {
    googleLogout();
    setProfile({});
  };

  return (
    <div ref={container}>
      {Object.keys(profile).length === 0 ? (
        <div className="md:min-w-[500px] p-5 flex flex-col gap-5">
          <p className="animation text-center text-3xl font-[var(--fw-600)] tracking-widest">
            Sing In
          </p>
          {/* username */}
          <div className="animation w-full">
            <div
              className={`w-full px-5 flex items-center   rounded-[var(--br)] ${
                username
                  ? "border-[2pt] border-[var(--clr-blue-medium)]"
                  : "border-[2pt] border-slate-500"
              }`}
            >
              <FaUser />
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsernameChange(e)}
                autoComplete="false"
                onKeyDown={(e) =>
                  e.key == "Enter" && passwordRef.current.focus()
                }
                className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
              />
            </div>
            {/* username error */}
            {usernameError && (
              <p className="px-7 py-2 text-xs text-[var(--clr-blue-light)]">
                *Username must not containe special charecter
              </p>
            )}
          </div>
          <div
            className={`animation w-full px-5 flex items-center  rounded-[var(--br)] ${
              password
                ? "border-[2pt] border-[var(--clr-blue-medium)]"
                : "border-[2pt] border-slate-500"
            }`}
          >
            <MdKey className="text-[1.5rem]" />
            <input
              ref={passwordRef}
              type={show ? `password` : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) =>
                e.key == "Enter" && password && username && handleLogin()
              }
              className="bg-transparent w-full px-5 py-4 outline-none font-[var(--fw-400)] tracking-widest placeholder:tracking-widest placeholder:text-[var(--clr-white)]"
            />
            {show ? (
              <BsFillEyeSlashFill
                onClick={showPassword}
                className="text-[1.5rem] cursor-pointer"
              />
            ) : (
              <BsFillEyeFill
                onClick={showPassword}
                className="text-[1.5rem] cursor-pointer"
              />
            )}
          </div>
          <button
            disabled={username && password ? false : true}
            className={`${
              username && password
                ? "cursor-pointer "
                : "cursor-not-allowed bg-[var(--clr-blue-medium-50)] text-slate-500"
            } animation w-ful lpx-5 py-4 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest`}
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className="or animation flex justify-center text-center tracking-widest font-[var(--fw-400)] relative">
            <p>or</p>
          </div>
          <button
            onClick={loginUsingGoogle}
            className="animation w-ful flex items-center justify-center gap-5 lpx-5 py-4 bg-[var(--clr-white)] text-[var(--clr-blue-dark)] rounded-[var(--br)] tracking-widest"
          >
            <FcGoogle className="text-[2rem]" />
            Sign In with Google
          </button>
        </div>
      ) : (
        <div className="card md:min-w-[500px] p-5 flex flex-col items-center gap-5">
          <div className="animation flex overflow-hidden justify-center items-center text-[var(--clr-blue-dark)] text-[2rem] w-[100px] h-[100px] border-[5px] border-[var(--clr-blue-medium)] rounded-full bg-[var(--clr-blue-light)]">
            {profile?.picture ? (
              <img src={profile?.picture} />
            ) : (
              profile.name[0].toUpperCase()
            )}
          </div>
          <div className="animation tracking-widest font-[var(--fw-600)]">
            {profile?.name}
          </div>
          <div className="animation tracking-widest font-[var(--fw-600)]">
            {profile.email}
          </div>
          <button
            onClick={logout}
            className="animation w-full lpx-5 py-4 mt-5 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
