from flask import Flask, jsonify
from flask_cors import CORS
from analysis import analyze_attendance

app = Flask(__name__)
CORS(app)

@app.route("/attendance")
def attendance():
    students, summary = analyze_attendance()
    return jsonify({
        "students": students,
        "summary": summary
    })

print("Starting Flask server...")
app.run(host="127.0.0.1", port=5000)
