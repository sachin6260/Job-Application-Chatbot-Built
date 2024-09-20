import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you in your job application today?", sender: "bot" },
  ]);
  const [step, setStep] = useState(0);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    jobRole: '',
    experience: '',
    startDate: '',
    currentCompany: '',
    portfolio: '',
    salary: '',
    availability: '',
    resume: null,
  });
  const [userInput, setUserInput] = useState('');

  const predefinedQuestions = [
    "Let's get started! What's your full name?",
    "Great! Now, please provide your email address.",
    "Could you share your phone number?",
    "What’s your current address?",
    "Which job role are you applying for?",
    "How many years of experience do you have in this field?",
    "When can you start? (Preferred start date)",
    "What is your current company and position?",
    "Please share your LinkedIn profile or portfolio link.",
    "What’s your expected salary for this role?",
    "Are you available for an interview? Please provide some time slots.",
  ];

  const appreciationMessages = [
    "Thank you for your response! You're doing great!",
    "Awesome! Let's keep moving forward.",
    "We appreciate your information, thank you!",
    "Nice! We're almost there!",
  ];

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    const updatedMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(updatedMessages);

    const userInfoKeys = [
      "name", "email", "phoneNumber", "address",
      "jobRole", "experience", "startDate", "currentCompany",
      "portfolio", "salary", "availability",
    ];

    if (step < userInfoKeys.length) {
      setUserInfo({ ...userInfo, [userInfoKeys[step]]: userInput });

      // Show appreciation after certain steps
      if (step === 1 || step === 3 || step === 5 || step === 7 || step === 9) {
        setTimeout(() => {
          const appreciationMessage = appreciationMessages[Math.floor(Math.random() * appreciationMessages.length)];
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: appreciationMessage, sender: "bot" },
          ]);
        }, 500);
      }

      // Move to the next question or show resume upload prompt
      setTimeout(() => {
        if (step === predefinedQuestions.length - 1) {
          const finalMessage = "You've completed all questions! Now, please upload your resume (PDF only).";
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: finalMessage, sender: "bot" },
          ]);
        } else {
          const nextQuestion = predefinedQuestions[step];
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: nextQuestion, sender: "bot" },
          ]);
        }
      }, 1000);
    }

    setUserInput('');
    setStep(step + 1);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setUserInfo({ ...userInfo, resume: e.target.files[0] });
      const updatedMessages = [...messages, { text: 'Resume uploaded successfully!', sender: 'user' }];
      setMessages(updatedMessages);
      
      // Thank the user for uploading their resume
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Thank you for uploading your resume! We'll review it shortly.", sender: "bot" },
        ]);
      }, 500);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {step === predefinedQuestions.length ? (
        <div>
          <label htmlFor="resume">Upload Resume (PDF):</label>
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <input
          type="text"
          value={userInput}
          onChange={handleInputChange}
          placeholder="Type your response here..."
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
      )}

      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
