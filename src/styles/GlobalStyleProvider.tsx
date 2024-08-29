import { ThemeProvider } from "styled-components";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    html {
      position: relative;
    }
    body {
      
    }
    *{
      color : #1f1f1f;
      font-size: 16px;
      box-sizing: border-box;   
      user-select: none;
      -webkit-touch-callout: none;
      &::-webkit-scrollbar {
        display: none;
      } 
      ::selection {
        background: none;
      }
      ::-moz-selection {
        background: none;
      }
      -webkit-tap-highlight-color:transparent;
     }
    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      padding : 0;
      outline: none;
      -webkit-tap-highlight-color : rgba(0,0,0,0);
    }
    input,input[type="text"],input[type="password"],input[type="submit"],input[type="search"],input[type="tel"],input[type="email"],input[type="button"],input[type="reset"] {
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      border-radius: 0;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      outline: 0;
      border: none;
      &::placeholder {
        color: #999999;
      }
    }
    input,button:focus{
	    outline:none;
  
    }
`;

type MyComponentProps = {
  children: JSX.Element;
};

const GlobalStyleProvider = ({ children }: MyComponentProps) => {
  return (
    <ThemeProvider theme={{}}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
};

export default GlobalStyleProvider;
