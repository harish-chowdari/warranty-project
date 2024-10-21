import React, { useEffect, useState } from 'react';
import axios from "../../axios";
import Styles from "./ViewWarranties.module.css";

const ViewWarranties = () => {
    const userId = localStorage.getItem("userId");
    const [warranty, setWarranty] = useState([]);

    const getWarranty = async () => {
        try {
            const res = await axios.get(`/warranty/${userId}`);
            setWarranty(res.data.warranty);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWarranty();
    }, []);

    const calculateDaysLeft = (purchaseDate, warrantyPeriod) => {
        if (!purchaseDate || isNaN(Number(warrantyPeriod))) return "Invalid data";

        const purchase = new Date(purchaseDate);
        if (isNaN(purchase)) return "Invalid data";

        const expiration = new Date(purchase);
        expiration.setDate(purchase.getDate() + Number(warrantyPeriod));

        const today = new Date();
        const timeDiff = expiration.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        return daysLeft >= 0 ? `${daysLeft} days` : <p style={{ color: "red" }}>Expired</p>;
    };

    return (
        <div className={Styles.container}>
            <h1>Your Warranties</h1>
            {warranty.length === 0 ? (
                <h2>No Warranties</h2>
            ) : (
                <table className={Styles.table}>
                    <thead className={Styles.thead}>
                        <tr className={Styles.tr}>
                            <th>Product Name</th>
                            <th>Product Image</th>
                            <th>Warranty Left</th>
                            <th>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody className={Styles.tbody}>
                        {warranty.map((item) => (
                            <tr key={item._id}>
                                <td className={Styles.td}>{item?.productId?.productName}</td>
                                <td className={Styles.td}>
                                    <img src={item?.productId?.productImage} alt={item?.productId?.productName} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td className={Styles.td}>
                                    {calculateDaysLeft(item?.purchaseDate, item?.productId?.warrantyPeriod)}
                                </td>
                                <td>{new Date(item?.purchaseDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewWarranties;
