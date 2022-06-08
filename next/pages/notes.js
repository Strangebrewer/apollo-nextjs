import Layout from "../components/layout/Layout";
import Notes from "../components/notes/Notes";
import { getSession, signIn } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: {
      meta: {
        title: 'Notes and Stuff'
      },
      session
    }
  }
}

export default function NotesRoute(props) {
  if (!props.session) {
    signIn();
    return null;
  }
  return (
    <Layout meta={props.meta}>
      <Notes {...props} />
    </Layout>
  );
}
