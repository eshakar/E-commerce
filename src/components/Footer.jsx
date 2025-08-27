import React from 'react'
import { motion } from 'framer-motion'
import { Facebook, Twitter, Instagram } from 'lucide-react'

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  }

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-blue-900 text-white mt-16"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Filters Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <motion.a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  All
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  Electronics
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* About Us Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <ul className="space-y-2 text-blue-100">
              <li>
                <motion.a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  About Us
                </motion.a>
              </li>
              <li>
                <motion.a
                  href="#"
                  className="hover:text-white transition-colors duration-200"
                  whileHover={{ x: 5 }}
                >
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Follow Us Section */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-blue-700 mt-8 pt-8 text-center text-blue-200"
        >
          <p>© 2024 American</p>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer