import Layout from "../components/layout/Layout";
import Dashboard from "../components/dashboard/Dashboard";
import { getSession, signIn } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: {
      meta: {
        title: 'Just use \'em, Dashes!'
      },
      session
    }
  }
}

export default function DashboardRoute(props) {
  if (!props.session) {
    signIn();
    return null;
  }
  return (
    <Layout meta={props.meta}>
      <Dashboard {...props} />
    </Layout>
  );
}
