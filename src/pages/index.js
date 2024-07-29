export default function Home({ charactere }) {
  return (
    <>
      <h1>Titel</h1>
      <div>
        <button>New Character</button>
        {charactere.length > 0 && charactere.map((char) => <div key={char.id}>{char.name}</div>)}
      </div>
    </>
  );
}
