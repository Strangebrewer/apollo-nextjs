import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p,
  blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em,
  img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u,
  i, center, dl, dt, dd, fieldset, form, label, legend, table,
  caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details,
  embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby,
  section, summary, time, mark, audio, video, ul, ol {
    border: 0;
    font: inherit;
    font-size: 100%;
    margin: 0;
    padding: 0;
    vertical-align: baseline;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  html {
    box-sizing: border-box;
    background: ${props => props.theme.bg};
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    border: 0;
    color: ${props => props.theme.text};
    font-family: Roboto, Helvetica, sans-serif;
    font-weight: 300;
    line-height: 1;
    margin: 0;
    padding: 0;
  }
  li {
    margin: 6px 0;
  }
  body::-webkit-scrollbar {
    display: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after, q:before, q:after {
    content: '';
    content: none;
  }
  code {
    font-family: monospace;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  strong {
    font-weight: bold;
  }
  em {
    font-style: italic;
  }
  a {
    color: ${props => props.theme.blue};
    text-decoration: none;
  }
  u {
    text-decoration: underline;
  }
`;