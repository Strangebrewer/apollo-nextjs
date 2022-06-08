import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import axios from "axios";

export default NextAuth({
  providers: [
    Credentials({
      id: 'login-credentials',
      name: 'Email and Password',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      authorize: async (credentials) => {
        let user = null;
        let token = null;
      
        if (credentials) {
          const { email, password } = credentials;      
          const graphqlQuery = {
            "operationName": "login",
            "query": `mutation login($email: String!, $password: String!) {
              login(email: $email, password: $password) {
                user {
                  _id
                  email
                }
                token
              }
            }`,
            "variables": { email, password }
          };
      
          const res = await axios({
            url: 'http://localhost:4000/graphql',
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: graphqlQuery
          });
      
          user = res?.data?.data?.login?.user;
          token = res?.data?.data?.login?.token;
      
          if (user && token) user.token = token;
        }
      
        return Promise.resolve(user);
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAte: 24 * 60 * 60
  },
  jwt: {
    maxAge: 60 * 60 * 34 * 30
  },
  theme: {
    colorScheme: 'light'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    }
  },
})