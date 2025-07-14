"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { signInWithPhone, verifyOtp } from "@/lib/supabase/auth"

export default function LoginPage() {
  const [step, setStep] = useState<"phone" | "otp">("phone")
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOTP = async () => {
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      })
      return
    }

    // Format phone number to include country code if not present
    const formattedPhone = phone.startsWith("+") ? phone : `+1${phone.replace(/\D/g, "")}`

    setLoading(true)
    try {
      const { error } = await signInWithPhone(formattedPhone)

      if (error) throw error

      toast({
        title: "OTP Sent",
        description: "Check your phone for the verification code",
      })
      setStep("otp")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      })
      return
    }

    const formattedPhone = phone.startsWith("+") ? phone : `+1${phone.replace(/\D/g, "")}`

    setLoading(true)
    try {
      const { error } = await verifyOtp(formattedPhone, otp)

      if (error) throw error

      toast({
        title: "Success",
        description: "Login successful!",
      })
      router.push("/booking")
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid OTP",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-md mx-auto flex items-center">
          <Link href="/">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900 ml-4">{step === "phone" ? "Login" : "Verify OTP"}</h1>
        </div>
      </header>

      {/* Content */}
      <main className="px-4">
        <div className="max-w-md mx-auto">
          <Card className="rounded-2xl shadow-lg border-0 bg-white/90 backdrop-blur animate-fade-in">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {step === "phone" ? (
                  <Phone className="w-8 h-8 text-blue-600" />
                ) : (
                  <Mail className="w-8 h-8 text-blue-600" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                {step === "phone" ? "Enter your phone number" : "Enter verification code"}
              </CardTitle>
              <p className="text-gray-600 mt-2">
                {step === "phone" ? "We'll send you a verification code" : `Code sent to ${phone}`}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {step === "phone" ? (
                <>
                  <div className="space-y-2">
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-12 text-lg rounded-xl border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <Button
                    onClick={handleSendOTP}
                    disabled={loading}
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      maxLength={6}
                      className="h-12 text-lg text-center rounded-xl border-gray-200 focus:border-blue-500 tracking-widest"
                    />
                  </div>
                  <Button
                    onClick={handleVerifyOTP}
                    disabled={loading}
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                  <Button
                    onClick={() => {
                      setStep("phone")
                      setOtp("")
                    }}
                    variant="ghost"
                    className="w-full text-blue-600 hover:text-blue-700"
                  >
                    Change phone number
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
