import $ from "jquery";
import { useEffect } from "react";

type LoginProps = {
  handleLogin: any;
  handleRegister: any;
  user: any;
  error: string;
  setUser: React.Dispatch<React.SetStateAction<any>>;
};

const Login: React.FC<LoginProps> = ({
  handleLogin,
  handleRegister,
  setUser,
  error,
  user,
}) => {
  useEffect(() => {
    $("#auth-container").show(500);
  }, []);

  const show = (e: any) => {
    $(e).show(500);
  };
  const close = (e: any) => {
    $(e).hide(500);
  };

  return (
    <div className="absolute mx-auto my-auto w-full  justify-center items-end bg-white ">
      <div id="auth-container">
        <div id="auth">
          <div className="text-lg text-blue-700">Wellcome Back</div>
          <div className="mt-2 text-gray-600 text-center">
            We Missed You My Dear Freind
            <div className="text-red-500">You Can Login As Admin</div>
            <div>username: admin</div>
            <div>password: admin</div>
          </div>
          <input
            placeholder="username"
            onChange={(e) =>
              setUser((prev: any) => ({ ...prev, username: e.target.value }))
            }
            className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
          />
          <input
            placeholder="password"
            onChange={(e) =>
              setUser((prev: any) => ({ ...prev, password: e.target.value }))
            }
            className="mt-5 w-3/4 rounded-lg p-2 text-center text-blue-700 shadow"
          />
          <button
            id="registerbtn"
            onClick={() => {
              handleLogin(user.username, user.password);
            }}
            className="btn-greenshadow mt-4 rounded-lg bg-blue-500 px-5 py-2 text-sky-50"
          >
            Login
          </button>
          {error ? (
            <div className="w-full text-center mt-2 text-red-700">{error}</div>
          ) : (
            <></>
          )}
          <div className="mt-2 flex flex-row items-center justify-center">
            <div className=" text-gray-600">You Dont Have an Account?</div>
            <button
              onClick={() => {
                $("#register-container").show(500);
                $("#auth-container").hide();
              }}
              className="mx-2 rounded-lg bg-slate-400 p-2 text-slate-50"
            >
              Click Here
            </button>
          </div>
        </div>
      </div>
      <div id="register-container">
        <div id="auth">
          <div className="text-lg font-medium text-blue-600">
            Wellcome To Online-Shop
          </div>

          <input
            placeholder="username"
            onChange={(e) =>
              setUser((prev: any) => ({ ...prev, username: e.target.value }))
            }
            className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
          />
          <input
            placeholder="email"
            type="email"
            onChange={(e) =>
              setUser((prev: any) => ({ ...prev, email: e.target.value }))
            }
            className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
          />
          <input
            placeholder="password"
            onChange={(e) =>
              setUser((prev: any) => ({ ...prev, password: e.target.value }))
            }
            className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
          />
          <input
            placeholder="password-confirm"
            className="mt-5 w-3/4 rounded-lg p-2 text-center shadow text-blue-700"
          />
          <button
            id="registerbtn"
            onClick={handleRegister}
            className="btn-greenshadow mt-4 rounded-lg px-5 py-2 bg-blue-500 text-sky-50"
          >
            Register
          </button>
          <div className="mt-5 flex flex-row items-center justify-center">
            <div className=" text-gray-600">Do You Have Account?</div>
            <button
              onClick={() => {
                $("#register-container").hide();
                $("#auth-container").show(500);
              }}
              className="mx-2 rounded-lg bg-slate-400 p-2 text-slate-50"
            >
              Click Here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
