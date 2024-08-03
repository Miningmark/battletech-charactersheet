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
import CharacterChoise from "@/components/menu/elements/CharacterChoise";

export default function Home({ charactere, handleDelete, addCharacter }) {
  const router = useRouter();

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          addCharacter(json);
        } catch (error) {
          console.error("Fehler beim Parsen der JSON-Datei:", error);
        }
      };
      reader.readAsText(file);
    }
  }

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
                <CharacterChoise character={char} key={char.id} handleDelete={handleDelete} />
              ))
            )}
          </div>
          <input type="file" onChange={handleFileChange} />
        </CharacterContainer>
      </CharacterWrapper>
    </>
  );
}
