import { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import Head from "next/head";
import useLocalStorageState from "use-local-storage-state";

//Components
import { lightTheme, darkTheme, GlobalStyles } from "@/lib/style/themeConfig";
import PageHeader from "@/components/menu/PageHeader";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useLocalStorageState("theme-preference", {
    defaultValue: "dark",
  });
  const [charactere, setCharactere] = useLocalStorageState("charactere", {
    defaultValue: [],
  });

  useEffect(() => {
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme((prevTheme) => prevTheme || (systemPrefersDark ? "dark" : "light"));

    const handleSystemThemeChange = (event) => {
      const newTheme = event.matches ? "dark" : "light";
      setTheme(newTheme);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", handleSystemThemeChange);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", handleSystemThemeChange);
    };
  }, [setTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  function addCharacter(character) {
    setCharactere((prevCharactere) => [...prevCharactere, character]);
  }

  return (
    <>
      <Head>
        <title>Battletech Characters</title>
        <meta name="description" content="Battletech Character Sheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <GlobalStyles />
        <PageHeader toggleTheme={toggleTheme} theme={theme} />
        <main>
          <Component {...pageProps} charactere={charactere} addCharacter={addCharacter} />
        </main>
      </ThemeProvider>
    </>
  );
}
