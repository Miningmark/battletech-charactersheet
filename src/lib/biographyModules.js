export const typeOfLifeEvents = [
  { id: 0, name: "Early Childhood", type: "earlyChildhood" },
  { id: 1, name: "Late Childhood", type: "lateChildhood" },
  { id: 2, name: "Higher Education", type: "higherEducation" },
  { id: 3, name: "Real Life", type: "realLife" },
];

export const earlyChildhood = [
  { id: 0, duration: 10, name: "Back Woods", type: "backWoods" },
  { id: 1, duration: 10, name: "Blue Collar", type: "blueCollar" },
  { id: 2, duration: 10, name: "Born Mercenary Brat", type: "bornMercenaryBrat" },
  { id: 3, duration: 10, name: "Farm", type: "farm" },
  { id: 4, duration: 10, name: "Fugitives", type: "fugitives" },
  { id: 5, duration: 10, name: "Nobility", type: "nobility" },
  { id: 6, duration: 10, name: "Slave", type: "slave" },
  { id: 7, duration: 10, name: "Street", type: "street" },
  { id: 8, duration: 10, name: "Trueborn Creche", type: "truebornCreche" },
  { id: 9, duration: 10, name: "White Collar", type: "whiteCollar" },
];

export const lateChildhood = [
  { id: 0, duration: 6, name: "Adolescent warfare", type: "adolescentWarfare" },
  { id: 1, duration: 6, name: "Back woods", type: "backWoods" },
  { id: 2, duration: 6, name: "Clan apprenticeship", type: "clanApprenticeship" },
  { id: 3, duration: 6, name: "Farm", type: "farm" },
  { id: 4, duration: 6, name: "Freeborn Sibko", type: "freebornSibko" },
  { id: 5, duration: 6, name: "High school", type: "highSchool" },
  { id: 6, duration: 6, name: "Mercenary brat", type: "mercenaryBrat" },
  { id: 7, duration: 6, name: "Military school", type: "militarySchool" },
  { id: 8, duration: 6, name: "Preparatory school", type: "preparatorySchool" },
  { id: 9, duration: 6, name: "Spacer Family", type: "spacerFamily" },
  { id: 10, duration: 6, name: "Street", type: "street" },
  { id: 11, duration: 6, name: "Trueborn Sibko", type: "truebornSibko" },
];

export const higherEducation = [
  {
    school: "Technical College",
    fields: [
      { class: "Basic", duration: 1 },
      { class: "Advanced", duration: 2 },
    ],
  },
  {
    school: "Trade School",
    fields: [
      { class: "Basic", duration: 1 },
      { class: "Advanced", duration: 2 },
    ],
  },
  {
    school: "University",
    fields: [
      { class: "Basic", duration: 1 },
      { class: "Advanced", duration: 2 },
      { class: "Special", duration: 2 },
    ],
  },
  {
    school: "Solaris Internship",
    fields: [
      { class: "Basic", duration: 2 },
      { class: "Advanced", duration: 2 },
    ],
  },
  {
    school: "Police Academy",
    fields: [
      { class: "Basic", duration: 0.5 },
      { class: "Advanced", duration: 1 },
      { class: "Special", duration: 2 },
    ],
  },
  {
    school: "Intelligence Operative Training",
    fields: [
      { class: "Basic", duration: 1 },
      { class: "Advanced", duration: 1 },
      { class: "Special", duration: 2 },
    ],
  },
  {
    school: "Military Academy",
    fields: [
      { class: "Basic", duration: 1 },
      { class: "Advanced", duration: 1 },
      { class: "Special", duration: 2 },
    ],
  },
  {
    school: "Military Enlistment",
    fields: [
      { class: "Basic", duration: 0.5 },
      { class: "Advanced", duration: 1.5 },
      { class: "Special", duration: 1 },
    ],
  },
  {
    school: "Family Training",
    fields: [
      { class: "Basic", duration: 0.5 },
      { class: "Advanced", duration: 1.5 },
      { class: "Special", duration: 2 },
    ],
  },
  {
    school: "Officer Candidate School",
    fields: [{ class: "Basic", duration: 1 }],
  },
];

export const realLife = [
  { name: "Agitator", duration: 4 },
  { name: "Civilian Job", duration: 6 },
  { name: "Clan Watch Operative", duration: 3 },
  { name: "Clan Warrior Washout", duration: 2 },
  { name: "Cloister Training", duration: 3 },
  { name: "Combat Correspondent", duration: 4 },
  { name: "Comstar/Word of Blake Service", duration: 5 },
  { name: "Covert Operations", duration: 6 },
  { name: "Dark Caste", duration: 4 },
  { name: "Explorer", duration: 6 },
  { name: "Goliath Scorpion Seeker", duration: 4 },
  { name: "Guerilla Insurgent", duration: 6 },
  { name: "Merchant", duration: 4 },
  { name: "NE'ER-DO-WELL", duration: 4 },
  { name: "Organized Crime", duration: 5 },
  { name: "Postgraduate Studies", duration: 4 },
  { name: "Protomech Pilot Training", duration: 2 },
  { name: "Scientist Caste Service", duration: 4 },
  { name: "Solaris Insider", duration: 4 },
  { name: "Solaris VII Games", duration: 4 },
  { name: "Think Tank", duration: 4 },
  { name: "Tour of Duty", duration: 3 },
  { name: "To Serve and Protect", duration: 4 },
  { name: "Travel", duration: 6 },
];
