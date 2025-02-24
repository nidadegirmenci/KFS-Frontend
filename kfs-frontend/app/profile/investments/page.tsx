"use client"

import { motion } from "framer-motion"

export default function InvestmentsPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center p-8 rounded-lg shadow-lg bg-white bg-opacity-70 backdrop-blur-md"
      >
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Yatırımlarım</h1>
        <p className="text-xl text-gray-600">Hiç yatırımınız bulunmamaktadır.</p>
      </motion.div>
    </div>
  )
}

