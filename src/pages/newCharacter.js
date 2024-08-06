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

import { skillList } from "@/lib/skillList";
import { calculateLevel, calculateScore, calculateLink } from "@/lib/calculateValues";
import DeleteButton from "@/components/menu/elements/DeleteButton";
import { weaponSkillList } from "@/lib/weaponSkillList";
import { traitList } from "@/lib/traitList";
import DropdownWeaponSkill from "@/components/menu/elements/DropdownWeaponSkill";

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
    xpUse: 0,
    xpMax: 0,
  });
  const [attributes, setAttributes] = useState({
    str: { xp: 0, score: 0, link: -4 },
    bod: { xp: 0, score: 0, link: -4 },
    rfl: { xp: 0, score: 0, link: -4 },
    dex: { xp: 0, score: 0, link: -4 },
    int: { xp: 0, score: 0, link: -4 },
    wil: { xp: 0, score: 0, link: -4 },
    cha: { xp: 0, score: 0, link: -4 },
    edg: { xp: 0, score: 0, link: -4 },
  });

  const [combatData, setCombatData] = useState({
    standardDamageMax: 0,
    standardDamage: 0,
    fatigueDamageMax: 0,
    fatigueDamage: 0,
    stun: false,
    unconscious: false,
    walk: 0,
    runEvade: 0,
    sprint: 0,
    climb: 0,
    crawl: 0,
    swim: 0,
    personalArmors: [{ name: "", location: "", type: "", m: 0, b: 0, e: 0, x: 0 }],
    personalWeapons: [
      {
        name: "Martial Arts",
        skill: "Martial Arts",
        ap: "",
        bd: "",
        range1: 0,
        range2: 0,
        range3: 0,
        range4: 0,
        ammo: 0,
        notes: "Range Melee",
      },
    ],
  });
  const [traits, setTraits] = useState([]);
  const [selectedTrait, setSelectedTrait] = useState(null);
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [subskill, setSubskill] = useState("");
  const [biography, setBiography] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [cbills, setCbills] = useState(0);
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Ensure skills are properly set up
    const runningSkill = skills.find((skill) => skill.name === "Running")?.level || 0;
    const climbingSkill = skills.find((skill) => skill.name === "Climbing")?.level || 0;
    const swimmingSkill = skills.find((skill) => skill.name === "Swimming")?.level || 0;

    // Calculate values
    const { str, bod, rfl, wil } = attributes;

    const standardDamageMax = bod.score * 2;
    const standardDamage = standardDamageMax;
    const fatigueDamageMax = wil.score * 2;
    const fatigueDamage = fatigueDamageMax;

    const walk = str.score + rfl.score;
    const runEvade = 10 + walk + runningSkill;
    const sprint = runEvade * 2;
    const climb = Math.ceil(walk / 2) + climbingSkill;
    const crawl = Math.ceil(walk / 4);
    const swim = swimmingSkill ? walk + swimmingSkill : Math.floor(walk / 2);

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

  function handleChangeAttributes(e) {
    const { name, value } = e.target;
    const attribute = name.replace("XP", "").toLowerCase();

    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: {
        xp: Number(value),
        score: calculateScore(Number(value)),
        link: calculateLink(Number(value)),
      },
    }));
  }

  function handleDropdownTrait(traitName) {
    const trait = traitList.find((t) => t.trait === traitName);
    if (trait) {
      setSelectedTrait(trait);
    }
  }

  function handleAddTrait() {
    if (selectedTrait) {
      const newTrait = {
        name: selectedTrait.trait,
        xp: 0,
        tp: 0,
        page: selectedTrait.page,
      };
      setTraits((prevTraits) => [...prevTraits, newTrait]);
    }
  }

  function handleDeleteTrait(index) {
    setTraits((prevTraits) => prevTraits.filter((_, i) => i !== index));
  }

  function handleChangeTrait(index, field, value) {
    let updatedTraits = traits.map((trait, i) =>
      i === index ? { ...trait, [field]: value } : trait
    );
    if (field === "xp") {
      updatedTraits[index].tp = calculateScore(value);
    }
    setTraits(updatedTraits);
  }

  function handleDropdownSkill(skillName) {
    const skill = skillList.find((s) => s.skill === skillName);
    if (skill) {
      setSelectedSkill(skill);
    }
  }

  function handleAddSkill() {
    if (selectedSkill) {
      const newSkillName = subskill ? `${selectedSkill.skill} / ${subskill}` : selectedSkill.skill;
      const newSkill = {
        name: newSkillName,
        xp: 0,
        tnc: selectedSkill.tnc,
        link: selectedSkill.link,
        level: calculateLevel(0, selectedSkill.tnc),
        page: selectedSkill.page,
      };
      setSkills([...skills, newSkill]);
      setSubskill("");
    }
  }

  function handleXPChange(index, value) {
    const updatedSkills = [...skills];
    updatedSkills[index].xp = value;
    updatedSkills[index].level = calculateLevel(value, updatedSkills[index].tnc);
    setSkills(updatedSkills);
  }

  function handleDeleteSkill(index) {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  }

  function updateDamage(type, amount) {
    setCombatData((prevData) => {
      const currentValue = prevData[type];
      const maxValue = prevData[`${type}Max`];

      const newValue = Math.min(Math.max(0, currentValue + amount), maxValue);

      return {
        ...prevData,
        [type]: newValue,
      };
    });
  }

  function handleAddLiveEvent() {
    setBiography([...biography, { lifeEvent: "", age: "", notes: "" }]);
  }

  function handleDeleteLiveEvent(index) {
    setBiography(biography.filter((_, i) => i !== index));
  }

  function handleInputChangeLiveEvent(index, field, value) {
    const updatedBiography = biography.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setBiography(updatedBiography);
  }

  function handleAddInventoryItem() {
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
  }

  function handleDeleteInventoryItem(index) {
    setInventory(inventory.filter((_, i) => i !== index));
  }

  function handleInventoryInputChange(index, field, value) {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setInventory(updatedInventory);
  }

  function handleInventoryCheckboxChange(index, field) {
    const updatedInventory = inventory.map((item, i) =>
      i === index ? { ...item, [field]: !item[field] } : item
    );
    setInventory(updatedInventory);
  }

  function handleAddVehicle() {
    const newVehicle = {
      modelName: "New Vehicle",
      type: "",
      mass: 0,
      traits: "",
      notes: "",
    };
    setVehicles([...vehicles, newVehicle]);
  }

  function handleDeleteVehicle(index) {
    setVehicles(vehicles.filter((_, i) => i !== index));
  }

  function handleVehicleInputChange(index, field, value) {
    const updatedVehicles = vehicles.map((vehicle, i) =>
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    setVehicles(updatedVehicles);
  }

  function handleInputChangeCbills(value) {
    setCbills(value);
  }

  function handleInputChangeArmor(index, field, value) {
    const updatedArmor = [...combatData.personalArmors];
    updatedArmor[index] = { ...updatedArmor[index], [field]: value };
    setCombatData({ ...combatData, personalArmors: updatedArmor });
  }

  function addNewArmor() {
    setCombatData({
      ...combatData,
      personalArmors: [
        ...combatData.personalArmors,
        { name: "", location: "", type: "", m: "", b: "", e: "", x: "" },
      ],
    });
  }

  function deleteArmor(index) {
    const updatedArmors = combatData.personalArmors.filter((_, i) => i !== index);
    setCombatData({ ...combatData, personalArmors: updatedArmors });
  }

  function handleInputChangeWeapon(index, field, value) {
    const updatedWeapon = [...combatData.personalWeapons];
    updatedWeapon[index] = { ...updatedWeapon[index], [field]: value };
    setCombatData({ ...combatData, personalWeapons: updatedWeapon });
  }

  function addNewWeapon() {
    setCombatData({
      ...combatData,
      personalWeapons: [
        ...combatData.personalWeapons,
        {
          name: "",
          skill: "",
          ap: "",
          bd: "",
          range1: "",
          range2: "",
          range3: "",
          range4: "",
          ammo: "",
          notes: "",
        },
      ],
    });
  }

  function deleteWeapon(index) {
    const updatedWeapon = combatData.personalWeapons.filter((_, i) => i !== index);
    setCombatData({ ...combatData, personalWeapons: updatedWeapon });
  }

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

  function calculateLinkMod(links) {
    // Links ist jetzt ein Array von Attributnamen in Uppercase
    return links.reduce((total, link) => {
      const attribute = attributes[link];
      return total + (attribute ? attribute.link : 0);
    }, 0);
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
                    <StyledLargeInput
                      type="text"
                      name="name"
                      value={personalData.name}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Height:{" "}
                    <StyledLargeInput
                      type="text"
                      name="height"
                      value={personalData.height}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Hair:{" "}
                    <StyledLargeInput
                      type="text"
                      name="hair"
                      value={personalData.hair}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Weight:{" "}
                    <StyledLargeInput
                      type="text"
                      name="weight"
                      value={personalData.weight}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Eyes:{" "}
                    <StyledLargeInput
                      type="text"
                      name="eyes"
                      value={personalData.eyes}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Player:{" "}
                    <StyledLargeInput
                      type="text"
                      name="player"
                      value={personalData.player}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Affiliation:{" "}
                    <StyledLargeInput
                      type="text"
                      name="affiliation"
                      value={personalData.affiliation}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    Extra:{" "}
                    <StyledLargeInput
                      type="text"
                      name="extra"
                      value={personalData.extra}
                      onChange={handleChangePersonalData}
                    />
                  </p>
                  <p>
                    XP:{" "}
                    <StyledSmallInput
                      type="number"
                      name="xpUse"
                      value={personalData.xpUse}
                      onChange={handleChangePersonalData}
                    />
                    {" /"}
                    <StyledSmallInput
                      type="number"
                      name="xpMax"
                      value={personalData.xpMax}
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
                    {Object.entries(attributes).map(([key, { xp, score, link }]) => {
                      const attribute = key.toUpperCase();
                      return (
                        <tr key={key}>
                          <td>{attribute}</td>
                          <td>{score}</td>
                          <td>{link}</td>
                          <td>
                            <StyledSmallInput
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
                <p>stun: checkbox, unconscious: checkbox</p>
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
              <p>Personal Armor</p>
              <StyledTable>
                <StyledTableHead>
                  <tr>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>BAR (M/B/E/X)</th>
                    <th></th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  {combatData.personalArmors.map((armor, index) => (
                    <tr key={index}>
                      <td>
                        <StyledNormalInput
                          type="text"
                          value={armor.name}
                          onChange={(e) => handleInputChangeArmor(index, "name", e.target.value)}
                        />
                      </td>
                      <td>
                        <StyledSmallInput
                          type="text"
                          value={armor.location}
                          onChange={(e) =>
                            handleInputChangeArmor(index, "location", e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <StyledNormalInput
                          type="text"
                          value={armor.type}
                          onChange={(e) => handleInputChangeArmor(index, "type", e.target.value)}
                        />
                      </td>
                      <td>
                        <StyledXSmallInput
                          type="text"
                          value={armor.m}
                          onChange={(e) => handleInputChangeArmor(index, "m", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={armor.b}
                          onChange={(e) => handleInputChangeArmor(index, "b", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={armor.e}
                          onChange={(e) => handleInputChangeArmor(index, "e", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={armor.x}
                          onChange={(e) => handleInputChangeArmor(index, "x", e.target.value)}
                        />
                      </td>
                      <td>
                        <DeleteButton onClick={() => deleteArmor(index)} />
                      </td>
                    </tr>
                  ))}
                </StyledTableBody>
              </StyledTable>
              <button onClick={addNewArmor}>Add New Armor</button>
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
                    <th></th>
                  </tr>
                </StyledTableHead>
                <StyledTableBody>
                  {combatData.personalWeapons.map((weapon, index) => (
                    <tr key={index}>
                      <td>
                        <StyledNormalInput
                          type="text"
                          value={weapon.name}
                          onChange={(e) => handleInputChangeWeapon(index, "name", e.target.value)}
                        />
                      </td>
                      <td style={{ overflow: "visible" }}>
                        <DropdownWeaponSkill
                          options={weaponSkillList.map((skill) => skill.skill)}
                          onChange={handleInputChangeWeapon}
                          index={index}
                          value={weapon.skill}
                        />
                      </td>
                      <td>
                        <StyledXSmallInput
                          type="text"
                          value={weapon.ap}
                          onChange={(e) => handleInputChangeWeapon(index, "ap", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={weapon.bd}
                          onChange={(e) => handleInputChangeWeapon(index, "bd", e.target.value)}
                        />
                      </td>
                      <td>
                        <StyledXSmallInput
                          type="text"
                          value={weapon.range1}
                          onChange={(e) => handleInputChangeWeapon(index, "range1", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={weapon.range2}
                          onChange={(e) => handleInputChangeWeapon(index, "range2", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={weapon.range3}
                          onChange={(e) => handleInputChangeWeapon(index, "range3", e.target.value)}
                        />
                        <StyledXSmallInput
                          type="text"
                          value={weapon.range4}
                          onChange={(e) => handleInputChangeWeapon(index, "range4", e.target.value)}
                        />
                      </td>
                      <td>
                        <StyledXSmallInput
                          type="number"
                          value={weapon.ammo}
                          onChange={(e) => handleInputChangeWeapon(index, "ammo", e.target.value)}
                        />
                      </td>
                      <td>
                        <StyledNormalInput
                          type="text"
                          value={weapon.notes}
                          onChange={(e) => handleInputChangeWeapon(index, "notes", e.target.value)}
                        />
                      </td>
                      <td>
                        <DeleteButton onClick={() => deleteWeapon(index)} />
                      </td>
                    </tr>
                  ))}
                </StyledTableBody>
              </StyledTable>
              <button onClick={addNewWeapon}>Add New Weapon</button>
            </StyledSectionComponent>
          </Columns2>

          <StyledSectionComponent>
            <h2>TRAITS (PERSONAL)</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Trait</th>
                  <th>TP</th>
                  <th>XP</th>
                  <th>Page</th>
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {traits.map((trait, index) => (
                  <tr key={index}>
                    <td>{trait.name}</td>
                    <td>{trait.tp}</td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={trait.xp}
                        onChange={(e) => handleChangeTrait(index, "xp", Number(e.target.value))}
                      />
                    </td>
                    <td>{trait.page}</td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteTrait(index)}>
                        Delete Trait
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <br />
            <div style={{ height: "50px", display: "flex", gap: "5px", alignItems: "center" }}>
              <Dropdown
                options={traitList.map((trait) => trait.trait)}
                onChange={handleDropdownTrait}
                defaultOption="Select a trait"
              />
              <button onClick={handleAddTrait}>Add Trait</button>
            </div>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>SKILLS</h2>
            <StyledTable>
              <StyledTableHead>
                <tr>
                  <th>Skill</th>
                  <th>Lvl</th>
                  <th>Link Attri.</th>
                  <th>Link Mod</th>
                  <th>TN/C</th>
                  <th>XP</th>
                  <th>Page</th>
                  <th> </th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {skills.map((skill, index) => (
                  <tr key={index}>
                    <td>{skill.name}</td>
                    <td>{skill.level}</td>
                    <td>{skill.link.join(", ")}</td>
                    <td>{calculateLinkMod(skill.link)}</td>
                    <td>{skill.tnc}</td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={skill.xp}
                        onChange={(e) => handleXPChange(index, parseInt(e.target.value, 10))}
                      />
                    </td>
                    <td>{skill.page}</td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteSkill(index)}>
                        Delete Skill
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <br />
            <div style={{ height: "50px", display: "flex", gap: "5px", alignItems: "center" }}>
              <Dropdown
                options={skillList.map((skill) => skill.skill)}
                onChange={handleDropdownSkill}
                defaultOption="Select a skill"
              />
              {" / "}
              <StyledNormalInput
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
                  <th></th>
                </tr>
              </StyledTableHead>
              <StyledTableBody>
                {biography.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <StyledLargeInput
                        type="text"
                        value={item.lifeEvent}
                        onChange={(e) =>
                          handleInputChangeLiveEvent(index, "lifeEvent", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={item.age}
                        onChange={(e) => handleInputChangeLiveEvent(index, "age", e.target.value)}
                      />
                    </td>
                    <td>
                      <StyledLargeInput
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleInputChangeLiveEvent(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteLiveEvent(index)}>
                        Delete
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <br />
            <button onClick={handleAddLiveEvent}>Add Life Event</button>
          </StyledSectionComponent>

          <StyledSectionComponent>
            <h2>INVENTORY</h2>
            <p>
              C-Bills:{" "}
              <StyledNormalInput
                type="number"
                value={cbills}
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
                      <StyledLargeInput
                        type="text"
                        value={item.equipment}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "equipment", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleInventoryInputChange(index, "qty", e.target.value)}
                      />
                    </td>

                    <td>
                      <StyledSmallInput
                        type="number"
                        value={item.weight}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "weight", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <StyledSmallInput
                        type="number"
                        value={item.cBills}
                        onChange={(e) =>
                          handleInventoryInputChange(index, "cBills", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <StyledSmallInput
                        type="text"
                        value={item.page}
                        onChange={(e) => handleInventoryInputChange(index, "page", e.target.value)}
                      />
                    </td>
                    <td>
                      <StyledLargeInput
                        type="text"
                        value={item.notes}
                        onChange={(e) => handleInventoryInputChange(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteInventoryItem(index)}>
                        Delete
                      </DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <br />
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
                      <StyledLargeInput
                        type="text"
                        value={vehicle.modelName}
                        onChange={(e) =>
                          handleVehicleInputChange(index, "modelName", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <StyledNormalInput
                        type="text"
                        value={vehicle.type}
                        onChange={(e) => handleVehicleInputChange(index, "type", e.target.value)}
                      />
                    </td>
                    <td>
                      <StyledSmallInput
                        type="text"
                        value={vehicle.mass}
                        onChange={(e) => handleVehicleInputChange(index, "mass", e.target.value)}
                      />
                    </td>
                    <td>
                      <StyledLargeInput
                        type="text"
                        value={vehicle.traits}
                        onChange={(e) => handleVehicleInputChange(index, "traits", e.target.value)}
                      />
                    </td>
                    <td>
                      <StyledLargeInput
                        type="text"
                        value={vehicle.notes}
                        onChange={(e) => handleVehicleInputChange(index, "notes", e.target.value)}
                      />
                    </td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteVehicle(index)}>Delete</DeleteButton>
                    </td>
                  </tr>
                ))}
              </StyledTableBody>
            </StyledTable>
            <br />
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
