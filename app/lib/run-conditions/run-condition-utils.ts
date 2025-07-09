// Utility functions and constants for run condition mapping

export const summaries: Record<string, string> = {
   temperature: "Current temperature.",
   "feels-like": "Feels like temperature.",
   humidity: "Humidity level.",
   cloudiness: "Cloud cover percentage.",
   "uv-index": "UV index level.",
   visibility: "Visibility distance in km.",
   "wind-speed": "Wind speed in km/h.",
   "rain-chance": "Chance of rain percentage.",
   "sunset-time": "Sunset time.",
   "sunrise-time": "Sunrise time.",
};

export const units: Record<string, string> = {
   temperature: "°C",
   "feels-like": "°C",
   humidity: "%",
   cloudiness: "%",
   "uv-index": "",
   visibility: "km",
   "wind-speed": "km/h",
   "rain-chance": "%",
   "sunset-time": "",
   "sunrise-time": "",
   aqi: "",
};

export const keyMap: Record<string, string> = {
   temperature: "temperature",
   "feels-like": "temperatureApparent",
   humidity: "humidity",
   cloudiness: "cloudCover",
   "uv-index": "uvIndex",
   visibility: "visibility",
   "wind-speed": "windSpeed",
   "rain-chance": "precipitationProbability",
   "sunset-time": "sunsetTime",
   "sunrise-time": "sunriseTime",
   aqi: "aqi",
};

export const dummyTimes: Record<string, string> = {
   "sunset-time": "21:00",
   "sunrise-time": "21:00",
};

export const runningConditionStatusMessages = {
   aqi: {
      1: "Stay inside today, air's too rough",
      2: "Not the cleanest but you can handle it",
      3: "Perfect air quality for a great run",
   },
   temperature: {
      1: "Too hot to run safely",
      2: "A little toasty but doable",
      3: "Perfect running weather",
   },
   "feels-like": {
      1: "Feels brutal out there",
      2: "Not too bad once you get going",
      3: "Feels absolutely perfect",
   },
   humidity: {
      1: "Sticky and suffocating",
      2: "A bit muggy but manageable",
      3: "Crisp and comfortable",
   },
   cloudiness: {
      1: "Blazing sun overhead",
      2: "Some nice cloud cover",
      3: "Perfect overcast conditions",
   },
   "uv-index": {
      1: "Sunscreen won't save you",
      2: "Sun's got some bite",
      3: "UV levels are chill",
   },
   visibility: {
      1: "Can barely see ahead",
      2: "Decent visibility",
      3: "Crystal clear views",
   },
   "wind-speed": {
      1: "Fighting hurricane winds",
      2: "Breezy but not bad",
      3: "Perfect gentle breeze",
   },
   "rain-chance": {
      1: "Prepare to get soaked",
      2: "Maybe pack a light jacket",
      3: "Dry as a bone",
   },
   "sunset-time": {
      1: "Running in the dark",
      2: "Decent light remaining",
      3: "Perfect golden hour",
   },
   "sunrise-time": {
      1: "Still pitch black",
      2: "Dawn is breaking",
      3: "Beautiful sunrise vibes",
   },
};

export const capitalize = (s: string) => {
   // Hard-coded mapping for all possible keys
   switch (s) {
      case "temperature":
         return "Temperature";
      case "feels-like":
         return "Feels Like";
      case "humidity":
         return "Humidity";
      case "cloudiness":
         return "Cloudiness";
      case "uv-index":
         return "UV Index";
      case "visibility":
         return "Visibility";
      case "wind-speed":
         return "Wind Speed";
      case "rain-chance":
         return "Rain Chance";
      case "sunset-time":
         return "Sunset Time";
      case "sunrise-time":
         return "Sunrise Time";
      case "aqi":
         return "AQI";
      default:
         // Fallback: capitalize first letter of each word
         return s
            .replace(/-/g, " ")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
   }
};

export const calculateRange = (type: string, val: number | string): number => {
   if (type === "temperature" || type === "feels-like") {
      if (typeof val === "number") {
         if (val > 35) return 1; // bad
         if (val >= 28) return 2; // okay
         if (val >= 24) return 3; // good
         return 2; // default okay if less than 24
      }
   }

   if (type === "humidity") {
      if (typeof val === "number") {
         if (val <= 65) return 3; // Rare but excellent conditions
         if (val <= 80) return 2; // Tolerable for Thailand
         return 1; // Above 80% is rough
      }
   }

   if (type === "uv-index") {
      if (typeof val === "number") {
         if (val <= 2) return 3;
         if (val <= 5) return 2;
         return 1;
      }
   }

   if (type === "rain-chance") {
      if (typeof val === "number") {
         if (val < 20) return 3;
         if (val < 50) return 2;
         return 1;
      }
   }

   if (type === "cloudiness") {
      if (typeof val === "number") {
         if (val < 30) return 1;
         if (val < 70) return 2;
         return 3;
      }
   }

   if (type === "visibility") {
      if (typeof val === "number") {
         if (val > 10) return 3;
         if (val > 5) return 2;
         return 1;
      }
   }

   if (type === "wind-speed") {
      if (typeof val === "number") {
         if (val < 10) return 3;
         if (val < 20) return 2;
         return 1;
      }
   }

   if (type === "sunrise-time" || type === "sunset-time") {
      return 3; // always good
   }

   if (type === "aqi") {
      if (typeof val === "number") {
         if (val <= 50) return 3; // Good
         if (val <= 100) return 2; // Moderate
         return 1; // Unhealthy
      }
   }

   return 2;
};

export function getStatusMessage(
   key: keyof typeof runningConditionStatusMessages,
   range: 1 | 2 | 3
): string {
   return runningConditionStatusMessages[key]?.[range] ?? "";
}
