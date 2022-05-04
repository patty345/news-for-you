import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import React, { useState } from 'react'

const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: '#c4foff',
            color: "#fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#fce883"}
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm() {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error, paymentMethod} = await stripe.createPatmentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        }) 

        if (!error) {
            try {
                const {id} = paymentMethod 
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
        {!success ?
        <form onSubmit={handleSubmit}>
            <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS} />
                </div>
            </fieldset>
            <button>Pay</button>
        </form>
        :
        <></>
        } 
        </>
    )
}