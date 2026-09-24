import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Agreement from '@/models/Agreement';
import { generatePaymentPayload } from '@/lib/upiHelper';

// GET single agreement by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const agreement = await Agreement.findById(id);

    if (!agreement) {
      return NextResponse.json(
        { error: 'Agreement not found' },
        { status: 404 }
      );
    }

    // Generate UPI payload if lenderUPI is provided
    let upiPayload = null;
    if (agreement.lenderUPI) {
      try {
        upiPayload = await generatePaymentPayload(
          agreement.lenderUPI,
          agreement.lenderName,
          agreement.amount
        );
      } catch (upiError) {
        console.error('Failed to generate UPI payload:', upiError);
      }
    }

    return NextResponse.json({
      agreement,
      upiPayload
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get Agreement Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch agreement', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH update agreement
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    const agreement = await Agreement.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!agreement) {
      return NextResponse.json(
        { error: 'Agreement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Agreement updated successfully', agreement },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update Agreement Error:', error);
    return NextResponse.json(
      { error: 'Failed to update agreement', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE agreement
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;

    const agreement = await Agreement.findByIdAndDelete(id);

    if (!agreement) {
      return NextResponse.json(
        { error: 'Agreement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Agreement deleted successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Delete Agreement Error:', error);
    return NextResponse.json(
      { error: 'Failed to delete agreement', details: error.message },
      { status: 500 }
    );
  }
}
