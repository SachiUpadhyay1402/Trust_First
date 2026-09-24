import QRCode from 'qrcode';

/**
 * Generates a UPI Deep Link and a Base64 QR Code for payment.
 * 
 * @param lenderUPI - The UPI ID of the lender (e.g., user@bank)
 * @param lenderName - The name of the lender
 * @param amount - The amount to be paid
 * @returns An object containing the upiLink and qrCodeDataUrl
 */
export async function generatePaymentPayload(
    lenderUPI: string,
    lenderName: string,
    amount: number
): Promise<{ upiLink: string; qrCodeDataUrl: string }> {
    // Generate UPI Deep Link format:
    // upi://pay?pa={lenderUPI}&pn={lenderName}&am={amount}&tn=Setu_AI_Repayment&cu=INR
    const encodedName = encodeURIComponent(lenderName);
    const upiLink = `upi://pay?pa=${lenderUPI}&pn=${encodedName}&am=${amount}&tn=Setu_AI_Repayment&cu=INR`;

    try {
        // Generate QR Code as a Base64 Data URL
        const qrCodeDataUrl = await QRCode.toDataURL(upiLink, {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 400,
            color: {
                dark: '#000000',
                light: '#ffffff',
            },
        });

        return { upiLink, qrCodeDataUrl };
    } catch (error) {
        console.error('Error generating QR code:', error);
        throw new Error('Failed to generate payment payload');
    }
}
