import styled from "styled-components";
import { useRouter } from "next/router";

const CharacterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

function downloadFile(data) {
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

export default function CharacterChoise({
  characterName,
  characterId,
  handleDelete,
  downloadFile,
}) {
  const router = useRouter();
  return (
    <>
      <CharacterWrapper>
        <p>{characterName}</p>
        <button onClick={() => router.push(`/show/${characterId}`)}>Show</button>
        <button onClick={() => downloadFile(characterId)}>Download</button>
        <button onClick={() => handleDelete(characterId)}>Delete</button>
      </CharacterWrapper>
    </>
  );
}
