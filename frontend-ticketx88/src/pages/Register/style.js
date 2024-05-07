import React from "react"
import "./style.css"

function SignIn() {
    return (
        <div class="sign-up">
            <p>Input your phone number</p>
            <div class="Country">
                <div class="Post-code">
                    +84
                    <svg class="btn_arrow" width="24" height="24">
                        <path d="M6 9l6 6 6-6" stroke="#2A2D34" stroke-width="2" stroke-milterlinmit="10"></path>
                    </svg>
                </div>
            </div>
                <input_ className="input-phone-number" type="tel" placeholder="Input here" required></input_> 
            <div class="term-of-use">
                <div class="checkbox">
                    <input_ type="checkbox" class="checkbox-custom"></input_> 
                    <label for="term-of-use">I agree to TicketX88's Term of use and Privacy</label>
                </div>
            </div>
            <div class="Continue-part">
                <button class="Continue-button" type="submit">Continue</button>
            </div>
        </div>
    )
}

export default SignIn