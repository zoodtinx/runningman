export const mockSchedule = Array.from({ length: 7 }).map((_, i) => ({
   dayOfWeek: i, // 0 = Sunday, 6 = Saturday
   routeId: null,
}));

export default mockSchedule;
