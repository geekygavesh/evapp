import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    carModel: "",
    brand: "",
    phone: ""
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
          setFormData({
            carModel: userSnap.data().carModel || "",
            brand: userSnap.data().brand || "",
            phone: userSnap.data().phone || ""
          });
        }
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        carModel: formData.carModel,
        brand: formData.brand,
        phone: formData.phone
      });
      setEditMode(false);
      setUserData(prev => ({ ...prev, ...formData }));
      alert("✅ Profile updated successfully!");
    }
  };

  if (!userData) {
    return <div className="p-4 text-center text-gray-500">Loading profile...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-emerald-600 mb-6 text-center">My Profile</h1>

        <div className="space-y-4 text-gray-800">
          <div className="flex justify-between">
            <span className="font-semibold">Name:</span>
            <span>{userData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email:</span>
            <span>{userData.email}</span>
          </div>

          {editMode ? (
            <>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Car Model:</label>
                <input
                  type="text"
                  name="carModel"
                  value={formData.carModel}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                  placeholder="e.g. Nexon EV"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Brand:</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                  placeholder="e.g. Tata"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-semibold">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border border-gray-300 p-2 rounded-lg"
                  placeholder="e.g. 9876543210"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full mt-5 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              <div className="flex justify-between">
                <span className="font-semibold">Car Model:</span>
                <span>{userData.carModel || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Brand:</span>
                <span>{userData.brand || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Phone:</span>
                <span>{userData.phone || "Not set"}</span>
              </div>

              <button
                onClick={() => setEditMode(true)}
                 className="w-full mt-5 bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
                >
                Edit Profile
                </button>

            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
