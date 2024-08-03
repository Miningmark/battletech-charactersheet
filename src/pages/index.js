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

  function downloadFile(characterID) {
    const data = charactere.find((char) => char.id === characterID);
    const blob = new Blob([JSON.stringify(data)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Battletech Character ${data.personalData.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
                <CharacterChoise
                  characterName={char.personalData.name}
                  characterId={char.id}
                  key={char.id}
                  handleDelete={handleDelete}
                  downloadFile={downloadFile}
                />
              ))
            )}
          </div>
          <input type="file" onChange={handleFileChange} />
        </CharacterContainer>
      </CharacterWrapper>
    </>
  );
}
