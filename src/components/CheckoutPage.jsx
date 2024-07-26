import { useEffect } from "react";
import toast from "react-hot-toast";
import { BiRupee } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { getpaymentkey, orderPayment, verifyPayment } from "../Redux/RazorPaySlice";

function Checkout() {
    const { state } = useLocation();
    console.log("state", state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const newData = {
        amount: state.price,
        receipt: generateReceipt()
    };
    const razorpayKey = useSelector((state) => state.RazorPay.key);
    console.log("key",razorpayKey)
    const order_id = useSelector((state) => (state?.RazorPay?.order_id));
    const paymentDetails = {
        razorpay_payment_id: "",
        razorpay_order_id: "",
        razorpay_signature: ""
    };
    console.log(razorpayKey)

    async function handlePayment(e) {
        e.preventDefault();
        if (!razorpayKey || !order_id) {
            toast.error("Something went wrong");
            return;
        }
        const options = {
            key: razorpayKey,
            amount: newData.amount,
            currency: "INR",
            name: "Coursify Pvt. Ltd.",
            description: "Order Payment",
            order_id: order_id,
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_order_id = response.razorpay_order_id;

                toast.success("Payment successful");
                console.log(paymentDetails,"paymentDetails")

                const res = await dispatch(verifyPayment(paymentDetails));
                console.log(res);
                res?.payload?.statusCode===200 ? navigate("/checkout/success") : navigate("/checkout/fail");
            },
            theme: {
                color: '#F37254'
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getpaymentkey());
        const orderResponse = await dispatch(orderPayment(newData));
        newData.order_id = orderResponse.payload.data.order_id; // Store the order ID from response
    }

    useEffect(() => {
        load();
    }, []);
    // console.log("key",razorpayKey)

    return (
        <form onSubmit={handlePayment} className="min-h-[90vh] flex items-center justify-center text-white">
            <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
                <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">Order Payment</h1>
                <div className="px-4 space-y-5 text-center">
                    <p className="text-[17px]">
                        This purchase will allow you to access all available courses
                        on our platform for {" "} 
                        <span className="text-yellow-500 font-bold">
                            <br />
                            1 Year duration
                        </span> {" "}
                        All the existing and new launched courses will be also available.
                    </p>
                    <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
                        <BiRupee /><span>{state.price}</span> only
                    </p>
                    <div className="text-gray-200">
                        <p>100% refund on cancellation</p>
                        <p>* Terms and conditions applied *</p>
                    </div>
                    <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2">
                        Buy now
                    </button>
                </div>
            </div>
        </form>
    );
}

function generateReceipt() {
    return `receipt_${Math.random().toString(36).substr(2, 9)}`;
}

export default Checkout;
