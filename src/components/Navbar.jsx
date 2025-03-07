import { Link } from "react-router-dom";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-gradient-to-r from-emerald-700 to-green-500 text-white p-4 flex justify-between items-center shadow-md z-50">

      <ul className="flex gap-6 text-lg">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/stations">Stations</Link></li>
      </ul>

      {user ? (
        <div className="flex items-center gap-4">
          <span>{user.displayName || "User"}</span>
          <button onClick={handleLogout} className="p-2 bg-red-500 rounded-lg">Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle} className="p-2 bg-green-500 rounded-lg">Login with Google</button>
      )}
    </nav>
  );
}

export default Navbar;
