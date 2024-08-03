import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Components
import {
  CharacterWrapper,
  CharacterContainer,
  Columns2,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
} from "@/components/StyledComponents";
import Link from "next/link";

export default function Home({ charactere }) {
  const router = useRouter();
  return (
    <>
      <CharacterWrapper>
        <CharacterContainer>
          <h1>Titel</h1>
          <div>
            <button onClick={() => router.push("/newCharacter")}>New Character</button>
            <br />
            {!charactere?.length ? (
              <p>No characters</p>
            ) : (
              charactere.map((char) => (
                <Link href={`/show/${char.id}`} key={char.id}>
                  {char.personalData.name}
                </Link>
              ))
            )}
          </div>
        </CharacterContainer>
      </CharacterWrapper>
    </>
  );
}
