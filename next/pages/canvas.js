import Layout from "../components/layout/Layout";
import Canvas from "../components/canvas/Canvas";
import { getSession, signIn } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: {
      meta: {
        title: 'Memes and Stuff'
      },
      session
    }
  }
}

export default function CanvasRoute(props) {
  if (!props.session) {
    signIn();
    return null;
  }
  return (
    <Layout meta={props.meta}>
      <Canvas {...props} />
    </Layout>
  );
}
