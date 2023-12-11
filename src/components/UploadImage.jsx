/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import useImage from "../hooks/useMyProducts/useImage";
import { CounterContext } from "../context/store";

const UploadImage = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const { userID } = useContext(CounterContext);

  const endpoint = `https://dagagino.onrender.com/Uploads/UploadProductImage?id=${userID}`;
  const { imgErr, uploadImage } = useImage(endpoint);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    console.log(selectedImage);
    if (image) {
      setIsUploading(true);
      try {
        const imageURL = await uploadImage(image);
        onImageUpload(imageURL);
      } catch (error) {
        console.log(error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between g-2">
        <input
          style={{ width: "100%" }}
          type="file"
          name="image"
          id="image"
          className="form-control border"
          onChange={handleImageChange}
          disabled={isUploading}
        />
      </div>

      {isUploading && (
        <div className="alert alert-success my-1 p-2">جاري التحميل</div>
      )}
      {imgErr && <div className="alert alert-danger">{imgErr}</div>}
    </>
  );
};

export default UploadImage;
