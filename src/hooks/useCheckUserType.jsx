import { useState, useEffect } from "react";

export default function useCheckUserType() {
  const [userTypeData, setUserTypeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BASE_API_URL}LookUp/GetUsersTypes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserTypeData(data.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [token]);

  const getUserTypeById = (id) => {
    const userType = userTypeData.find((userType) => userType?._id === id);
    return userType ? userType : null;
  };

  return { loading, getUserTypeById, userTypeData };
}
