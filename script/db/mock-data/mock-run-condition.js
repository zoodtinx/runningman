export const mockRunCondition = [
   {
      name: "Temperature",
      type: "weather",
      value: "32",
      unit: "°C",
      summary: "It's kinda hot for running today.",
      futureValue: "30",
      range: "bad", // hot for running
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Humidity",
      type: "weather",
      value: "60",
      unit: "%",
      summary: "Humidity's feeling a bit sticky.",
      futureValue: "55",
      range: "okay", // moderate humidity
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Wind Speed",
      type: "weather",
      value: "15",
      unit: "km/h",
      summary: "Light breeze, nothing too crazy.",
      futureValue: "10",
      range: "good", // breeze is good for running
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Precipitation Probability",
      type: "weather",
      value: "10",
      unit: "%",
      summary: "Low chance you'll get caught in rain.",
      futureValue: "20",
      range: "good", // low rain chance
      updatedAt: new Date().toISOString(),
   },
   {
      name: "UV Index",
      type: "weather",
      value: "7",
      unit: "",
      summary: "Sun's strong, don’t forget your sunscreen!",
      futureValue: "5",
      range: "bad", // high UV index
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Visibility",
      type: "weather",
      value: "10",
      unit: "km",
      summary: "Clear skies, great visibility out there.",
      futureValue: "10",
      range: "good", // clear visibility
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Air Quality Index (AQI)",
      type: "airQuality",
      value: "45",
      unit: "",
      summary: "Air's fresh and clean, breathe easy.",
      futureValue: "50",
      range: "good", // AQI low
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Sunrise Time",
      type: "sun",
      value: "05:50 AM",
      unit: "",
      summary: "Sun’s about to rise, early bird vibes.",
      futureValue: "05:51 AM",
      range: "good", // time info no bad/good so default good
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Sunset Time",
      type: "sun",
      value: "06:45 PM",
      unit: "",
      summary: "Sun’ll set around evening, enjoy the light.",
      futureValue: "06:44 PM",
      range: "good",
      updatedAt: new Date().toISOString(),
   },
   {
      name: "Heat Index",
      type: "weather",
      value: "35",
      unit: "°C",
      summary: "Feels hotter than usual, stay hydrated!",
      futureValue: "33",
      range: "bad", // heat index high
      updatedAt: new Date().toISOString(),
   },
];
