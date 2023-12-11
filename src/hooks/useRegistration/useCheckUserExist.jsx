import { useEffect, useState } from "react";

export function useCheckUserExist(phone) {
  const [isUserExist, setIsUserExist] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const checkUserExist = async () => {
      if (phone.length > 5) {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_APP_BASE_API_URL
            }Authentication/CheckUserExist?phone=${encodeURI(phone)}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            setIsUserExist(data.data);
          } else {
            setError("حدث خطأ");
          }
        } catch (err) {
          setError("حدث خطأ");
        }
      }
    };
    checkUserExist();
  }, [phone, token]);

  return { isUserExist, error };
}
