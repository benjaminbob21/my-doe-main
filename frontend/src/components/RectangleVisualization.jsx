import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function RectangleVisualization() {
  const [minMaxValues, setMinMaxValues] = useState({
    minEasting: null,
    maxEasting: null,
    minNorthing: null,
    maxNorthing: null,
  });
  const [data, setData] = useState([]);
  const [scaledPoints, setScaledPoints] = useState([]);
  const [selectedPoint, setSelectedPoint] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const minMaxResponse = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/maxmin`
        );
        setMinMaxValues(minMaxResponse.data);

        const dataResponse = await axios.get(
          `${API_BASE_URL}/api/waterqualityData/Distinct`
        );
        setData(dataResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateScaledValue = (value, minValue, maxValue) => {
      if (maxValue === null) {
        maxValue = minValue * 1.1; // Handle null values by providing a slight margin
      }

      const scaledValue = ((value - minValue) / (maxValue - minValue)) * 10;
      // Clamp the scaled value between 0 and 100
      return Math.min(Math.max(scaledValue, 0), 10);
    };

    if (data && minMaxValues) {
      const newScaledPoints = data.map((values, index) => ({
        scaledX: calculateScaledValue(
          values.Easting,
          minMaxValues.minEasting,
          minMaxValues.maxEasting
        ),
        scaledY: calculateScaledValue(
          values.Northing,
          minMaxValues.minNorthing,
          minMaxValues.maxNorthing
        ),
        ...values, // Include other data for the point
      }));

      setScaledPoints(newScaledPoints);
    }
  }, [data, minMaxValues]);

  console.log(scaledPoints);
  console.log("part one", data);
  console.log(minMaxValues);

  return (
    <div className="relative w-[80%] mt-16 ml-[50px] border-[5px] border-solid border-blue-600 rounded-lg px-5 pb-5 box-border bg-[#00bfff]">
      <div className="w-full text-center text-[aliceblue] py-2">
        <h1 className=" text-3xl font-bold">
          Water Data Quality Visualization
        </h1>
      </div>
      <div className="relative w-full h-[500px] border-[5px] border-solid border-blue-600 rounded-lg">
        {scaledPoints.map((point, index) => (
          <div
            key={index}
            className="absolute w-[10px] h-[10px] bg-red-500 rounded-full cursor-pointer"
            style={{
              left: `${point.scaledX * 1000}%`,
              top: `${point.scaledY * 1000}%`,
            }}
            onMouseEnter={() => setSelectedPoint(point)}
            onMouseLeave={() => setSelectedPoint(null)}
            onClick={() => setSelectedPoint(point)}
          >
            {selectedPoint === point && (
              <div className="absolute text-xs text-black bg-white p-1 border border-white rounded bottom-[15px] -left-1/2 transform -translate-x-1/2">
                <p>Easting: {point.Easting}</p>
                <p>Northing: {point.Northing}</p>
                <p>DateTime: {point.DateTime}</p>
                <p>Salinity: {point.Salinity}</p>
                <p>StationID: {point.StationID}</p>
                <p>TotalDissolvedSolids: {point.TotalDissolvedSolids}</p>
                <p>pH: {point.pH}</p>
                <p>pHMV: {point.pHMV}</p>
                <p>SaturationOxygen: {point.SaturationOxygen}</p>
                <p>PartialPressureOxygen: {point.PartialPressureOxygen}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RectangleVisualization;
