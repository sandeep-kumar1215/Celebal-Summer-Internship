import React from 'react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Thanks for checking about us!</h2>
      <h3 className="text-xl text-gray-600 mb-6">
        Hi, I am Sandeep Kumar, the developer of this website.
        <br />
        I have made this website to gain hands-on experience in React development.
        <br />
        All credit goes to <span className="text-blue-500 font-semibold">Namaste React</span>.
      </h3>
      <p className="text-lg text-gray-700">
        This project is a part of my learning journey, and I'm excited to share it with you!
      </p>
    </div>
  );
};

export default About;