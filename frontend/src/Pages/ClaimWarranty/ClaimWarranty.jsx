import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Styles from "./ClaimWarranty.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const ClaimWarranty = () => {
  const [productData, setProductData] = useState({
    purchaseDate: "",
    billImage: "",
    purchaseAddress: "",
    productId: "",
  });

  const userId = localStorage.getItem("userId");

  const navigate = useNavigate();

  useEffect(() => {
    const productId = window.location.pathname.split("/").pop();
    console.log(productId);
    setProductData({ ...productData, productId });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      toast.dismiss();
      const res = await axios.post(`/claim-warranty/${userId}`, {
        purchaseDate: productData.purchaseDate,
        billImage: productData.billImage,
        purchaseAddress: productData.purchaseAddress,
        productId: productData.productId,
      });

      if (res.data.missingFields) {
        toast.error("All fields are required!");
      } else if (res.data.userNotFound) {
        toast.error(res.data.userNotFound);
      }
        else if (res.data.warrantyAlreadyAdded) {
          toast.error(res.data.warrantyAlreadyAdded);
        }
      else if (res.data.warrantyAdded) {
        toast.success("Claimed warranty successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <form className={Styles.form} onSubmit={handleSubmit}>
      <div className={Styles.header}>
        <h2>Claim Warranty</h2>
      </div>

      <div className={Styles.formGroup}>
        <label htmlFor="purchaseDate">Purchase Date:</label>
        <input
          type="date"
          id="purchaseDate"
          name="purchaseDate"
          value={productData.purchaseDate}
          onChange={(e) =>
            setProductData({ ...productData, purchaseDate: e.target.value })
          }
        />

        <label htmlFor="billImage"> Bill Image:</label>
        <input
          type="text"
          id="billImage"
          name="billImage"
          value={productData.billImage}
          onChange={(e) =>
            setProductData({ ...productData, billImage: e.target.value })
          }
        />

        <label htmlFor="purchaseAddress">Purchase Address:</label>
        <input
          type="text"
          id="purchaseAddress"
          name="purchaseAddress"
          value={productData.purchaseAddress}
          onChange={(e) =>
            setProductData({ ...productData, purchaseAddress: e.target.value })
          }
        />
      </div>

      <ToastContainer />

      <button className={Styles.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default ClaimWarranty;
