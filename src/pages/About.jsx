import React from "react";
import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 text-gray-800 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-8 text-center text-green-800"
        >
          About AgriPredict
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2"
          >
            <p className="text-lg text-justify mb-4">
              AgriPredict is a revolutionary platform designed to empower farmers, traders, 
              and stakeholders in the agricultural sector. By leveraging state-of-the-art 
              technology, we provide accurate price predictions, real-time monitoring, 
              and actionable insights.
            </p>
            <p className="text-lg text-justify">
              Our mission is to bridge the gap between technology and agriculture, fostering 
              sustainable growth and informed decision-making. AgriPredict integrates advanced 
              data analytics and machine learning to ensure that users have access to the latest 
              trends, historical data, and market news.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:w-1/2"
          >
            <img
              src="https://img.freepik.com/premium-photo/realistic-photo-sunny-fields-farmers-are-working-field-high-glossy-photography_909774-2045.jpg"
              alt="Agriculture field"
              className="rounded-lg shadow-lg w-full h-64 md:h-80 object-cover"
            />
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              src: "https://media.istockphoto.com/id/1049653176/photo/happy-thai-female-farmer-harvesting-rice-in-countryside-thailand.jpg?s=612x612&w=0&k=20&c=BD--rcVXQNb-2IE3gg-9BVm8HQ4QqfGjGB7WOFshdJw=",
              alt: "Farmer analyzing crops",
              title: "Empowering Farmers"
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe_h0SeHhwMJnZCCCFprHBchTboTrqKepsEmdQKNSVQdMYerFw554s9rEIi90UW-NatmU&usqp=CAU",
              alt: "Farming equipment",
              title: "Modern Agriculture"
            },
            {
              src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgf83WsRR6nJwYy_B9rocHKDA9Y_t2pIVoMy2oGfgxFEa3KzUkOhv1TPUNRkEmDmwBYWQ&usqp=CAU",
              alt: "Crops and data chart",
              title: "Data-Driven Insights"
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{item.title}</h3>
                <p className="text-gray-600">
                  AgriPredict is committed to transforming agriculture, enhancing productivity, 
                  and building a resilient future for our farmers.
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default About;

