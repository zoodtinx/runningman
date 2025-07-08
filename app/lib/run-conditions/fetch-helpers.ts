const locationCoords: Record<string, string> = {
   bangkok: "13.7563,100.5018",
   chiangmai: "18.7965,98.9523",
   phuket: "7.8804,98.3923",
   khonkaen: "16.4419,102.8356",
   hatyai: "7.0086,100.4768",
};

export async function fetchRealtimeWeatherData(location: string) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/realtime?location=${coords}&units=metric&apikey=${process.env.TOMORROWIO_API_KEY}`;

   console.log("url", url);

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

export async function fetchFutureWeatherData(location: string) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coords}&units=metric&timesteps=1h&apikey=${process.env.TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      console.log("data", data);

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
