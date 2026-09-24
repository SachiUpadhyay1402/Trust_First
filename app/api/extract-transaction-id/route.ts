import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
    console.log("=== Transaction ID Extraction Started ===");
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            console.error("No file in request");
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        console.log("File received:", file.name, "Type:", file.type, "Size:", file.size);

        // Check if Gemini API key is available
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not configured");
            return NextResponse.json(
                { error: "Transaction ID extraction service not configured", transactionId: "" },
                { status: 500 }
            );
        }

        console.log("Gemini API key found, converting image to base64...");

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64Image = buffer.toString('base64');

        // Determine mime type
        const mimeType = file.type || 'image/jpeg';
        console.log("Image converted, size:", base64Image.length, "bytes, mime:", mimeType);

        // Initialize Gemini with the correct model
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        
        // Use the latest stable flash model for vision tasks
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash"
        });

        console.log("Gemini model initialized, sending request...");

        // Create the prompt
        const prompt = `Analyze this payment screenshot and extract the transaction ID or reference number.

Instructions:
- Look for labels like: "Transaction ID", "Reference Number", "UTR", "Order ID", "Txn ID", "UPI Ref", "Reference ID", etc.
- Return ONLY the transaction ID number/code, nothing else
- If you cannot find a transaction ID, return the text "NOT_FOUND"
- Do not include any explanation or additional text

Transaction ID:`;

        // Generate content with image
        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Image,
                    mimeType: mimeType,
                },
            },
        ]);

        console.log("Gemini response received");
        const response = result.response;
        const text = response.text().trim();
        console.log("Extracted text:", text);

        // Check if transaction ID was found
        if (text === "NOT_FOUND" || !text) {
            console.log("No transaction ID found in image");
            return NextResponse.json({
                transactionId: "",
                message: "Could not extract transaction ID from image"
            });
        }

        // Return the extracted transaction ID
        console.log("Transaction ID successfully extracted:", text);
        return NextResponse.json({
            transactionId: text,
            message: "Transaction ID extracted successfully"
        });

    } catch (error: any) {
        console.error("=== Extraction Error ===");
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        return NextResponse.json(
            { 
                error: "Failed to extract transaction ID", 
                details: error.message,
                transactionId: ""
            },
            { status: 500 }
        );
    }
}
