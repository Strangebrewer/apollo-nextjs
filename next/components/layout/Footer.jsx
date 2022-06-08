import styled from "styled-components";
import Link from "next/link";
import packageJSON from "../../package.json"

export default function Footer() {
  return (
    <Container>
      <ul>
        <li>
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li>
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li>
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li>
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li>
          <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.theme.footerHeight};

  > ul {
    padding: 0;
    list-style: none;

    > li {
      display: inline-block;
      margin-right: 1rem;
    }
  }
`;