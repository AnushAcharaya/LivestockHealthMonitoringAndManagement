import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Upload, LogIn, Mail, Phone, CheckCircle } from "lucide-react";

const CreateAccount = () => {
    const [step, setStep] = useState(1); // 1: Registration, 2: OTP Verification
    const [registeredUser, setRegisteredUser] = useState(null);
    const [otpData, setOtpData] = useState({
        emailOtp: "",
        phoneOtp: "",
    });

    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        address: "",
        email: "",
        password: "",
        role: "",
        farmName: "",
        nidPhoto: null,
        certificatePhoto: null,
        specialization: "",
        phone: "",
    });




    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Store user data and move to OTP verification step
        setRegisteredUser({
            email: formData.email,
            phone: formData.phone,
        });
        setStep(2);
    };

    const handleOtpChange = (e) => {
        const { name, value } = e.target;
        setOtpData({ ...otpData, [name]: value });
    };

    const handleVerifyEmail = (e) => {
        e.preventDefault();
        console.log("Verifying Email OTP:", otpData.emailOtp);
        // Add API call here
    };

    const handleVerifyPhone = (e) => {
        e.preventDefault();
        console.log("Verifying Phone OTP:", otpData.phoneOtp);
        // Add API call here
    };

    const handleResendOtp = (type) => {
        console.log(`Resending ${type} OTP`);
        // Add API call here
    };

    const handleGoogleLogin = () => {
        // Redirect to Django backend Google OAuth endpoint
        window.location.href = 'http://localhost:8000/auth/login/google-oauth2/';
    };

    const formVariant = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="section-bg w-full flex justify-center px-4 sm:px-6 lg:px-12">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card w-full max-w-3xl bg-white rounded-xl shadow-lg p-6 sm:p-10"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-6 justify-center">
                    {step === 1 ? (
                        <>
                            <UserPlus className="text-primary-dark w-10 h-10 sm:w-8 sm:h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark text-center">
                                Create Account
                            </h1>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="text-green-600 w-10 h-10 sm:w-8 sm:h-8" />
                            <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark text-center">
                                Verify Your Account
                            </h1>
                        </>
                    )}
                </div>

                {/* Step 1: Registration Form */}
                {step === 1 && (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Helper to create horizontal label + input */}
                        {[
                            { label: "Username", name: "username", type: "text", placeholder: "Username" },
                            { label: "Full Name", name: "fullName", type: "text", placeholder: "Full Name" },
                            { label: "Address", name: "address", type: "text", placeholder: "Address" },
                            { label: "Phone", name: "phone", type: "text", placeholder: "Phone" },
                            { label: "Email", name: "email", type: "email", placeholder: "Email" },
                            { label: "Password", name: "password", type: "password", placeholder: "Password" },
                        ].map((field) => (
                            <div key={field.name} className="flex items-center justify-between gap-4 w-full">
                                <label className="w-1/4 text-right font-medium">{field.label}:</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    placeholder={field.placeholder}
                                    className="w-1/2 input-field py-1 px-2 border rounded"
                                />
                            </div>
                        ))}

                        {/* Role Selector */}
                        <div className="flex items-center justify-between gap-4 w-full">
                            <label className="w-1/4 text-right font-medium">Role:</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                required
                                className="w-1/2 input-field py-1 px-2 border rounded bg-white"
                            >
                                <option value="">Select your role</option>
                                <option value="farmer">Farmer</option>
                                <option value="vet">Veterinarian</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Conditional Fields */}
                        <AnimatePresence mode="wait">
                            {formData.role === "farmer" && (
                                <motion.div
                                    key="farmerFields"
                                    variants={formVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4 bg-green-50 p-4 rounded-xl"
                                >
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <label className="w-1/4 text-right font-medium">Farm Name:</label>
                                        <input
                                            type="text"
                                            name="farmName"
                                            value={formData.farmName}
                                            onChange={handleChange}
                                            required
                                            placeholder="Farm Name"
                                            className="w-1/2 input-field py-1 px-2 border rounded"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <label className="w-1/4 text-right font-medium">NID Photo:</label>
                                        <label className="upload-box flex items-center gap-2 p-2 border rounded-lg cursor-pointer w-1/2">
                                            <Upload className="text-green-700" />
                                            <span>Choose File</span>
                                            <input
                                                type="file"
                                                name="nidPhoto"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="hidden"
                                                required
                                            />
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {formData.role === "vet" && (
                                <motion.div
                                    key="vetFields"
                                    variants={formVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.4 }}
                                    className="space-y-4 bg-green-50 p-4 rounded-xl"
                                >
                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <label className="w-1/4 text-right font-medium">Specialization:</label>
                                        <input
                                            type="text"
                                            name="specialization"
                                            value={formData.specialization}
                                            onChange={handleChange}
                                            required
                                            placeholder="Specialization"
                                            className="w-1/2 input-field py-1 px-2 border rounded"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 w-full">
                                        <label className="w-1/4 text-right font-medium">Certificate:</label>
                                        <label className="upload-box flex items-center gap-2 p-2 border rounded-lg cursor-pointer w-1/2">
                                            <Upload className="text-green-700" />
                                            <span>Choose File</span>
                                            <input
                                                type="file"
                                                name="certificatePhoto"
                                                onChange={handleChange}
                                                accept="image/*"
                                                className="hidden"
                                                required
                                            />
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {formData.role === "admin" && (
                                <motion.div
                                    key="adminFields"
                                    variants={formVariant}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.4 }}
                                    className="bg-green-50 p-4 rounded-xl text-center"
                                >
                                    <p className="text-sm sm:text-base text-gray-700 italic">
                                        Admin accounts have system-level access. Proceed carefully.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Google Login Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={handleGoogleLogin}
                            className="btn-google mx-auto block py-2 px-4 mt-4 text-sm bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                        >
                            <LogIn className="inline w-4 h-4 mr-2" />
                            Login with Google
                        </motion.button>

                        {/* Submit Button */}
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="btn-primary mx-auto block py-2 px-6 mt-4 text-sm sm:text-base"
                        >
                            Create Account
                        </motion.button>
                    </form>
                )}

                {/* Step 2: OTP Verification */}
                {step === 2 && registeredUser && (
                    <div className="space-y-6">
                        {/* Success Message */}
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
                            <p className="font-semibold text-lg">Registration is complete!</p>
                            <p className="text-sm mt-1">Please verify your account using the OTP sent to:</p>
                        </div>

                        <div className="text-center text-gray-600">
                            <p className="font-semibold">{registeredUser.email}</p>
                            <p className="font-semibold">{registeredUser.phone}</p>
                        </div>

                        {/* Email OTP Verification */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-blue-50 p-6 rounded-xl space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <Mail className="text-blue-600 w-6 h-6" />
                                <h3 className="text-lg font-semibold text-blue-900">Email Verification</h3>
                            </div>
                            <input
                                type="text"
                                name="emailOtp"
                                value={otpData.emailOtp}
                                onChange={handleOtpChange}
                                placeholder="Enter 6-digit email OTP"
                                maxLength="6"
                                className="w-full input-field py-2 px-4 border rounded-lg text-center text-2xl tracking-widest"
                            />
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleVerifyEmail}
                                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Verify Email
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleResendOtp('Email')}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Resend
                                </motion.button>
                            </div>
                        </motion.div>

                        {/* Phone OTP Verification */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-green-50 p-6 rounded-xl space-y-4"
                        >
                            <div className="flex items-center gap-2">
                                <Phone className="text-green-600 w-6 h-6" />
                                <h3 className="text-lg font-semibold text-green-900">Phone Verification</h3>
                            </div>
                            <input
                                type="text"
                                name="phoneOtp"
                                value={otpData.phoneOtp}
                                onChange={handleOtpChange}
                                placeholder="Enter 6-digit phone OTP"
                                maxLength="6"
                                className="w-full input-field py-2 px-4 border rounded-lg text-center text-2xl tracking-widest"
                            />
                            <div className="flex gap-3">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleVerifyPhone}
                                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                                >
                                    Verify Phone
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleResendOtp('Phone')}
                                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
                                >
                                    Resend
                                </motion.button>
                            </div>
                        </motion.div>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            You can verify using either email or phone OTP to activate your account.
                        </p>
                    </div>
                )}
            </motion.div>
        </section>
    );
};

export default CreateAccount;
