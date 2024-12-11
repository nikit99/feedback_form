import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import '../public/feedbackImage.jpg';

const App = () => {
  const [step, setStep] = useState(1);
  const [ratings, setRatings] = useState([0, 0, 0, 0, 0, 0]);
  const [feedback, setFeedback] = useState('');

  const questions = [
    "The consultant's response addressed my query",
    'The consultant displayed ownership',
    'The consultant displayed adequate communication skills',
    'The consultant was able to understand my query',
    'The consultant shared information in a simple and effective manner',
    'How can we improve your support experience?',
  ];

  const options = [
    'Enhance interaction quality and helpfulness of customer support executive',
    'Make policies more flexible',
    'Reduce time/effort required to resolve an issue',
    'Improve the availability of information on our website/app',
    'Ensure ease in reaching customer support',
    'Others',
  ];

  const handleRatingChange = (index, value) => {
    const updatedRatings = [...ratings];
    updatedRatings[index] = value;
    setRatings(updatedRatings);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('https://feedback-form-backend-vret.onrender.com', {
        ratings,
        feedback,
      });
      setStep(step + 1);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  const progress = Math.min(Math.ceil((step / 8) * 100), 100);

  return (
    <div className="feedback-container">
      {step !== 8 && (
        <div className="feedback-left">
          <img src="/feedImg.jpg" alt="Feedback" className="circular-image" />
          <p className="feedback-left-text">
            Your feedback matters to us. Please rate us on the following
            parameters. (1 - Least Score and 5 - Highest Score)
          </p>
        </div>
      )}

      <div className="feedback-right">
        {step <= 6 && (
          <div className="right">
            <h3>{questions[step - 1]}</h3>
            {step <= 5 && (
              <div className="rating-container">
                <div className="rating-boxes">
                  {['1', '2', '3', '4', '5'].map((value, index) => (
                    <button
                      key={index}
                      className={`rating-box ${
                        ratings[step - 1] === +value ? 'selected' : ''
                      }`}
                      onClick={() => handleRatingChange(step - 1, +value)}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="rating-labels">
                  <span className="left-label">Strongly Disagree</span>
                  <span className="right-label">Strongly Agree</span>
                </div>
              </div>
            )}
            {step > 5 && (
              <div className="radio-options">
                {options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={`question-${step}`}
                      value={option}
                      onChange={() => handleRatingChange(step - 1, index + 1)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            <div className="buttons-container">
              <div className="progress-bar-container">
                <span className="progress-text">{progress}% completed</span>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="buttons">
                <button disabled={step === 1} onClick={() => setStep(step - 1)}>
                  Previous
                </button>
                <button onClick={() => setStep(step + 1)}>
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <h3>Any additional suggestions/comments?</h3>
            <textarea
              value={feedback}
              placeholder="Enter your feedback here..."
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="buttons-container">
              <div className="progress-bar-container">
                <span className="progress-text">{progress}% completed</span>
                <div
                  className={`progress-bar ${
                    step === 7 ? 'adjusted-progress-bar' : ''
                  }`}
                >
                  <div
                    className="progress"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="buttons">
                <button disabled={step === 1} onClick={() => setStep(step - 1)}>
                  Previous
                </button>
                <button onClick={handleSubmit}>
                  {step === 7 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 8 && (
          <div className="thank-you">
            <img src="feedbackThankyou.avif" alt="Thank You" />
            <h3>Thank you for submitting your feedback!</h3>
            <button className="submitButton" onClick={()=>{alert('Feedback submitted successfully!')}}>
              Finish
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
