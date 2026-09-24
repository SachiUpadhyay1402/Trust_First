import React from 'react';
import {
    Html,
    Head,
    Preview,
    Body,
    Container,
    Section,
    Text,
    Button,
    Img,
    Heading,
    Hr,
    Link,
} from '@react-email/components';

interface RepaymentEmailProps {
    borrowerName: string;
    lenderName: string;
    amount: number;
    upiLink: string;
    qrCodeDataUrl: string;
    agreementId?: string;
}

export const RepaymentEmail = ({
    borrowerName,
    lenderName,
    amount,
    upiLink,
    qrCodeDataUrl,
    agreementId,
}: RepaymentEmailProps) => {
    const main = {
        backgroundColor: '#f6f9fc',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    };

    const container = {
        backgroundColor: '#ffffff',
        margin: '0 auto',
        padding: '40px 20px',
        maxWidth: '600px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    };

    const header = {
        color: '#0070f3',
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'center' as const,
        marginBottom: '20px',
    };

    const subHeader = {
        fontSize: '18px',
        fontWeight: '600',
        color: '#484848',
        marginBottom: '10px',
    };

    const text = {
        color: '#333333',
        fontSize: '16px',
        lineHeight: '24px',
        marginBottom: '20px',
    };

    const amountBox = {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center' as const,
        marginBottom: '30px',
    };

    const amountText = {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#000',
        margin: '0',
    };

    const labelText = {
        fontSize: '14px',
        color: '#666',
        textTransform: 'uppercase' as const,
        letterSpacing: '1px',
        marginBottom: '5px',
    };

    const btnContainer = {
        textAlign: 'center' as const,
        marginBottom: '30px',
    };

    const button = {
        backgroundColor: '#0070f3',
        borderRadius: '6px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center' as const,
        display: 'inline-block',
        padding: '12px 24px',
    };

    const qrSection = {
        textAlign: 'center' as const,
        marginTop: '40px',
        padding: '20px',
        border: '1px solid #eaeaea',
        borderRadius: '12px',
    };

    const footer = {
        color: '#8898aa',
        fontSize: '12px',
        textAlign: 'center' as const,
        marginTop: '40px',
    };

    return (
        <Html>
            <Head />
            <Preview>Setu AI: Gentle Repayment Reminder</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Heading style={header}>Setu AI</Heading>
                    <Text style={text}>Hi {borrowerName},</Text>
                    <Text style={text}>
                        This is a gentle reminder regarding your agreement with <strong>{lenderName}</strong>.
                        The following amount is due for repayment:
                    </Text>

                    <Section style={amountBox}>
                        <Text style={labelText}>Amount Due</Text>
                        <Text style={amountText}>₹{amount}</Text>
                    </Section>

                    <Section style={btnContainer}>
                        <Text style={subHeader}>Pay via Mobile</Text>
                        <Text style={{ ...text, fontSize: '14px', color: '#666' }}>
                            Click the button below to open GPay, PhonePe, or PayTM directly.
                        </Text>
                        <Button style={button} href={upiLink}>
                            Pay Now via Mobile
                        </Button>
                    </Section>

                    <Hr />

                    <Section style={qrSection}>
                        <Text style={subHeader}>Pay via Desktop</Text>
                        <Text style={{ ...text, fontSize: '14px', color: '#666' }}>
                            Scanning this QR code with your phone's camera or any UPI app.
                        </Text>
                        <Img
                            src={qrCodeDataUrl}
                            width="200"
                            height="200"
                            alt="UPI Payment QR Code"
                            style={{ margin: '0 auto' }}
                        />
                    </Section>

                    <Text style={{ ...text, marginTop: '30px' }}>
                        If you have already settled this payment, please ignore this email or contact {lenderName} to confirm.
                    </Text>

                    <Hr />

                    <Text style={footer}>
                        Setu AI - Bridging the gap with trust and empathy. 🚀
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

export default RepaymentEmail;
