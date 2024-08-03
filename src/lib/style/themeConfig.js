import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  backgroundColor1: "#f5f5f5",
  backgroundColor2: "#f6f6f9",
  backgroundColor3: "#f5f5f5",
  text: "#363537",
  primaryColor: "#e9300b",
  secondaryColor: "#ffb01e",
  activeLinkColor: "#388E3C",
};

export const darkTheme = {
  backgroundColor1: "#202020",
  backgroundColor2: "#303030",
  backgroundColor3: "#252525",
  text: "#fbfbfb",
  primaryColor: "#e9300b",
  secondaryColor: "#ffb01e",
  activeLinkColor: "#388E3C",
};

export const GlobalStyles = createGlobalStyle`
    :root{
        --border-radius-small: 5px;
        --border-radius-large: 10px;

        --dark-grey: #AAAAAA;
        --light-grey: lightgrey;
        --danger: #D32F2F;
        --light-danger: #FECDD3;
        --warning: #FBC02D;
        --light-warning: #FFF2C6;
        --success: #388E3C;
        --light-success: #BBF7D0;

        

    }

    html {
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
        padding: 0;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: ${({ theme }) => theme.backgroundColor1};
        color: ${({ theme }) => theme.text};
        font-family: Helvetica, sans-serif;
        box-sizing: border-box;
    }
    #__next{
        width: 100%;
    }

    p,td,th,span,link,input,button{
        font-family: Helvetica, sans-serif;
        font-weight: 400;
        font-size: 1.125rem;
        margin: 5px;

        @media (max-width: 800px) {
            font-size: 0.75rem;
        }
    }

    h1{
        text-align: center;
        margin: 0;
        padding: 20px;
        color: ${({ theme }) => theme.primaryColor};
        font-family: Tahoma;
        font-weight: 800;
        font-size: 2.5rem;
    }

    h2{
        color: ${({ theme }) => theme.primaryColor};
        font-family: Tahoma;
        font-weight: 600;
        font-size: 2rem;
        margin: 0;
        padding: 10px;
    }

    h3{
        color: ${({ theme }) => theme.primaryColor};
        font-family: Tahoma;
        font-weight: 600;
        font-size: 1.75rem;
        margin: 0;
        padding: 5px;
    }

  


 
 

`;
