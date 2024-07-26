import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getAllPaycard } from "../Redux/Payment.jsx";
import PaymentCard from "./PaymentCard.jsx";
import updateImage from "./update.jpg"; // Import the background image

function Newsletter() {
    const dispatch = useDispatch();
    const PaymentData = useSelector((state) => (state.PayCard.PaymentData.data));
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);
    console.log("paydata",PaymentData);
    useEffect(() => {
     dispatch(getAllPaycard());
    }, [dispatch]);
    console.log("paydata",PaymentData);
    // console.log(isLoggedIn, role);

    return (
        <div 
            className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white"
            style={{ backgroundImage: `url(${updateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <h1 className="text-4xl font-bold">Our Latest Magazine </h1>
            <span className="font-bold text-2xl">By RSS</span>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PaymentData?.map((element) => (
                    <PaymentCard key={element._id} data={element} />
                ))}
            </div>
            {isLoggedIn && role === "ADMIN" && (
             <Link to="/newsletter/create" className="text-white bg-orange-500 w-[11%] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2">Add New Maganize</Link>
            )}
        </div>
    );
}

export default Newsletter;