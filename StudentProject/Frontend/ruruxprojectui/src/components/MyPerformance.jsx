import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import StudentDashboard from "./StudentDashboard";
import { Chart, ArcElement, CategoryScale, LinearScale } from "chart.js";
import 'chartjs-plugin-datalabels';
Chart.register(ArcElement, CategoryScale, LinearScale);

const MyPerformance = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const loggedInUsername = localStorage.getItem("loggedInUsername");
        const response = await axios.get(
          `http://localhost:8080/api/marks/${loggedInUsername}`
        );
        setMarks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching marks:", error);
        setLoading(false);
      }
    };

    fetchMarks();
  }, []);

  const subjectData = marks.map((mark) => ({
    subjectName: mark.subject.subjectName,
    marksObtained: mark.marksObtained
  }));

  const customColors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4CAF50",
    "#9C27B0",
    "#FF8A65",
    "#7986CB",
    "#FFD54F",
    "#66BB6A",
    "#FF80AB"
  ];

  const backgroundColors = customColors.slice(0, subjectData.length);
  const hoverBackgroundColors = backgroundColors.map(color => color + "AA");

  const data = {
    labels: subjectData.map(data => data.subjectName),
    datasets: [
      {
        data: subjectData.map(data => data.marksObtained),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.label + ": " + context.parsed.toFixed(2) + "%";
          },
        },
      },
      datalabels: {
        color: "#000",
        formatter: (value, context) => {
          return ((value / context.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%';
        }
      }
    },
    layout: {
      padding: 20,
    },
    scales: {
      xAxis: {
        display: false,
      },
      yAxis: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
        hoverBorderColor: "#fff",
      },
    },
    animation: false,
  };

  return (
    <>
      <StudentDashboard />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginLeft: "50px", position: "relative" }}>
          {loading ? (
            <p>Loading...</p>
          ) : marks.length > 0 ? (
            <div>
              <h3 style={{textAlign: "center"}}>Marks Obtained</h3>
              <div
                style={{
                  position: "relative",
                  width: "400px",
                  height: "400px",
                }}
              >
                <Pie data={data} options={options} />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "100%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "left",
                    color: "#000",
                    fontSize: "12px",
                    fontWeight: "bold",
                    zIndex: 1,
                  }}
                >
                  {subjectData.map((data, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      <span
                        style={{
                          backgroundColor: backgroundColors[index],
                          padding: "2px 8px",
                          borderRadius: "4px",
                          marginRight: "1500px",
                          display: "inline-block",
                        }}
                      ></span>
                      <span style={{ display: "inline-block", verticalAlign: "middle", color: "#000" }}>
                        {`${data.subjectName} - ${data.marksObtained}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <h3  style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "70vh", 
            }}>No performance data available</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default MyPerformance;
