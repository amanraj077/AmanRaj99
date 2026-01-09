import pandas as pd
import os

def analyze_attendance():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    csv_path = os.path.join(base_dir, "attendance.csv")

    df = pd.read_csv(csv_path)

    df["Attendance_Percentage"] = (
        df["Classes_Attended"] / df["Total_Classes"]
    ) * 100

    def categorize(p):
        if p >= 75:
            return "Good"
        elif p >= 50:
            return "Average"
        else:
            return "Poor"

    df["Category"] = df["Attendance_Percentage"].apply(categorize)

    summary = df["Category"].value_counts().to_dict()

    return df.to_dict(orient="records"), summary
