import Layout from "../components/layout/Layout";
import Images from "../components/images/Images";
import { getSession, signIn } from "next-auth/react";

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  return {
    props: {
      meta: {
        title: 'Images, I see'
      },
      session
    }
  }
}

export default function ImagesRoute(props) {
  if (!props.session) {
    signIn();
    return null;
  }
  return (
    <Layout meta={props.meta}>
      <Images {...props} />
    </Layout>
  );
}
