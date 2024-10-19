import React, { useEffect, useState } from 'react';
import axios from "../../axios";
import Styles from "./ViewWarranties.module.css";

const ViewWarranties = () => {
    const userId = localStorage.getItem("userId");
    const [warranty, setWarranty] = useState([]);

    const getWarranty = async () => {
        try {
            const res = await axios.get(`/warranty/${userId}`);
            console.log(res.data.warranty);
            setWarranty(res.data.warranty);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getWarranty();
    }, []);


    const calculateDaysLeft = (warrantyDate) => {
        const currentdate = new Date();
        const warrantyEndDate = new Date(warrantyDate);
        const differenceInTime = warrantyEndDate - currentdate;
        const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24)); // Convert time in milliseconds to days
        return differenceInDays >= 0 ? differenceInDays : 0; // Return days left, or 0 if expired
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
                            <th>Days Left</th>
                            <th>Purchase Date</th>
                        </tr>
                    </thead>
                    <tbody className={Styles.tbody}>
                        {warranty.map((item) => (
                            <tr key={item._id}>
                                <td className={Styles.td}>{item.productId.productName}</td>
                                <td className={Styles.td}>
                                    <img src={item.productId.productImage} alt={item.productId.productName} style={{ width: '50px', height: '50px' }} />
                                </td>

                                <td className={Styles.td}>{calculateDaysLeft(item.productId.warrantyPeriod)} days</td>
                                <td>{item.purchaseDate.slice(0,10)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ViewWarranties;