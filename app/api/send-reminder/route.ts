import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { generatePaymentPayload } from '@/lib/upiHelper';
import RepaymentEmail from '@/components/emails/RepaymentEmail';
import connectDB from '@/lib/mongodb';
import Notification from '@/models/Notification';
import { render } from '@react-email/render';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { borrowerEmail, borrowerName, lenderName, lenderUPI, amount, agreementId } = body;

        // Basic validation
        if (!borrowerEmail || !lenderUPI || !amount) {
            return NextResponse.json(
                { error: 'Missing required fields: borrowerEmail, lenderUPI, and amount are required.' },
                { status: 400 }
            );
        }

        // Connect to DB for notification mocking
        await connectDB();

        // 1. Generate UPI Link and QR Code
        const { upiLink, qrCodeDataUrl } = await generatePaymentPayload(
            lenderUPI,
            lenderName,
            parseFloat(amount)
        );

        // 2. Send Email via Resend
        if (resend && process.env.RESEND_API_KEY) {
            try {
                await resend.emails.send({
                    from: 'Setu AI <onboarding@resend.dev>', // In production, use your verified domain
                    to: borrowerEmail,
                    subject: `Setu AI: Gentle Reminder for ₹${amount}`,
                    react: RepaymentEmail({
                        borrowerName,
                        lenderName,
                        amount,
                        upiLink,
                        qrCodeDataUrl,
                        agreementId,
                    }),
                });
            } catch (emailError) {
                console.error('Resend Email Error:', emailError);
                // Continue with the process even if email fails (for hackathon demo purposes)
            }
        } else {
            console.warn('RESEND_API_KEY is missing. Skipping actual email delivery.');
        }

        // 3. Mock MongoDB insertion for In-App Notification
        // We save the QR code URL and message to the database
        const notification: any = await Notification.create({
            userId: body.borrowerId || 'mock-user-id', // Usually you'd pass borrowerId or find it via email
            type: 'repayment_reminder',
            title: 'Repayment Reminder',
            description: `Friendly reminder from ${lenderName} for ₹${amount}. Click to view payment options.`,
            agreementId: agreementId || 'mock-agreement-id',
            data: {
                qrCodeDataUrl,
                upiLink,
                amount,
                lenderName
            }
        });

        return NextResponse.json({
            success: true,
            message: 'Reminder sent and notification created.',
            data: {
                upiLink,
                qrCodeDataUrl,
                notificationId: notification._id
            }
        }, { status: 200 });

    } catch (error: any) {
        console.error('Send Reminder Route Error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error', details: error.message },
            { status: 500 }
        );
    }
}
