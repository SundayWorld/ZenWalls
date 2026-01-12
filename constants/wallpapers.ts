export const CATEGORIES = [
  { id: "amoled", name: "AMOLED", icon: "🖤" },
  { id: "luxury_amoled", name: "Luxury AMOLED", icon: "💎" },
  { id: "abstract", name: "Abstract", icon: "🎨" },
  { id: "sports", name: "Sports", icon: "⚽" },
  { id: "nature", name: "Nature", icon: "🌿" },
  { id: "minimal", name: "Minimal", icon: "⚪" },
  { id: "fantasy", name: "Fantasy", icon: "✨" },
  { id: "anime", name: "Anime", icon: "🎭" },
  { id: "dogs", name: "Dogs", icon: "🐕" },
  { id: "cats", name: "Cats", icon: "🐱" },
  { id: "birds", name: "Birds", icon: "🐦" },
  { id: "wild_animals", name: "Wild Animals", icon: "🦁" },
  { id: "cartoon", name: "Cartoon", icon: "🧸" }
];

function make(category: string, folder: string, count: number) {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    return {
      id: `${category}-${n}`,
      title: `${category.replace("_", " ")} ${n}`,
      category,
      image: require(`../assets/wallpapers/${folder}/${folder}_${n}.webp`)
    };
  });
}

export const WALLPAPERS = [
  ...make("amoled", "amoled", 10),
  ...make("luxury_amoled", "luxury_amoled", 22),
  ...make("abstract", "abstract", 9),
  ...make("sports", "sports", 10),
  ...make("nature", "nature", 10),
  ...make("minimal", "minimal", 5),
  ...make("fantasy", "fantasy", 9),
  ...make("anime", "anime", 10),
  ...make("dogs", "dogs", 18),
  ...make("cats", "cats", 13),
  ...make("birds", "birds", 16),
  ...make("wild_animals", "wild_animals", 10),
  ...make("cartoon", "cartoon", 18)
];



