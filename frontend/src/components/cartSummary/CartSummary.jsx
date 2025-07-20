import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import ReceiptPopup from "../receiptPopup/ReceiptPopup";
import { createOrder, deleteOrder } from "../../service/OrderService";
import { createRazorpayOrder, verifyPayment } from "../../service/PaymentService";
import toast from "react-hot-toast";
import { AppConstants } from "../../util/appConstants";

const CartSummary = ({
    customerData,
    setCustomerData,
    items
}) => {
    const { totalItem, clearCart } = useContext(AppContext);
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    let tax = totalItem * 0.01;
    let total = totalItem + tax;
    const loadRazorpayScript = ()=>{
        return new Promise((resolve, reject)=>{
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = ()=> resolve(true);
            script.onerror = ()=> resolve(false);
            document.body.appendChild(script);
        })
    }

    const clearAll = () =>{
        setCustomerData({
                    name:"",
                    phone:"",
                })
        clearCart();
        tax = 0.00;
        total = 0.00;
    }

    const placeOrder = ()=>{
        setShowPopup(true);
        clearAll();
    }

    const closeReceipt = ()=>{
        setShowPopup(false);
    }

    const handlePrintReceipt = ()=>{
        window.print();
    }

    const deleteOrderOnFailure = async (orderId)=>{
        try{
            await deleteOrder(orderId);
        }catch(e){
            console.error(e);
            toast.error("Something went wrong");
        }
    }

    const completePayment = async (paymentMode)=>{
        if(!customerData.name || !customerData.phone){
            toast.error("Please enter customer details");
            return;
        }

        if(items.length==0){
            toast.error("Your cart is empty");
            return;
        }

        setIsProcessing(true);
        const orderData = {
            customerName : customerData.name,
            phoneNumber : customerData.phone,
            cartItems : items,
            subtotal : totalItem,
            tax,
            grandTotal : total,
            paymentMethod : paymentMode.toUpperCase(),
        }
        try{
            const response = await createOrder(orderData);
            const savedData = response.data;
            if(response.status === 201 && paymentMode==="cash"){
                toast.success("Cash received");
                setOrderDetails(savedData);
            }else if(response.status === 201 && paymentMode==="upi"){
                const razorpayLoaded = await loadRazorpayScript();
                if(!razorpayLoaded){
                    toast.error("Unable to load razorpay")
                    await deleteOrderOnFailure(savedData.orderId);
                    return;
                }
                // create razorpay order
                const razorpayResponse = await createRazorpayOrder({amount: total, currency:"INR"});
                const options = {
                    Key : AppConstants.RAZORPAY_KEY_ID,
                    amount : razorpayResponse.data.amount,
                    currency : razorpayResponse.data.currency,
                    order_id : razorpayResponse.data.id,
                    name : "My Retail Shop",
                    description : "order payment",
                    handler : async function (response) {
                        await verifyPaymentHandler(response, savedData)
                    },
                    prefill : {
                        name : customerData.name,
                        contact : customerData.phone,
                    },
                    theme : {
                        color : "#3399cc"
                    },
                    modal : {
                        ondismiss : async () =>{
                            await deleteOrderOnFailure(savedData.orderId);
                            toast.error("Payment cancelled");
                        }
                    }
                }
                const rzp = new window.Razorpay(options);
                rzp.on("payment.failed", async (response)=>{
                    await deleteOrderOnFailure(savedData.orderId);
                    toast.error("Payment cancelled");
                    console.error(response.error.description);
                });
                rzp.open();
            }
        }catch(e){
            console.error(e);
            toast.error("Payment processing failed");
        }finally{
            setIsProcessing(false);
        }
    }

    const verifyPaymentHandler = async (response, savedOrder)=>{
        const paymentData = {
            razorpayOrderId : response.razorpay_order_id,
            razorpayPaymentId : response.razorpay_payment_id,
            razorpaySignature : response.razorpay_signature,
            orderId : savedOrder.orderId
        }
        try{
            const paymentResponse  = await verifyPayment(paymentData);
            if(paymentResponse.status === 200){
                toast.success("Payment successful");
                setOrderDetails({
                    ...savedOrder,
                    paymentDetails : {
                        razorpayOrderId : response.razorpay_order_id,
                        razorpayPaymentId : response.razorpay_payment_id,
                        razorpaySignature : response.razorpay_signature,
                    }
                })
            }else{
                toast.error("Payment Processing failed");
            }
        }catch(e){
            console.error(e);
            toast.error("Payment failed");
        }
    }
    return (
        <>
            <div className="d-flex flex-column">
                <div className="d-flex justify-content-between">
                    <span>Item : </span>
                    <span>
                        <i className="bi bi-currency-rupee"></i>
                        {totalItem.toFixed(2)}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Tax (1%): </span>
                    <span>
                        <i className="bi bi-currency-rupee"></i>
                        {tax.toFixed(2)}
                    </span>
                </div>
                <div className="d-flex justify-content-between">
                    <span>Total : </span>
                    <span>
                        <i className="bi bi-currency-rupee"></i>
                        {total.toFixed(2)}
                    </span>
                </div>
            </div>
            <div className="d-flex gap-1">
                <button className="flex-grow-1 btn btn-success" disabled={isProcessing} onClick={()=>completePayment("cash")}>
                    {
                        isProcessing?"Processing...":"Cash"
                    }
                </button>
                <button className="flex-grow-1 btn btn-primary" disabled={isProcessing} onClick={()=>completePayment("upi")}>
                    {
                        isProcessing?"Processing...":"UPI"
                    }
                </button>
            </div>
            <div className="d-flex">
                <button className='w-100 btn btn-warning' disabled={isProcessing || !orderDetails} onClick={placeOrder}>
                    Place Order
                </button>
            </div>
            {
                showPopup && <ReceiptPopup orderDetails={orderDetails} onClose={closeReceipt} onPrint={handlePrintReceipt} />
            }
        </>
    );
};

export default CartSummary;
