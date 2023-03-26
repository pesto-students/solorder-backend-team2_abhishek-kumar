function otpTamplet(user, otp) {
    return `<!DOCTYPE html>
    <html>
    <head>
        <title>OTP Email Template</title>
        <style type="text/css">
            .container {
                max-width: 30%;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0px 0px 10px #cccccc;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                border-radius: 5%;
            }
    
            .main {
                border-style: dashed;
                border-color: #6b6a6a;
                padding: 20px;
                border-radius: 5%;
            }
    
            h2 {
                font-weight: bold;
                color: #333333;
                margin-top: 0;
                margin-bottom: 20px;
            }
    
            p {
                margin-top: 0;
                margin-bottom: 20px;
                font-size: large;
            }
    
            .button {
                display: inline-block;
                background-color: #4CAF50;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="main">
                <h2 style="text-align: center;">Solorder</h2>
                <p>Dear ${user || "User"},</p>
                <p>Your OTP is: <strong>${otp || ""}</strong></p>
                <p>Please enter this OTP to verify your account.</p>
            </div>
        </div>
    </body>
    </html>`
}

function generateOTP() {
    let otp = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
    while (otp.toString().includes('0') || otp.toString().includes('.')) { // Check if the number contains 0 or decimal point
        otp = Math.floor(Math.random() * 9000) + 1000; // If so, generate a new number
    }
    return otp;
}


module.exports = { generateOTP, otpTamplet }