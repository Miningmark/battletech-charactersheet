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
} from "@/components/StyledComponents";

import { skillList } from "@/lib/skillList";
import { calculateLevel, calculateScore } from "@/lib/calculateValues";

export default function NewCharacter({ addCharacter }) {
  const router = useRouter();
  const [personalData, setPersonalData] = useState({
    name: "",
    height: "",
    hair: "",
    weight: "",
    eyes: "",
    player: "",
    affiliation: "",
    extra: "",
  });
  const [attributes, setAttributes] = useState({
    str: { xp: 0, score: 0 },
    bod: { xp: 0, score: 0 },
    rfl: { xp: 0, score: 0 },
    dex: { xp: 0, score: 0 },
    int: { xp: 0, score: 0 },
    wil: { xp: 0, score: 0 },
    cha: { xp: 0, score: 0 },
    edg: { xp: 0, score: 0 },
  });

  const [combatData, setCombatData] = useState({
    standardDamageMax: "",
    standardDamage: "",
    fatigueDamageMax: "",
    fatigueDamage: "",
    stun: false,
    unconscious: false,
    walk: "",
    runEvade: "",
    sprint: "",
    climb: "",
    crawl: "",
    swim: "",
    personalArmor: [{ armor: "", location: "", armorType: "", bar: "" }],
    weapons: [{ name: "", skill: "", apbd: "", range: "", ammo: "", notes: "" }],
  });
  const [traits, setTraits] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [subskill, setSubskill] = useState("");
  const [biography, setBiography] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [cbills, setCbills] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Ensure skills are properly set up
    const runningSkill = skills.find((skill) => skill.name === "running")?.level || 0;
    const climbingSkill = skills.find((skill) => skill.name === "climbing")?.level || 0;
    const swimmingSkill = skills.find((skill) => skill.name === "swimming")?.level || 0;

    // Calculate values
    const { str, bod, rfl, wil } = attributes;

    const standardDamageMax = bod.score * 3;
    const standardDamage = standardDamageMax;
    const fatigueDamageMax = wil.score * 3;
    const fatigueDamage = fatigueDamageMax;

    const walk = str.score + rfl.score;
    const runEvade = 10 + walk + runningSkill;
    const sprint = runEvade * 2;
    const climb = Math.ceil(walk / 2 + climbingSkill);
    const crawl = Math.ceil(walk / 4);
    const swim = walk + swimmingSkill;

    // Update combatData with calculated values
    setCombatData((prevData) => ({
      ...prevData,
      standardDamageMax,
      standardDamage,
      fatigueDamageMax,
      fatigueDamage,
      walk,
      runEvade,
      sprint,
      climb,
      crawl,
      swim,
    }));
  }, [attributes, skills]);

  function handleChangePersonalData(e) {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleChangeAttributes = (e) => {
    const { name, value } = e.target;
    const attribute = name.replace("XP", "").toLowerCase();

    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: {
        xp: Number(value),
        score: calculateScore(Number(value)),
      },
    }));
  };

  function handleAddTrait() {
    setTraits((prevTraits) => [...prevTraits, { trait: "New Trait", tp: 0, pageRef: "", xp: 0 }]);
  }

  function handleDeleteTrait(index) {
    setTraits((prevTraits) => prevTraits.filter((_, i) => i !== index));
  }

  function handleChangeTrait(index, field, value) {
    const updatedTraits = traits.map((trait, i) =>
      i === index ? { ...trait, [field]: value } : trait
    );
    setTraits(updatedTraits);
  }

  const handleDropdownChange = (skillName) => {
    const skill = skillList.find((s) => s.skill === skillName);
    if (skill) {
      setSelectedSkill(skill);
    }
  };

  const handleAddSkill = () => {
    if (selectedSkill) {
      const newSkillName = subskill ? `${selectedSkill.skill} / ${subskill}` : selectedSkill.skill;
      const newSkill = {
        name: newSkillName,
        xp: 0,
        tnc: selectedSkill.tnc,
        link: selectedSkill.link.join(", "),
        level: calculateLevel(0, selectedSkill.tnc),
      };
      setSkills([...skills, newSkill]);
      setSubskill(""); // Clear the subskill input
    }
  };

  const handleXPChange = (index, value) => {
    const updatedSkills = [...skills];
    updatedSkills[index].xp = value;
    updatedSkills[index].level = calculateLevel(value, updatedSkills[index].tnc);
    setSkills(updatedSkills);
  };

  const handleDeleteSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const updateDamage = (type, amount) => {
    setCombatData((prevData) => {
      const currentValue = prevData[type];
      const maxValue = prevData[`${type}Max`];

      const newValue = Math.min(Math.max(0, currentValue + amount), maxValue);

      return {
        ...prevData,
        [type]: newValue,
      };
    });
  };

  const handleAddLiveEvent = () => {
    setBiography([...biography, { lifeEvent: "", age: "", notes: "" }]);
  };

  const handleDeleteLiveEvent = (index) => {
    setBiography(biography.filter((_, i) => i !== index));
  };

  const handleInputChangeLiveEvent = (index, field, value) => {
    const updatedBiography = biography.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setBiography(updatedBiography);
  };

  const handleAddInventoryItem = () => {
    const newItem = {
      equipment: "New Item",
      qty: 0,
      active: false,
      weight: 0,
      cBills: 0,
      page: "",
      notes: "",
    };
    setInventory([...inventory, newItem]);
  };

  const handleDeleteInventoryItem = (index) => {
    setInventory(inventory.filter((_, i) => i !== index));
  };

  const handleInventoryInputChange = (index, field, value) => {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInventory(updatedInventory);
  };

  const handleInventoryCheckboxChange = (index, field) => {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: !item[field] } : item
    );
    setInventory(updatedInventory);
  };

  const handleAddVehicle = () => {
    const newVehicle = {
      modelName: "New Vehicle",
      type: "",
      mass: 0,
      traits: "",
      notes: "",
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleDeleteVehicle = (index) => {
    setVehicles(vehicles.filter((_, i) => i !== index));
  };

  const handleVehicleInputChange = (index, field, value) => {
    const updatedVehicles = vehicles.map((vehicle, i) =>
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    setVehicles(updatedVehicles);
  };

  function generateId() {
    const timestamp = Date.now();
    return timestamp;
  }

  function handleSubmit() {
    const character = {
      id: generateId(),
      personalData,
      attributes,
      combatData,
      traits,
      skills,
      biography,
      inventory,
      cbills,
      vehicles,
    };
    console.log("Character submitted:", character);

    addCharacter(character);
    router.push("/");
  }

  return (
    <>
      <h1>New Character</h1>
      <CharacterWrapper>
        <CharacterContainer>
          <Columns2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
              <StyledSectionComponent>
                <div>
                  <h2>PERSONAL DATA</h2>
                  <p>
                    Name:{" "}
                    <input
                      type="text"
                      name="name"
                      value={personalData.name}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Height:{" "}
                    <input
                      type="text"
                      name="height"
                      value={personalData.height}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Hair:{" "}
                    <input
                      type="text"
                      name="hair"
                      value={personalData.hair}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Weight:{" "}
                    <input
                      type="text"
                      name="weight"
                      value={personalData.weight}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Eyes:{" "}
                    <input
                      type="text"
                      name="eyes"
                      value={personalData.eyes}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Player:{" "}
                    <input
                      type="text"
                      name="player"
                      value={personalData.player}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Affiliation:{" "}
                    <input
                      type="text"
                      name="affiliation"
                      value={personalData.affiliation}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Extra:{" "}
                    <input
                      type="text"
                      name="extra"
                      value={personalData.extra}
                      onChange={handleChangePersonalData}
                    />
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
                    {Object.entries(attributes).map(([key, { xp, score }]) => {
                      const attribute = key.toUpperCase();
                      return (
                        <tr key={key}>
                          <td>{attribute}</td>
                          <td>{score}</td>
                          <td>-</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              name={`${key}XP`}
                              value={xp}
                              onChange={handleChangeAttributes}
                            />
                          </td>
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
                      Standard Damage: {combatData.standardDamage}/{combatData.standardDamageMax}
                    </p>
                    <button onClick={() => updateDamage("standardDamage", -1)}>-1</button>
                    <button onClick={() => updateDamage("standardDamage", 1)}>+1</button>
                  </div>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p>
                      Fatigue Damage: {combatData.fatigueDamage}/{combatData.fatigueDamageMax}
                    </p>
                    <button onClick={() => updateDamage("fatigueDamage", -1)}>-1</button>
                    <button onClick={() => updateDamage("fatigueDamage", 1)}>+1</button>
                  </div>
                </div>
                <br />
                <p>Movement:</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                  <p>Walk: {combatData.walk} m</p>
                  <p>Run Evade: {combatData.runEvade} m</p>
                  <p>Sprint: {combatData.sprint} m</p>
                  <p>Climb: {combatData.climb} m</p>
                  <p>Crawl: {combatData.crawl} m</p>
                  <p>Swim: {combatData.swim} m</p>
                </div>
              </div>
              <br />

              <StyledTable>
                <StyledTableHead>
                  <tr>
                    <th>Perso. Armor</th>
                    <th>Location</th>
                    <th>Armor Type</th>
                    <th>BAR (M/B/E/X)</th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </StyledTableBody>
              </StyledTable>
              <br />
              <p>Weapons</p>
              <StyledTable>
                <StyledTableHead>
                  <tr>
                    <th></th>
                    <th>Skill</th>
                    <th>AP/BD</th>
                    <th>Range</th>
                    <th>Ammo</th>
                    <th>Notes</th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  <tr>
                    <td>Martial Arts</td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>Melee</td>
                    <td>N/A</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
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
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {traits.map((trait, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={trait.trait}
                        onChange={(e) => handleChangeTrait(index, "trait", e.target.value)}
                      />
                    </td>
                    <td>{calculateScore(trait.xp)}</td>
                    <td>
                      <input
                        type="text"
                        value={trait.pageRef}
                        onChange={(e) => handleChangeTrait(index, "pageRef", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={trait.xp}
                        onChange={(e) => handleChangeTrait(index, "xp", Number(e.target.value))}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteTrait(index)}>Delete Trait</button>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <button onClick={handleAddTrait}>Add Trait</button>
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
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill.name}</td>
                    <td>{skill.level}</td>
                    <td>{skill.link}</td>
                    <td>{skill.tnc}</td>
                    <td>
                      <input
                        type="number"
                        value={skill.xp}
                        onChange={(e) => handleXPChange(index, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteSkill(index)}>Delete Skill</button>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <div>
              <Dropdown
                options={skillList.map((skill) => skill.skill)}
                onChange={handleDropdownChange}
              />
              {" / "}
              <input
                type="text"
                placeholder="Subskill"
                value={subskill}
                onChange={(e) => setSubskill(e.target.value)}
              />
              <button onClick={handleAddSkill}>Add Skill</button>
            </div>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>BIOGRAPHY</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Life Event</th>
                  <th>Age</th>
                  <th>Other Notes</th>
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {biography.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={item.lifeEvent}
                        onChange={(e) =>
                          handleInputChangeLiveEvent(index, "lifeEvent", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.age}
                        onChange={(e) => handleInputChangeLiveEvent(index, "age", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleInputChangeLiveEvent(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteLiveEvent(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <button onClick={handleAddLiveEvent}>Add Life Event</button>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>INVENTORY</h2>
            <p>C-Bills: {cbills}</p>
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
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {inventory.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={item.active}
                        onChange={() => handleInventoryCheckboxChange(index, "active")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.equipment}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "equipment", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleInventoryInputChange(index, "qty", e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={item.weight}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "weight", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.cBills}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "cBills", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.page}
                        onChange={(e) => handleInventoryInputChange(index, "page", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleInventoryInputChange(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteInventoryItem(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <button onClick={handleAddInventoryItem}>Add Item</button>
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
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {vehicles.map((vehicle, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={vehicle.modelName}
                        onChange={(e) =>
                          handleVehicleInputChange(index, "modelName", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={vehicle.type}
                        onChange={(e) => handleVehicleInputChange(index, "type", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={vehicle.mass}
                        onChange={(e) => handleVehicleInputChange(index, "mass", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={vehicle.traits}
                        onChange={(e) => handleVehicleInputChange(index, "traits", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={vehicle.notes}
                        onChange={(e) => handleVehicleInputChange(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteVehicle(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <button onClick={handleAddVehicle}>Add Vehicle</button>
          </StyledSectionComponent>
          <br />
          <button onClick={handleSubmit}>Submit Character</button>
        </CharacterContainer>
      </CharacterWrapper>
      <br />
    </>
  );
}
