import React from 'react';
import './contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <h1 className='contact-title'>Contact</h1>
      <p className='contact-description'>
        Have a question, feedback, or suggestion? I'd love to hear from you! Please feel free to reach out to me using one of the following methods:
      </p>
      <ul>
        <div className='call-m'>
        <li>Email: patiencewanjiru123@gmail.com</li>
        <li>Phone: 123-456-7890</li>
        </div>
      </ul>
      <p className='contact-description'>
        I strive to respond to all inquiries as soon as possible. Your feedback is valuable to me and helps me improve my services. Thank you for contacting me!
      </p>
      </div>
  );
};

export default Contact;
