export const traitList = [
  { trait: "Alternate ID", page: "P.108", min: 2, max: 2 },
  { trait: "Animal Antipathy", page: "P.108", min: -1, max: -1 },
  { trait: "Ambidextrous", page: "P.108", min: 2, max: 2 },
  { trait: "Bloodmark", page: "P.109", min: -5, max: -1 },
  { trait: "Animal Empathy", page: "P.108", min: 1, max: 1 },
  { trait: "Combat Paralysis", page: "P.110", min: -4, max: -4 },
  { trait: "Attractive", page: "P.108", min: 2, max: 2 },
  { trait: "Compulsion", page: "P.110", min: -5, max: -1 },
  { trait: "Citizenship/Trueborn", page: "P.109", min: 2, max: 2 },
  { trait: "Dark Secret", page: "P.112", min: -5, max: -1 },
  { trait: "Combat Sense", page: "P.110", min: 4, max: 4 },
  { trait: "Dependent", page: "P.113", min: -2, max: -1 },
  { trait: "Connections", page: "P.111", min: 1, max: 10 },
  { trait: "Enemy", page: "P.113", min: -10, max: -1 },
  { trait: "Exceptional Attribute", page: "P.116", min: 2, max: 2 },
  { trait: "Glass Jaw", page: "P.118", min: -3, max: -3 },
  { trait: "Fast Learner", page: "P.117", min: 3, max: 3 },
  { trait: "Gremlins", page: "P.118", min: -3, max: -3 },
  { trait: "Fit", page: "P.117", min: 2, max: 2 },
  { trait: "Handicap", page: "P.118", min: -5, max: -1 },
  { trait: "G-Tolerance", page: "P.118", min: 1, max: 1 },
  { trait: "Illiterate", page: "P.119", min: -1, max: -1 },
  { trait: "Good Hearing", page: "P.118", min: 1, max: 1 },
  { trait: "Impatient", page: "P.119", min: -1, max: -1 },
  { trait: "Good Vision", page: "P.118", min: 1, max: 1 },
  { trait: "In For Life", page: "P.120", min: -3, max: -3 },
  { trait: "Gregarious", page: "P.118", min: 1, max: 1 },
  { trait: "Introvert", page: "P.121", min: -1, max: -1 },
  { trait: "Implant/Prosthetic", page: "P.119", min: 1, max: 6 },
  { trait: "Lost Limb", page: "P.121", min: -5, max: -1 },
  { trait: "Natural Aptitude", page: "P.121", min: 3, max: 5 },
  { trait: "Poor Hearing", page: "P.122", min: -5, max: -1 },
  { trait: "Pain Resistance", page: "P.121", min: 3, max: 3 },
  { trait: "Poor Vision", page: "P.122", min: -9, max: -2 },
  { trait: "Patient", page: "P.121", min: 1, max: 1 },
  { trait: "Slow Learner", page: "P.125", min: -3, max: -3 },
  { trait: "Phenotype", page: "P.121", min: 0, max: 0 },
  { trait: "TDS", page: "P.127", min: -1, max: -1 },
  { trait: "Poison Resistance", page: "P.122", min: 2, max: 2 },
  { trait: "Unattractive", page: "P.128", min: -1, max: -1 },
  { trait: "Property", page: "P.123", min: 1, max: 10 },
  { trait: "Unlucky", page: "P.128", min: -10, max: -2 },
  { trait: "Rank", page: "P.123", min: 1, max: 15 },
  { trait: "Sixth Sense", page: "P.125", min: 4, max: 4 },
  { trait: "Tech Empathy", page: "P.125", min: 3, max: 3 },
  { trait: "Title/Bloodname", page: "P.126", min: 3, max: 10 },
  { trait: "Toughness", page: "P.127", min: 3, max: 3 },
  { trait: "Equipped", page: "P.116", min: -1, max: 8 },
  { trait: "Custom Vehicle", page: "P.112", min: 1, max: 6 },
  { trait: "Design Quirk", page: "P.113", min: -5, max: 5 },
  { trait: "Vehicle Level", page: "P.128", min: 1, max: 12 },
  { trait: "Wealth", page: "P.128", min: -1, max: 10 },
];

export const opposedTraitsList = [
  {
    positiveTrait: "Animal Empathy",
    positiveTP: "+1",
    negativeTrait: "Animal Antipathy",
    negativeTP: "–1",
  },
  {
    positiveTrait: "Attractive",
    positiveTP: "+2",
    negativeTrait: "Unattractive",
    negativeTP: "–1",
  },
  {
    positiveTrait: "Combat Sense",
    positiveTP: "+4",
    negativeTrait: "Combat Paralysis",
    negativeTP: "–4",
  },
  {
    positiveTrait: "Fast Learner",
    positiveTP: "+3",
    negativeTrait: "Slow Learner",
    negativeTP: "–3",
  },
  { positiveTrait: "Fit", positiveTP: "+2", negativeTrait: "Handicap", negativeTP: "–[1 to 5]" },
  {
    positiveTrait: "Good Hearing",
    positiveTP: "+1",
    negativeTrait: "Poor Hearing",
    negativeTP: "–[1 to 5]",
  },
  {
    positiveTrait: "Good Vision",
    positiveTP: "+1",
    negativeTrait: "Poor Vision",
    negativeTP: "–[1 to 9]",
  },
  { positiveTrait: "Gregarious", positiveTP: "+1", negativeTrait: "Introvert", negativeTP: "–1" },
  {
    positiveTrait: "4+ Levels in a Language Skill",
    positiveTP: "",
    negativeTrait: "Illiterate",
    negativeTP: "–1",
  },
  { positiveTrait: "Patient", positiveTP: "+1", negativeTrait: "Impatient", negativeTP: "–1" },
  { positiveTrait: "Tech Empathy", positiveTP: "+3", negativeTrait: "Gremlins", negativeTP: "–3" },
  { positiveTrait: "Toughness", positiveTP: "+3", negativeTrait: "Glass Jaw", negativeTP: "–3" },
];
