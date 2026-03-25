A full-stack machine learning web application that predicts student academic performance and provides personalized insights based on study habits and subject-level metrics.

⸻

Live Demo:
	•	🌐 Frontend: https://learnlytics-student-perfomance-pred.vercel.app
	•	⚙️ Backend API: https://learnlytics-student-perfomance-predictor.onrender.com

⸻

Architecture:

React (Vercel)
↓
Flask API (Render)
↓
ML Model (Scikit-learn / XGBoost)
↓
Prediction + Insights

⸻

Tech Stack:

Frontend:
	•	React.js
	•	Recharts

Backend:
	•	Flask
	•	Flask-CORS

Machine Learning:
	•	Scikit-learn
	•	XGBoost
	•	NumPy, Pandas

Deployment:
	•	Vercel (Frontend)
	•	Render (Backend)

⸻

Features:
	•	📈 Predict student performance based on:
	•	Study hours
	•	Attendance
	•	Participation
	•	Subject-wise scores
	•	📊 Interactive dashboard with:
	•	Score comparison charts
	•	Performance insights
	•	💡 Personalized recommendations:
	•	Weak subject detection
	•	Study improvement suggestions

Installation (local setup):-

Backend(python): 

cd student_backend
pip install -r requirements.txt
python app.py

Frontend(react.js):

cd student_frontend
npm install
npm start


