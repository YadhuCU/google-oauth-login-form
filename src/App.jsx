import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdKey } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

import "./App.css";

function App() {
  const [count, setCount] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [show, setShow] = useState(true);

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
    setCount(0);
  };

  return (
    <>
      {count ? (
        <div className="md:min-w-[500px] p-5 flex flex-col gap-5">
          <p className="text-center text-3xl font-[var(--fw-600)] tracking-widest">
            Sing In
          </p>
          {/* username */}
          <div className="w-full">
            <div className="w-full px-5 flex items-center border-[2pt] border-[var(--clr-blue-medium)] rounded-[var(--br)]">
              <FaUser />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleUsernameChange(e)}
                autoComplete="false"
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
          <div className="w-full px-5 flex items-center border-[2pt] border-[var(--clr-blue-medium)] rounded-[var(--br)]">
            <MdKey className="text-[1.5rem]" />
            <input
              type={show ? `password` : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              username && password ? "" : "cursor-not-allowed opacity-50"
            } w-ful lpx-5 py-4 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest`}
            onClick={handleLogin}
          >
            Sign In
          </button>
          <div className="or flex justify-center text-center tracking-widest font-[var(--fw-400)] relative">
            <p>or</p>
          </div>
          <button className="w-ful flex items-center justify-center gap-5 lpx-5 py-4 bg-[var(--clr-white)] text-[var(--clr-blue-dark)] rounded-[var(--br)] tracking-widest">
            <FcGoogle className="text-[2rem]" />
            Sign In with Google
          </button>
        </div>
      ) : (
        <div className="card md:min-w-[500px] p-5 flex flex-col items-center gap-5">
          <div className="flex justify-center items-center text-[var(--clr-blue-dark)] text-[2rem] w-[100px] h-[100px] border-[5px] border-[var(--clr-blue-medium)] rounded-full bg-[var(--clr-blue-light)]">
            <img src="" />Y
          </div>
          <div className="tracking-widest font-[var(--fw-600)]">yadhu</div>
          <div className="tracking-widest font-[var(--fw-600)]">
            yadhu@gmail.com
          </div>
          <button className="w-full lpx-5 py-4 mt-5 bg-[var(--clr-blue-medium)] rounded-[var(--br)] tracking-widest">
            Logout
          </button>
        </div>
      )}
    </>
  );
}

export default App;
