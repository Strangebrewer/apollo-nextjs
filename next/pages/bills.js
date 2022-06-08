import { getSession, signIn, useSession } from "next-auth/react";
import Layout from "../components/layout/Layout";
import Bills from "../components/bills/Bills";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: {
      meta: {
        title: 'Rhymin\' & & Stealin\''
      },
      session
    }
  }
}

export default function BillsRoute(props) {
  if (!props.session) {
    signIn();
    return null;
  }
  return (
    <Layout meta={props.meta}>
      <Bills {...props} />
    </Layout>
  );
}