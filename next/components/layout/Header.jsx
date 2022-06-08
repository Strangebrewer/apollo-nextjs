import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import privateRoutes from '../../constants/privateRoutes';
import styled from 'styled-components';
import { useApollo } from '../../apollo-client';

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();
  const { cache } = useApollo();

  const onSignOut = () => {
    const options = {};
    const isPrivateRoute = privateRoutes.includes(router.pathname);
    if (isPrivateRoute) options.callbackUrl = `${window.location.origin}`;
    signOut(options);
  };

  const logCache = () => {
    console.log('cache:::', cache);
  }

  return (
    <Container loading={(!session && loading) ? 'true' : 'false'}>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>

          <li>
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
          </li>

          {/* {session?.user
            ? ( */}
          <li>
            <Link href="/bills">
              <a>Bills</a>
            </Link>
          </li>
          {/* ) : null} */}

          <li>
            <Link href="/canvas">
              <a>Canvas</a>
            </Link>
          </li>

          <li>
            <Link href="/notes">
              <a>Notes</a>
            </Link>
          </li>

          <li>
            <Link href="/images">
              <a>Images</a>
            </Link>
          </li>

          <li>
            <button onClick={logCache}>
              log cache
            </button>
          </li>
        </ul>
      </nav>

      <div>
        <p>
          {!session && <span className='auth-text'>You are not signed in</span>}
          {session?.user && (
            <span className='auth-text'>
              <small>Signed in as &nbsp;&nbsp;</small>
              <strong>{session.user.email ?? session.user.name}</strong>
            </span>
          )}
        </p>

        <a
          href={`/api/auth/${!session ? 'signin' : session?.user ? 'signout' : ''}`}
          className={`button ${!session ? 'button--primary' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            if (!session) signIn()
            if (session?.user) onSignOut()
          }}
        >
          {!session ? 'Sign in' : session?.user ? 'SignOut' : null}
        </a>

      </div>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: space-between;
  background-color: #222;

  > nav,
  > div {
    height: ${props => props.theme.headerHeight};
  }

  > nav {
    display: flex;
    align-items: center;
    padding-left: 12px;

    > ul {
      padding: 0;
      margin: 0;
      list-style: none;

      > li {
        display: inline-block;
        margin-right: 1rem;

        > a {
          color: ${props => props.theme.dodgerblue};
        }
      }
    }
  }

  > div {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    opacity: ${props => props.loading === 'true' ? '0' : '1'};
    padding-right: 12px;

    > p {
      position: relative;
      color: white;
      top: ${props => props.loading === 'true' ? '-2rem' : '0'};
      opacity: ${props => props.loading === 'true' ? '0' : '1'};
      transition: all 0.2s ease-in;

      > .auth-text {
        opacity: ${props => props.loading === 'true' ? '0' : '1'};
        white-space: nowrap;
        text-overflow: ellipsis;
        z-index: 1;
        max-width: 300px;
        display: inline-block;
        margin-right: 12px;
      }
    }

    > .button {
      opacity: ${props => props.loading === 'true' ? '0' : '1'};
      font-weight: 500;
      border-radius: 0.3rem;
      cursor: pointer;
      font-size: 1rem;
      padding: 6px 12px;
      position: relative;
      z-index: 10;
      background-color: ${props => props.theme.purple};
      color: #fff;
      transition: all 0.2s ease-in;
      &:hover {
        box-shadow: inset 0 0 5rem ${props => props.theme.candy};
        color: #000;
      }
    }

    > .button--primary {
      background-color: ${props => props.theme.dodgerblue};
      border-color: ${props => props.theme.dodgerblue};
      color: #fff;
      text-decoration: none;
      &:hover {
        box-shadow: inset 0 0 5rem ${props => props.theme.green};
        color: #000;
      }
    }
  }
`;
