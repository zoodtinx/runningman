import dotenv from "dotenv";
dotenv.config();

const locationCoords = {
   bangkok: "13.7563,100.5018",
   chiangmai: "18.7883,98.9853",
   pai: "19.3581,98.4360",
   phuket: "7.8804,98.3923",
   krabi: "8.0863,98.9063",
};

export async function fetchRealtimeWeatherData(location) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/realtime?location=${coords}&units=metric&apikey=${process.env.TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      return {
         time: data.data.time,
         values: data.data.values,
      };
   } catch (error) {
      console.error("Failed to fetch realtime weather data:", error);
      return null;
   }
}

export async function fetchFutureWeatherData(location) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coords}&units=metric&timesteps=1h&startTime=now&endTime=nowPlus1h&apikey=${process.env.TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      console.log("data.timelines", data.timelines);

      const interval = data.timelines.hourly[0];
      return {
         time: interval.startTime,
         values: interval.values,
      };
   } catch (error) {
      console.error("Failed to fetch future weather data:", error);
      return null;
   }
}

async function testWeatherFetchFunctions() {
   const testLocation = "bangkok";
   console.log(
      `Testing fetchRealtimeWeatherData for location: ${testLocation}`
   );
   try {
      const realtimeData = await fetchRealtimeWeatherData(testLocation);
      console.log("Realtime Weather Data:", realtimeData);
   } catch (err) {
      console.error("Error in fetchRealtimeWeatherData:", err);
   }

   console.log(`Testing fetchFutureWeatherData for location: ${testLocation}`);
   try {
      const futureData = await fetchFutureWeatherData(testLocation);
      console.log("Future Weather Data:", futureData);
   } catch (err) {
      console.error("Error in fetchFutureWeatherData:", err);
   }
}

// Uncomment to run the test
testWeatherFetchFunctions();
