const locationCoords: Record<string, string> = {
   bangkok: "13.7563,100.5018",
   chiangmai: "18.7883,98.9853",
   pai: "19.3581,98.4360",
   phuket: "7.8804,98.3923",
   krabi: "8.0863,98.9063",
};

export async function fetchRealtimeWeatherData(location: string) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/realtime?location=${coords}&units=metric&apikey=${process.env.NEXT_PUBLIC_TOMORROWIO_API_KEY}`;

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

   const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coords}&units=metric&timesteps=1h&startTime=nowPlus1h&endTime=nowPlus1h&apikey=${process.env.NEXT_PUBLIC_TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      const interval = data.data.timelines[0].intervals[0];
      return {
         time: interval.startTime,
         values: interval.values,
      };
   } catch (error) {
      console.error("Failed to fetch future weather data:", error);
      return null;
   }
}
