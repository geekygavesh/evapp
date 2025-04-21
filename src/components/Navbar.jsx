import { doc, setDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUser(userSnap.data());
        } else {
          setUser(user);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // First-time user — create user document with wallet balance
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          createdAt: new Date(),
          balance: 500 // 👈 starting balance ₹500
        });
      } else {
        // Existing user, merge latest data without changing balance
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          lastUpdated: new Date()
        }, { merge: true });
      }

      console.log("User saved to Firestore:", user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/"); // Redirect to Home on logout
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-gradient-to-r from-emerald-700 to-green-500 text-white p-4 flex justify-between items-center shadow-md z-50">
        <ul className="flex gap-6 text-lg">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stations">Stations</Link></li>
        </ul>

        {user ? (
          <div className="flex items-center gap-4">
            <button onClick={goToProfile} className="font-semibold hover:underline">
              {user.name || "Profile"}
            </button>
            <button onClick={handleLogout} className="p-2 bg-red-500 rounded-lg">Logout</button>
          </div>
        ) : (
          <button onClick={signInWithGoogle} className="p-2 bg-green-500 rounded-lg">Login with Google</button>
        )}
      </nav>

      <div className="pt-16"></div>
    </>
  );
}

export default Navbar;
