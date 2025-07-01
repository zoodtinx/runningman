import NewRunBar from "@/components/run-page/NewRunBar";
import RunBar from "@/components/run-page/RunBar";

const RunsPage = () => {
   const runsData = [
      {
         id: "1a2b3c4d-1111-2222-3333-abcdefabcdef",
         title: "Morning Run",
         distance: 5.2,
         duration: 1800,
         laps: 2,
         location: "Lumphini Park",
         runType: "Easy",
         mood: "Good",
         gear: "Nike Pegasus",
         note: "Felt fresh",
         routeId: "route-1",
         dateTime: "2025-07-01T06:30:00.000Z",
         userId: "user-123",
      },
      {
         id: "1a2b3c4d-4444-5555-6666-fedcbafedcba",
         title: "Evening Tempo",
         distance: 8.0,
         duration: 2400,
         laps: 3,
         location: "Benjakitti Park",
         runType: "Tempo",
         mood: "Energetic",
         gear: "Adidas Adios Pro",
         note: "Fast pace, good weather",
         routeId: "route-2",
         dateTime: "2025-07-02T17:45:00.000Z",
         userId: "user-123",
      },
      {
         id: "1a2b3c4d-7777-8888-9999-abcabcabcabc",
         title: "Recovery Jog",
         distance: 3.5,
         duration: 1500,
         laps: 1,
         location: "Local Track",
         runType: "Recovery",
         mood: "Tired",
         gear: "Asics Nimbus",
         note: "Legs heavy from tempo",
         routeId: null,
         dateTime: "2025-07-03T06:00:00.000Z",
         userId: "user-123",
      },
   ];

   const runBars = runsData.map((run) => <RunBar runData={run} key={run.id} />);

   return (
      <div className="px-[12px] flex flex-col gap-[6px] justify-between">
         <NewRunBar />
         {runBars}
         {runBars}
      </div>
   );
};

export default RunsPage;
