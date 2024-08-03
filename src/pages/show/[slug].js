import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Show({ charactere }) {
  const [character, setCharacter] = useState(null);
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  useEffect(() => {
    if (!slug) return;
    setCharacter(charactere.find((char) => char.id == slug));
    console.log(slug);
  }, []);

  console.log(character);
  return (
    <>
      <h1>Show</h1>
    </>
  );
}
