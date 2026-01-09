# Attendance Analyzer

## Introduction
The Attendance Analyzer is a mini project designed to process and visualize student attendance data. In modern educational institutions, tracking attendance manually can be inefficient. This project aims to automate the analysis of attendance records and present them through an interactive, visually engaging web interface.

## Objectives
The primary objectives of this project are:
1. To analyze student attendance records to classify students into performance categories (Good, Average, Poor).
2. To demonstrate the integration of a Python-based backend with a modern, interactive frontend.
3. To visualize data using charts and dynamic user interface elements.

## Dataset Description
The project utilizes a dataset inspired by Kaggle student attendance records. The dataset includes fields such as Student Name, Roll Number, Total Classes Held, and Classes Attended. This data is processed to calculate the attendance percentage for each student.

## Technologies Used
The project is built using the following technologies:
- **Backend**: Python, Flask, Pandas.
- **Frontend**: HTML5, CSS3, JavaScript.
- **Visualization**: Chart.js.
- **Styling**: Custom CSS with Glassmorphism and Abstract Visuals.

## Backend Description
The backend is powered by Python. The Flask web framework serves as the API provider, exposing endpoints to fetch attendance data. The Pandas library is used for data manipulation, specifically to read the dataset (CSV/Excel), calculate percentages, and categorize students based on their attendance performance.

## Frontend Description
The frontend features a distinctive "Antigravity" user interface. It moves away from traditional static tables, instead representing each student as a floating card in a digital space. The design employs a dark theme with abstract background patterns and uses glassmorphism effects to create depth and modern aesthetics.

## Features
- **Data Visualization**: Includes a Bar Chart for category breakdown and a Pie Chart for attendance distribution.
- **Interactive Cards**: Student details are displayed on cards that feature subtle floating animations.
- **Detailed Insights**: Hovering over a card reveals additional metrics such as orbit stability and last active status.
- **Responsive Layout**: The dashboard adapts to different screen sizes, ensuring usability across devices.
- **Unified Scrolling**: The interface allows seamless scrolling through charts and student records.

## How to Run the Project
To run this project on a local machine, follow these steps:

1. **Prerequisites**: Ensure Python and pip are installed on the system.
2. **Install Dependencies**: Install Flask and Pandas using the command: `pip install flask pandas`.
3. **Start the Backend**: Navigate to the project directory and run the Flask application: `python app.py`. This will start the API server at `http://127.0.0.1:5000/`.
4. **Launch the Frontend**: Open the `index.html` file in any modern web browser.
5. **View Results**: The application will automatically fetch data from the backend and display the visualizations.

## Output Description
Upon launching the application, the user is presented with a dashboard containing:
- **Header**: Displays the project title and connection status.
- **Charts Section**: Two animated charts summarizing the class attendance performance.
- **Student Cards**: A grid of floating cards, each representing a student. The cards are color-coded based on their attendance category (Green for Good, Yellow for Average, Red for Poor).

## Conclusion
The Attendance Analyzer successfully demonstrates the application of web technologies to solve the practical problem of data presentation. By combining a robust analytical backend with a creative and interactive frontend, the project makes attendance monitoring more engaging and insightful.
