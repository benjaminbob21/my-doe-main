import fs from 'fs';
import csvParser from 'csv-parser';
import {WaterQualityData} from './models/at200.js';
import {WaterQualityDataSecond }from './models/at500.js';
import {BatteryData }from './models/vulink.js';

// Function to seed data from CSV file into WaterQualityData model
async function seedWaterQualityDataFromCSV(filePath) {
    const rows = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          rows.push({
            DateTime: new Date(row["Date Time"]),
            Salinity: parseFloat(row["Salinity (psu)"]),
            TotalDissolvedSolids: parseFloat(
              row["Total Dissolved Solids (mg/L)"]
            ),
            pH: parseFloat(row["pH (pH)"]),
            pHMV: parseFloat(row["pH MV (mV)"]),
            SaturationOxygen: parseFloat(row["% Saturation O₂ (% sat)"]),
            PartialPressureOxygen: parseFloat(row["Partial Pressure O₂ (psi)"]),
            StationID: row["station_id"],
            Easting: parseFloat(row["easting"]),
            Northing: parseFloat(row["northing"]),
            Temperature: parseFloat(row["Temperature (C)"]),
          });
        })
        .on('end', async () => {
          try {
            await WaterQualityData.bulkCreate(rows);
            console.log('Data seeding completed successfully for WaterQualityData.');
            resolve();
          } catch (error) {
            console.error('Error seeding data for WaterQualityData:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file for WaterQualityData:', error);
          reject(error);
        });
    });
  }
  
  // Function to seed data from CSV file into WaterQualityDataSecond model
  async function seedWaterQualityDataSecondFromCSV(filePath) {
    const rows = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          rows.push({
            DateTime: new Date(row['Date Time']),
            Salinity: parseFloat(row['Salinity (psu)']),
            TotalDissolvedSolids: parseFloat(row['Total Dissolved Solids (mg/L)']),
            StationID: row['station_id'],
            Easting: parseFloat(row['easting']),
            Northing: parseFloat(row['northing'])
          });
        })
        .on('end', async () => {
          try {
            await WaterQualityDataSecond.bulkCreate(rows);
            console.log('Data seeding completed successfully for WaterQualityDataSecond.');
            resolve();
          } catch (error) {
            console.error('Error seeding data for WaterQualityDataSecond:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file for WaterQualityDataSecond:', error);
          reject(error);
        });
    });
  }
  
  // Function to seed data from CSV file into BatteryData model
  async function seedBatteryDataFromCSV(filePath) {
    const rows = [];
  
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (row) => {
          rows.push({
            DateTime: new Date(row['Date Time']),
            BatteryLevel: parseFloat(row['Battery Level (%)']),
            StationID: row['station_id'],
            Baro: row['Baro (psi)'] ? parseFloat(row['Baro (psi)']) : null,
            Temperature: row['Temperature (C)'] ? parseFloat(row['Temperature (C)']) : null,
            Easting: parseFloat(row['easting']),
            Northing: parseFloat(row['northing'])
          });
        })
        .on('end', async () => {
          try {
            await BatteryData.bulkCreate(rows);
            console.log('Data seeding completed successfully for BatteryData.');
            resolve();
          } catch (error) {
            console.error('Error seeding data for BatteryData:', error);
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('Error reading CSV file for BatteryData:', error);
          reject(error);
        });
    });
  }

// Usage 
const waterQualityDataFilePath = '../data/csv_files/at200.csv';
const waterQualityDataSecondFilePath = '../data/csv_files/at500.csv';
const batteryDataFilePath = '../data/csv_files/vulink.csv';

Promise.all([
  seedWaterQualityDataFromCSV(waterQualityDataFilePath),
  seedWaterQualityDataSecondFromCSV(waterQualityDataSecondFilePath),
  seedBatteryDataFromCSV(batteryDataFilePath)
])
  .then(() => {
    console.log('Data seeding completed for all tables.');
  })
  .catch((error) => {
    console.error('Error seeding data:', error);
  });
