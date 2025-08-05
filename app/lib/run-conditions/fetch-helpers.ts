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

   const fields = [
      "temperature",
      "temperatureApparent",
      "humidity",
      "cloudCover",
      "uvIndex",
      "visibility",
      "windSpeed",
      "precipitationProbability",
      "epaAqi",
   ].join(",");

   const url = `https://api.tomorrow.io/v4/weather/realtime?location=${coords}&units=metric&fields=${fields}&apikey=${process.env.TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      const values = data.data?.values || null;
      const time = data.data?.time || "";

      if (!values) throw new Error("No realtime data found");

      return { time, values };
   } catch (error) {
      console.error("Failed to fetch realtime weather data:", error);
      return null;
   }
}

export async function fetchFutureWeatherData(location: string) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const url = `https://api.tomorrow.io/v4/weather/forecast?location=${coords}&timesteps=1h,1d&units=metric&apikey=${process.env.TOMORROWIO_API_KEY}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const data = await res.json();

      const timeline = data?.timelines?.hourly?.[0];
      if (!timeline) throw new Error("No hourly data");

      return {
         hourly: data?.timelines?.hourly?.[0],
         daily: data?.timelines?.daily?.[0],
      };
   } catch (error) {
      console.error("Failed to fetch future weather data:", error);
      return null;
   }
}

export async function fetchAQI(location: string) {
   const coords = locationCoords[location.toLowerCase()];
   if (!coords) throw new Error(`Unknown location: ${location}`);

   const [lat, lon] = coords.split(",");
   const apiKey = process.env.IQAIR_API_KEY;
   if (!apiKey) throw new Error("Missing IQAir API key");

   let latOverride = lat,
      lonOverride = lon;
   if (location.toLowerCase() === "bangkok") {
      latOverride = "13.730556";
      lonOverride = "100.541664";
   }
   const url = `https://api.airvisual.com/v2/nearest_city?lat=${latOverride}&lon=${lonOverride}&key=${apiKey}`;

   try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      const result = await res.json();

      const aqi = result?.data?.current?.pollution?.aqius;
      return typeof aqi === "number" ? aqi : null;
   } catch (error) {
      console.error("Failed to fetch IQAir AQI data:", error);
      return null;
   }
}
