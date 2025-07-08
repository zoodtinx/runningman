import { mapWeatherToRunConditionsWithFuture } from "../../app/lib/run-conditions/update-conditions";

describe("mapWeatherToRunConditionsWithFuture", () => {
   const currentData = {
      values: {
         temperature: 20,
         temperatureApparent: 18,
         humidity: 50,
         cloudCover: 40,
         uvIndex: 3,
         visibility: 8,
         windSpeed: 3, // m/s
         precipitationProbability: 10,
         sunsetTime: "18:30",
         sunriseTime: "06:00",
      },
   };

   const futureData = {
      values: {
         temperature: 22,
         temperatureApparent: 19,
         humidity: 45,
         cloudCover: 35,
         uvIndex: 4,
         visibility: 9,
         windSpeed: 4, // m/s
         precipitationProbability: 15,
         sunsetTime: "18:45",
         sunriseTime: "06:05",
      },
   };

   it("returns array of run condition DTOs with correct fields", () => {
      const result = mapWeatherToRunConditionsWithFuture({
         currentData,
         futureData,
         locationName: "Bangkok",
      });

      console.log(result);
      console.log(result.length);

      const windSpeed = result.find((c) => c.type === "wind-speed");
      if (!windSpeed) throw new Error("Missing wind-speed condition");
      expect(windSpeed.value).toBe((3 * 3.6).toFixed(1));
      expect(windSpeed.futureValue).toBe((4 * 3.6).toFixed(1));

      const temperature = result.find((c) => c.type === "temperature");
      if (!temperature) throw new Error("Missing temperature condition");
      expect(temperature.value).toBe("20");
      expect(temperature.futureValue).toBe("22");
      expect(temperature.range).toBe(2);

      const sunset = result.find((c) => c.type === "sunset-time");
      if (!sunset) throw new Error("Missing sunset-time condition");
      expect(sunset.value).toBe("18:30");
      expect(sunset.futureValue).toBe("18:45");
   });
});
