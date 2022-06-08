import styled from "styled-components";

const Home = () => {
  return (
    <Main>
      <h1>Hello from the Home Page!</h1>
      <h2>Some people don't think it be like it is, but it do.</h2>
      <div>
        <p>What's goin on here, man? I mean, what are you building here, man?</p>
        <p>Some notes for future development...</p>
        <p>The pagination on the <strong>Notes</strong> page isn't quite working right. It filters well enough, but with every new <em>per page</em> selection reloads the page. The second time it just does what it's supposed to do. I know this is due to Apollo caching and the way the useEffect hooks are setup, but I haven't looked into fixing it yet...</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Urna molestie at elementum eu facilisis. Et pharetra pharetra massa massa ultricies mi quis hendrerit. Id consectetur purus ut faucibus pulvinar elementum. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Consequat nisl vel pretium lectus quam id.</p>
        <p>Elementum eu facilisis sed odio morbi. Pretium nibh ipsum consequat nisl vel pretium. Aliquet lectus proin nibh nisl condimentum id venenatis. Neque sodales ut etiam sit. Risus commodo viverra maecenas accumsan lacus. Interdum consectetur libero id faucibus. Eget mauris pharetra et ultrices neque ornare. Turpis cursus in hac habitasse platea dictumst quisque sagittis. Sit amet massa vitae tortor.</p>
        <p>Facilisis leo vel fringilla est ullamcorper. Vel eros donec ac odio tempor. Nec feugiat in fermentum posuere. Non arcu risus quis varius quam quisque id diam. Consectetur adipiscing elit ut aliquam purus sit amet luctus venenatis. Cras sed felis eget velit aliquet sagittis. Tristique risus nec feugiat in. Pulvinar elementum integer enim neque volutpat ac tincidunt vitae semper. Sit amet est placerat in egestas erat imperdiet. Aenean et tortor at risus viverra adipiscing at in tellus.</p>
        <p>Feugiat scelerisque varius morbi... <em>enim</em>.</p>
      </div>
    </Main>
  )
};

export default Home;

const Main = styled.main`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  justify-content: center;
  
  > h1 {
    margin: 0 auto 4px auto;
    font-size: 2.4rem;
    font-weight: 500;
    background: linear-gradient(to right, #4b0082, blue, #1e90ff, green, #005200);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    -webkit-text-fill-color: transparent;
    font-variant: small-caps;
    text-transform: capitalize;
  }

  > h2 {
    color: white;
    margin: 0 auto 12px auto;
    font-size: 1.4rem;
    font-weight: 400;
    text-shadow: 0 0 4px #000;
  }

  > div {
    background-color: #ffffff;
    margin: 10px auto;
    color: #1d1d1d;
    padding: 24px 48px;
    border-radius: 12px;
    border: 1px solid #b6b6b6;
    box-shadow: 6px 6px 12px ${props => props.theme.indigo},
      8px 8px 16px ${props => props.theme.dodgerblue},
      10px 10px 20px ${props => props.theme.darkgreen},
      inset -3px -3px 6px #999;
    width: 800px;

    > p {
      margin: 24px 0;
      font-size: 1rem;
      line-height: 1.3;
      &:first-of-type {
        margin-top: 0;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
`;
