import PayPal from 'react-native-paypal-wrapper';

// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initialize(PayPal.NO_NETWORK, "<your-client-id>");
PayPal.pay({
    price: '40.70',
    currency: 'MYR',
    description: 'Your description goes here',
}).then(confirm => console.log(confirm))
    .catch(error => console.log(error));

// Required for Future Payments
const options = {
    merchantName : "Merchant name",
    merchantPrivacyPolicyUri: "https://example.com/privacy",
    merchantUserAgreementUri: "https://example.com/useragreement",
}

// 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
PayPal.initializeWithOptions(PayPal.NO_NETWORK, "<your-client-id>", options);

PayPal.obtainConsent().then(authorization => console.log(authorization))
    .catch(error => console.log(error));

// To decrease payment declines, you must specify a metadata ID header (PayPal-Client-Metadata-Id)
// in the payment call. See docs:
// https://developer.paypal.com/docs/integration/mobile/make-future-payment/#required-best-practices-for-future-payments

const metadataID = PayPal.getClientMetadataId();


export default PayPal