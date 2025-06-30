import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
   providers: [Google],
   pages: {
      signIn: "/login",
   },
   callbacks: {
      async redirect({ url, baseUrl }) {
         console.log("url", url);
         // Redirect to dashboard if sign-in came from login page
         if (url && url.includes("/login")) {
            return `${baseUrl}/dashboard`;
         }
         return url.startsWith(baseUrl) ? url : baseUrl;
      },
   },
});
