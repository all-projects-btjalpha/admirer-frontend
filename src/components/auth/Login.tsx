import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { otp_send_API, verifyLogin_API } from "../api/api-end-points";


interface FormProps {
  phoneNumber: string;
  otp: string;
}

const Login = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // To store phone number
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    navigate("/");
  };

  const {
    register,
    handleSubmit,
    getValues,
    setValue, // ✅ Add this
    formState: { errors },
  } = useForm<FormProps>();

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = async () => {
    const phone = getValues("phoneNumber");
    setPhoneNumber(phone); // Save phone number in state
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(otp_send_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: phone,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpSent(true);
      setTimer(60); // Start 60-second timer
      toast.success("OTP sent successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormProps) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(verifyLogin_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: data.phoneNumber,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "OTP verification failed");
      }

      // Store token and user data
      localStorage.setItem("auth_token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      toast.success("Login successful!");
      // Redirect to dashboard
      if (location.state?.fromCheckout) {
        navigate("/cart");
      } else {
        navigate("/"); // Default redirect
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "OTP verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute left-4 top-5 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close signup form"
        >
          <FaTimes className="w-5 h-5" />
        </button>
        <div className="text-center mb-5">
          <img src="logo/iconn.png" alt="Logo" className="w-16 mx-auto " />
          <h1 className="text-xl font-normal mt-1">Welcome to Admirer</h1>
        </div>
        {!otpSent && <div className="text-xl mb-4">Login</div>}

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Mobile Number */}
          {!otpSent && (
            <div className="mb-4">
              <input
                id="mobileNumber"
                maxLength={10}
                type="tel"
                {...register("phoneNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
                placeholder="Mobile number"
                className="mt-1 block w-full border h-[50px] border-gray-300 rounded-md shadow-sm py-2 px-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled={otpSent || isLoading}
                onInput={(e) => {
                  const input = e.target as HTMLInputElement;
                  input.value = input.value.replace(/[^0-9]/g, "");
                }}
              />

              {errors.phoneNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          )}

          {/* OTP Input - Only shown after OTP is sent */}
          {otpSent && (
            <>
              <p className="text-sm text-gray-700 mb-2 text-center">
                Enter the OTP sent to{" "}
                <span className="font-semibold">{phoneNumber}</span>
              </p>
              <div className="mb-4 mt-1">
                <div className="flex gap-3 justify-center m-auto w-full">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="tel"
                      maxLength={1}
                      className="w-8 h-12 text-center border-b border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      id={`otp-${index}`}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "");
                        e.target.value = value;
                        if (value && index < 5) {
                          document.getElementById(`otp-${index + 1}`)?.focus();
                        }

                        const otp = Array.from(
                          { length: 6 },
                          (_, i) =>
                            (
                              document.getElementById(
                                `otp-${i}`
                              ) as HTMLInputElement
                            )?.value || ""
                        ).join("");
                        setValue("otp", otp);
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !e.currentTarget.value &&
                          index > 0
                        ) {
                          document.getElementById(`otp-${index - 1}`)?.focus();
                        }
                      }}
                    />
                  ))}
                </div>

                <input
                  type="hidden"
                  {...register("otp", {
                    required: "OTP is required",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "OTP must be 6 digits",
                    },
                  })}
                />

                {errors.otp && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.otp.message}
                  </p>
                )}

                {timer > 0 && (
                  <p className="text-sm text-gray-500 mt-4">
                    Resend OTP in {timer} seconds
                  </p>
                )}
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition disabled:opacity-50"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <>
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white rounded py-3 hover:bg-purple-700 transition disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </button>
                {timer === 0 && (
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="flex-1 bg-gray-200 text-gray-700 rounded py-3 hover:bg-gray-300 transition disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}
          </div>

          <p className="text-center text-[13px] mt-6">
            By continuing, I agree to the{" "}
            <Link to="/terms" className="text-purple-700 font-bold">
              Terms of Use
            </Link>{" "}
            &{" "}
            <Link to="/privacy" className="text-purple-700 font-bold">
              Privacy Policy
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
