import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

//Components
import Dropdown from "@/components/menu/elements/Dropdown";
import StyledSectionComponent from "@/components/menu/elements/StyledSection";
import {
  CharacterWrapper,
  CharacterContainer,
  Columns2,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledXSmallInput,
  StyledSmallInput,
  StyledNormalInput,
  StyledLargeInput,
} from "@/components/StyledComponents";
import DeleteButton from "@/components/menu/elements/DeleteButton";

export default function Show({ charactere, updateCharacter }) {
  const [character, setCharacter] = useState(null);
  const [addXP, setAddXP] = useState(0);
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;
    setCharacter(charactere.find((char) => char.id == slug));
    console.log(slug);
  }, [slug, charactere]);

  function handleAddCharacterXP() {
    const xpToAdd = Number(addXP) || 0;
    const updatedCharacter = {
      ...character,
      personalData: {
        ...character.personalData,
        xpMax: Number(character.personalData.xpMax || 0) + xpToAdd,
      },
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
    setAddXP(0);
  }

  function updateDamage(type, amount) {
    const currentValue = character.combatData?.[type] || 0;
    const maxValue = character.combatData?.[`${type}Max`] || 0;
    const newValue = Math.min(Math.max(0, currentValue + amount), maxValue);

    const updatedCharacter = {
      ...character,
      combatData: {
        ...character.combatData,
        [type]: newValue,
      },
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  function handleInputChangeWeapon(index, field, value) {
    const updatedWeapons =
      character.combatData?.personalWeapons.map((weapon, i) =>
        i === index ? { ...weapon, [field]: value } : weapon
      ) || [];

    const updatedCharacter = {
      ...character,
      combatData: {
        ...character.combatData,
        personalWeapons: updatedWeapons,
      },
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  function handleInputChangeCbills(value) {
    const updatedCharacter = {
      ...character,
      cbills: value,
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  function handleDeleteInventoryItem(index) {
    const updatedInventory = character.inventory.filter((_, i) => i !== index);

    const updatedCharacter = {
      ...character,
      inventory: updatedInventory,
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  function handleInventoryInputChange(index, field, value) {
    const updatedInventory = character.inventory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );

    const updatedCharacter = {
      ...character,
      inventory: updatedInventory,
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  function handleInventoryCheckboxChange(index, field) {
    const updatedInventory = character.inventory.map((item, i) =>
      i === index ? { ...item, [field]: !item[field] } : item
    );

    const updatedCharacter = {
      ...character,
      inventory: updatedInventory,
    };
    setCharacter(updatedCharacter);
    updateCharacter(updatedCharacter); // Update the original array
  }

  if (!character) return <p>Loading...</p>;

  return (
    <>
      <h1>Show</h1>
      <CharacterWrapper>
        <CharacterContainer>
          <Columns2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
              <StyledSectionComponent>
                <div>
                  <h2>PERSONAL DATA</h2>
                  <p>Name:{` ${character.personalData.name}`}</p>
                  <p>Height:{` ${character.personalData.height}`}</p>
                  <p>Hair:{` ${character.personalData.hair}`}</p>
                  <p>Weight:{` ${character.personalData.weight}`}</p>
                  <p>Eyes:{` ${character.personalData.eyes}`}</p>
                  <p>Player:{` ${character.personalData.player}`}</p>
                  <p>Affiliation:{` ${character.personalData.affiliation}`}</p>
                  <p>Extra:{` ${character.personalData.extra}`}</p>
                  <p>
                    XP:{` ${character.personalData.xpUse} / ${character.personalData.xpMax}`}{" "}
                    <StyledSmallInput
                      type="number"
                      value={addXP}
                      onChange={(e) => setAddXP(e.target.value)}
                    />
                    <button onClick={handleAddCharacterXP}>Add XP</button>
                  </p>
                </div>
              </StyledSectionComponent>

              <StyledSectionComponent>
                <h2>ATTRIBUTES</h2>

                <StyledTable>
                  <StyledTableHead>
                    <tr>
                      <th>Attribute</th>
                      <th>Score</th>
                      <th>Link</th>
                      <th>XP</th>
                    </tr>
                  </StyledTableHead>
                  <StyledTableBody>
                    {Object.entries(character.attributes).map(([key, { xp, score, link }]) => {
                      const attribute = key.toUpperCase();
                      return (
                        <tr key={key}>
                          <td>{attribute}</td>
                          <td>{score}</td>
                          <td>{link}</td>
                          <td>{xp}</td>
                        </tr>
                      );
                    })}
                  </StyledTableBody>
                </StyledTable>
              </StyledSectionComponent>
            </div>

            <StyledSectionComponent>
              <h2>COMBAT DATA</h2>
              <div>
                <p>Condition Monitor</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p>
                      Standard Damage: {character.combatData.standardDamage}/
                      {character.combatData.standardDamageMax}
                    </p>
                    <button onClick={() => updateDamage("standardDamage", -1)}>-1</button>
                    <button onClick={() => updateDamage("standardDamage", 1)}>+1</button>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p>
                      Fatigue Damage: {character.combatData.fatigueDamage}/
                      {character.combatData.fatigueDamageMax}
                    </p>
                    <button onClick={() => updateDamage("fatigueDamage", -1)}>-1</button>
                    <button onClick={() => updateDamage("fatigueDamage", 1)}>+1</button>
                  </div>
                </div>
                <p>stun: checkbox, unconscious: checkbox</p>
                <br />
                <p>Movement:</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <p>Walk: {character.combatData.walk} m</p>
                  <p>Run Evade: {character.combatData.runEvade} m</p>
                  <p>Sprint: {character.combatData.sprint} m</p>
                  <p>Climb: {character.combatData.climb} m</p>
                  <p>Crawl: {character.combatData.crawl} m</p>
                  <p>Swim: {character.combatData.swim} m</p>
                </div>
              </div>
              <br />
              <p>Personal Armor</p>
              <StyledTable>
                <StyledTableHead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>BAR (M/B/E/X)</th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  {character.combatData.personalArmors.map((armor, index) => (
                    <tr key={index}>
                      <td>{armor.name}</td>
                      <td>{armor.location}</td>
                      <td>{armor.type}</td>
                      <td>
                        {armor.m} / {armor.b} / {armor.e} / {armor.x}
                      </td>
                    </tr>
                  ))}
                </StyledTableBody>
              </StyledTable>
              <br />
              <p>Weapons</p>
              <StyledTable>
                <StyledTableHead>
                  <tr>
                    <th>Name</th>
                    <th>Skill</th>
                    <th>AP/BD</th>
                    <th>Range</th>
                    <th>Ammo</th>
                    <th>Notes</th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  {character.combatData.personalWeapons.map((weapon, index) => (
                    <tr key={index}>
                      <td>{weapon.name}</td>
                      <td>{weapon.skill}</td>
                      <td>
                        {weapon.ap} / {weapon.bd}
                      </td>
                      <td>
                        {weapon.range1} / {weapon.range2} / {weapon.range3} / {weapon.range4}
                      </td>
                      <td>
                        <StyledSmallInput
                          type="number"
                          value={weapon.ammo}
                          onChange={(e) => handleInputChangeWeapon(index, "ammo", e.target.value)}
                        />
                      </td>
                      <td>{weapon.notes}</td>
                    </tr>
                  ))}
                </StyledTableBody>
              </StyledTable>
            </StyledSectionComponent>
          </Columns2>

          <StyledSectionComponent>
            <h2>TRAITS (PERSONAL)</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Trait</th>
                  <th>TP</th>
                  <th>Page Ref.</th>
                  <th>XP</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {character.traits.map((trait, index) => (
                  <tr key={index}>
                    <td>{trait.name}</td>
                    <td>{trait.tp}</td>
                    <td>{trait.pageRef}</td>
                    <td>{trait.xp}</td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>SKILLS</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Skill</th>
                  <th>Lvl</th>
                  <th>Links</th>
                  <th>TN/C</th>
                  <th>XP</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {character.skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill.name}</td>
                    <td>{skill.level}</td>
                    <td>{skill.link}</td>
                    <td>{skill.tnc}</td>
                    <td>{skill.xp}</td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>BIOGRAPHY</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Life Event</th>
                  <th>Age</th>
                  <th>Other Notes</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {character.biography.map((item, index) => (
                  <tr key={index}>
                    <td>{item.lifeEvent}</td>
                    <td>{item.age}</td>
                    <td>{item.notes}</td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>INVENTORY</h2>
            <p>
              C-Bills:{" "}
              <StyledNormalInput
                type="number"
                value={character.cbills}
                onChange={(e) => handleInputChangeCbills(e.target.value)}
              />
            </p>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Active</th>
                  <th>Equipment</th>
                  <th>Qty</th>
                  <th>Weight (Gram)</th>
                  <th>C-Bills</th>
                  <th>Page</th>
                  <th>Notes</th>
                  <th></th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {character.inventory.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={() => handleInventoryCheckboxChange(index, "active")}
                      />
                    </td>
                    <td>{item.equipment}</td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleInventoryInputChange(index, "qty", e.target.value)}
                      />
                    </td>

                    <td>{item.weight}</td>
                    <td>{item.cBills}</td>
                    <td>{item.page}</td>
                    <td>{item.notes}</td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteInventoryItem(index)}>
                        Delete
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>VEHICLE DATA</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Model/Name</th>
                  <th>Type</th>
                  <th>Mass</th>
                  <th>Traits</th>
                  <th>Notes</th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {character.vehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <td>{vehicle.modelName}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.mass}</td>
                    <td>{vehicle.traits}</td>
                    <td>{vehicle.notes}</td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
          </StyledSectionComponent>
          <br />
          <br />
        </CharacterContainer>
      </CharacterWrapper>
    </>
  );
}
