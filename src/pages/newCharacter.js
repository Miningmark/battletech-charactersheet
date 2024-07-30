import styled from "styled-components";
import { useState } from "react";

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

export default function NewCharacter() {
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
    strXP: 0,
    bodXP: 0,
    rflXP: 0,
    dexXP: 0,
    intXP: 0,
    wilXP: 0,
    chaXP: 0,
    edgXP: 0,
  });

  const [combatData, setCombatData] = useState({
    standardDamage: "",
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

  function handleChangePersonalData(e) {
    const { name, value } = e.target;
    setPersonalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(personalData);
  }

  function handleChangeAttributes(e) {
    const { name, value } = e.target;
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [name]: Number(value),
    }));
  }

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

  function calculateScore(xp) {
    if (xp >= 0) {
      return Math.floor(xp / 100);
    } else {
      return Math.ceil(xp / 100);
    }
  }

  function calculateLevel(xp) {
    const xpThresholds = [30, 50, 80, 120, 170, 230, 300, 380, 470, 570];
    let level = 0;

    for (let i = 0; i < xpThresholds.length; i++) {
      if (xp >= xpThresholds[i]) {
        level = i + 1;
      } else {
        break;
      }
    }

    return level;
  }

  return (
    <>
      <h1>New Character</h1>
      <CharacterWrapper>
        <CharacterContainer>
          <Columns2>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
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

                <table>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Score</th>
                      <th>Link</th>
                      <th>XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(attributes).map(([key, xp]) => {
                      const attribute = key.replace("XP", "").toUpperCase();
                      return (
                        <tr key={key}>
                          <td>{attribute}</td>
                          <td>{calculateScore(xp)}</td>
                          <td>-</td>
                          <td>
                            <input
                              type="number"
                              min="0"
                              name={key}
                              value={xp}
                              onChange={handleChangeAttributes}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </StyledSectionComponent>
            </div>

            <StyledSectionComponent>
              <h2>COMBAT DATA</h2>
              <table>
                <thead>
                  <tr>
                    <th colSpan="2">Condition Monitor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard Damage:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Fatigue Damage:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      Stun: <input type="checkbox" /> Unconscious: <input type="checkbox" />
                    </td>
                  </tr>
                  <tr>
                    <th colSpan="2">Movement (Meters per Turn)</th>
                  </tr>
                  <tr>
                    <td>Walk:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Run/Evade:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Sprint:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Climb:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Crawl:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                  <tr>
                    <td>Swim:</td>
                    <td>
                      <input type="text" />
                    </td>
                  </tr>
                </tbody>
              </table>

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

              <h3>Weapon</h3>
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
                    <td>{trait.trait}</td>
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
        </CharacterContainer>
      </CharacterWrapper>
      <br />
    </>
  );
}
