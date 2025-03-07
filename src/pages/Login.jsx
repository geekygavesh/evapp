import { signInWithGoogle } from "../components/Auth";

function Login() {
  return (
    <div>
      <button onClick={signInWithGoogle} className="p-2 bg-green-500 text-white">
        Sign Up
      </button>
    </div>
  );
}

export default Login;
