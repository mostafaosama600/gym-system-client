import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckUserExist } from "./useCheckUserExist";

export const useRegister = (user, registerSchema, apiUrl) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [errorList, setErrorList] = useState([]);
  const { isUserExist, error: userExistError } = useCheckUserExist(user.phone);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUserExist) {
      setIsError("هذه المستخدم موجود من قبل");
      return;
    }
    setIsLoading(true);
    const validation = registerSchema.validate(user, {
      abortEarly: false,
    });

    if (validation.error) {
      setIsError(validation.error.message || validation.error.toString());
      setErrorList(validation.error.details);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) throw new Error("حدث خطأ ما");
      const data = await response.json();
      if (data.hasError === true) throw new Error("حدث خطأ ما");

      navigate("/login");
    } catch (err) {
      setIsError(err.message || err.toString());
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user,
    handleSubmit,
    isLoading,
    isError,
    errorList,
    userExistError,
  };
};
