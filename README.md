# BoxPay Testing Application

This is a simple application to test BoxPay integration. It allows you to create a test order and make a payment using BoxPay's payment gateway.

## Features

- Simple product and payment form
- Integration with BoxPay payment gateway
- Payment success page
- Easy configuration with environment variables

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup and Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd boxpaytesting
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=5000
BOXPAY_MERCHANT_ID=your_merchant_id
BOXPAY_TOKEN=your_api_token
BOXPAY_BUSINESS_UNIT=your_business_unit
FRONTEND_URL=http://localhost:5000
```

4. Build the TypeScript code:
```bash
npm run build
```

5. Start the application:
```bash
npm start
```

Or run in development mode:
```bash
npm run dev
```

## Usage

1. Open your browser and navigate to `http://localhost:5000`
2. Fill in the product details and your information
3. Click "Pay Now" to create a payment session
4. You will be redirected to BoxPay's payment page
5. After completing the payment, you will be redirected to the success page

## Environment Variables

- `PORT`: The port on which the server will run (default: 5000)
- `BOXPAY_MERCHANT_ID`: Your BoxPay merchant ID
- `BOXPAY_TOKEN`: Your BoxPay API token
- `BOXPAY_BUSINESS_UNIT`: Your BoxPay business unit
- `FRONTEND_URL`: The URL of your frontend application (used for redirect URLs)

## License

This project is licensed under the ISC License. 