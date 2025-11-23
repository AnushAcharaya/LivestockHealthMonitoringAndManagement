import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserPlus, Upload } from "lucide-react";

const CreateAccount = () => {
    const [formData, setFormData] = useState({
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
        alert("Account creation request submitted successfully!");
    };

    const formVariant = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="section-bg">
            <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="card w-full max-w-2xl sm:max-w-lg lg:max-w-xl"
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-6 justify-center">
                    <UserPlus className="text-primary-dark w-10 h-10 sm:w-8 sm:h-8" />
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-dark text-center">
                        Create Account
                    </h1>
                </div>

                {/* Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="form-row">
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter your full name"
                        />
                    </div>

                    {/* Address */}
                    <div className="form-row">
                        <label className="label">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter your address"
                        />
                    </div>


                    <div className="form-row">
                        <label className="label">Phone No</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Email */}
                    <div className="form-row">
                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="form-row">
                        <label className="label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="input-field"
                            placeholder="Create a strong password"
                        />
                    </div>

                    {/* Role Selector */}
                    <div className="form-row">
                        <label className="label">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="input-field bg-white"
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
                                <div className="form-row">
                                    <label className="label">Farm Name</label>
                                    <input
                                        type="text"
                                        name="farmName"
                                        value={formData.farmName}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="Enter your farm name"
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="label">Upload NID Photo</label>
                                    <label className="upload-box">
                                        <Upload className="text-green-700 mr-2" />
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
                                    {formData.nidPhoto && (
                                        <p className="text-xs sm:text-sm text-green-700 mt-1">
                                            {formData.nidPhoto.name}
                                        </p>
                                    )}
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
                                <div className="form-row">
                                    <label className="label">Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={formData.specialization}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="E.g., Animal Surgery, Dairy Health"
                                    />
                                </div>

                                <div className="form-row">
                                    <label className="label">Upload Certificate</label>
                                    <label className="upload-box">
                                        <Upload className="text-green-700 mr-2" />
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
                                    {formData.certificatePhoto && (
                                        <p className="text-xs sm:text-sm text-green-700 mt-1">
                                            {formData.certificatePhoto.name}
                                        </p>
                                    )}
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
                                className="bg-green-50 p-4 rounded-xl"
                            >
                                <p className="text-sm sm:text-base text-gray-700 italic text-center">
                                    Admin accounts have system-level access. Proceed carefully.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="btn-primary w-full py-3 mt-6 text-base sm:text-lg"
                    >
                        Create Account
                    </motion.button>
                </form>
            </motion.div>
        </section>
    );
};

export default CreateAccount;
