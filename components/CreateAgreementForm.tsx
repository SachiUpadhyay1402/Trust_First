"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Mail, User, IndianRupee, Calendar, CreditCard, AlertCircle } from "lucide-react"

interface CreateAgreementFormProps {
    onSubmit: (data: any) => Promise<void>
    isLoading: boolean
}

export default function CreateAgreementForm({ onSubmit, isLoading }: CreateAgreementFormProps) {
    const [formData, setFormData] = useState({
        borrowerEmail: "",
        borrowerName: "",
        amount: "",
        dueDate: "",
        lenderUPI: "",
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    // UPI Regex: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/

    const validateUPI = (upi: string) => {
        if (!upi) return "UPI ID is required"
        if (!upiRegex.test(upi)) return "Invalid UPI format (e.g., name@bank)"
        return ""
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))

        if (name === "lenderUPI") {
            const error = validateUPI(value)
            setErrors((prev) => ({ ...prev, lenderUPI: error }))
        } else if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const isFormInvalid =
        !formData.borrowerEmail ||
        !formData.borrowerName ||
        !formData.amount ||
        !formData.dueDate ||
        !formData.lenderUPI ||
        !!errors.lenderUPI

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (isFormInvalid) return
        await onSubmit(formData)
    }

    return (
        <Card className="w-full max-w-lg mx-auto border-border bg-card">
            <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                    New Trust Agreement
                </CardTitle>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                    {/* Borrower Name */}
                    <div className="space-y-2">
                        <Label htmlFor="borrowerName" className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Borrower Name
                        </Label>
                        <Input
                            id="borrowerName"
                            name="borrowerName"
                            value={formData.borrowerName}
                            onChange={handleChange}
                            placeholder="e.g. Rahul Sharma"
                            required
                        />
                    </div>

                    {/* Borrower Email */}
                    <div className="space-y-2">
                        <Label htmlFor="borrowerEmail" className="flex items-center gap-2">
                            <Mail className="h-4 w-4" /> Borrower Email
                        </Label>
                        <Input
                            id="borrowerEmail"
                            name="borrowerEmail"
                            type="email"
                            value={formData.borrowerEmail}
                            onChange={handleChange}
                            placeholder="rahul@example.com"
                            required
                        />
                    </div>

                    {/* Amount & Due Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount" className="flex items-center gap-2">
                                <IndianRupee className="h-4 w-4" /> Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="5000"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dueDate" className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" /> Due Date
                            </Label>
                            <Input
                                id="dueDate"
                                name="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* Lender UPI */}
                    <div className="space-y-2">
                        <Label htmlFor="lenderUPI" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Your UPI ID (for Repayment)
                        </Label>
                        <Input
                            id="lenderUPI"
                            name="lenderUPI"
                            value={formData.lenderUPI}
                            onChange={handleChange}
                            placeholder="yourname@okaxis"
                            className={errors.lenderUPI ? "border-red-500" : ""}
                            required
                        />
                        {errors.lenderUPI && (
                            <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                <AlertCircle className="h-3 w-3" /> {errors.lenderUPI}
                            </p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-1">
                            Borrowers will use this UPI ID to pay you back via GPay/PhonePe.
                        </p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isFormInvalid || isLoading}
                    >
                        {isLoading ? "Creating..." : "Create Trust Agreement"}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
