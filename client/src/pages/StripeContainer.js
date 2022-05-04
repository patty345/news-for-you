import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";  
import React from "react";


const PUBLIC_KEY = "pk_test_51Kv9DHJFam9Mb5NhA5aLxAf1YgLiGYgUc7855RUiHdzPQIzXhR9JOv6JI2wSfGlT1ct0ye7rUEO9uEe1VKkoqK1s00fU3Pdxyr"

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function StripeContainer() {
    return (
        <Elements stripe={stripeTestPromise}>
            
        </Elements>
    )
}