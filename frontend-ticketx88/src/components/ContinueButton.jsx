import React from "react"
import "../styles"

const ContinueButton = ({ onClick }) => {
    return (
        <div style={
            {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh"
            }
        }>
            <button className="continue-button" onClick={onClick}>
                Continue
            </button>
        </div>
        // <button className="continue-button" onClick={onClick}>
        //     Continue
        // </button>
    )
}

export default ContinueButton