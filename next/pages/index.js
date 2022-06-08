import Layout from "../components/layout/Layout";
import Home from "../components/home/Home";

// export function getServerSideProps(context) {
//   return { props: { meta: { title: 'Homie the Clown' } } }
// }

export default function HomeRoute(props) {
  return (
    <Layout meta={{ title: "Homie the Clownshoes"}}>
      <Home {...props} />
    </Layout>
  );
}
