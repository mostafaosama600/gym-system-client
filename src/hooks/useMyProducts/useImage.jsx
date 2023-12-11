import { useState } from "react";

const useImage = (endpoint) => {
  const [imgLoad, setImgLoad] = useState(false);
  const [imgErr, setImgErr] = useState("");
  const token = localStorage.getItem("userToken");

  const uploadImage = async (image) => {
    setImgLoad(true);
    setImgErr("");

    try {
      if (!image) {
        setImgErr("من فضلك اختر صوره");
        return null;
      }
      const formData = new FormData();
      formData.append("image", image);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        setImgLoad(false);
        setImgErr("حاول مجددا");
      }
      const data = await response.json();
      setImgLoad(false);
      return data.data.url;
    } catch (error) {
      setImgErr("حدث خطا اثناء التحميل");
      return null;
    }
  };

  return { imgLoad, imgErr, uploadImage };
};

export default useImage;
