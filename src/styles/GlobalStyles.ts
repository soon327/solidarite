import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    a{
      text-decoration:none;
      color:inherit;
    }
    *{
      box-sizing:border-box;
      margin: 0;
      padding:0;
    }

    html{
      font-size: 14px; 
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
    }
    p{
      line-height: 21px;

    }
    
`;

export default GlobalStyles;
