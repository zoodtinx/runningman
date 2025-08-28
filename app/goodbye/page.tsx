"use client";

export default function GoodbyePage() {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
         <h1 className="text-3xl font-bold mb-4">Goodbye!</h1>
         <p className="text-lg text-gray-700 mb-6">
            Your account is being deleted.
            <br />
            We&apos;re sorry to see you go.
         </p>
         <p className="text-gray-500">
            If this was a mistake, you can always create a new account later.
            <br />
            Thank you for being with us.
         </p>
      </div>
   );
}
