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

// Instead of using dynamic require calls, we manually import each wallpaper image
export const WALLPAPERS = [
  // AMOLED category (10 wallpapers)
  { id: "amoled-1", title: "AMOLED 1", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_1.webp") },
  { id: "amoled-2", title: "AMOLED 2", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_2.webp") },
  { id: "amoled-3", title: "AMOLED 3", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_3.webp") },
  { id: "amoled-4", title: "AMOLED 4", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_4.webp") },
  { id: "amoled-5", title: "AMOLED 5", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_5.webp") },
  { id: "amoled-6", title: "AMOLED 6", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_6.webp") },
  { id: "amoled-7", title: "AMOLED 7", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_7.webp") },
  { id: "amoled-8", title: "AMOLED 8", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_8.webp") },
  { id: "amoled-9", title: "AMOLED 9", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_9.webp") },
  { id: "amoled-10", title: "AMOLED 10", category: "amoled", image: require("../assets/wallpapers/amoled/amoled_10.webp") },

  // Luxury AMOLED category (22 wallpapers)
  { id: "luxury_amoled-1", title: "Luxury AMOLED 1", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_1.webp") },
  { id: "luxury_amoled-2", title: "Luxury AMOLED 2", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_2.webp") },
  { id: "luxury_amoled-3", title: "Luxury AMOLED 3", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_3.webp") },
  { id: "luxury_amoled-4", title: "Luxury AMOLED 4", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_4.webp") },
  { id: "luxury_amoled-5", title: "Luxury AMOLED 5", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_5.webp") },
  { id: "luxury_amoled-6", title: "Luxury AMOLED 6", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_6.webp") },
  { id: "luxury_amoled-7", title: "Luxury AMOLED 7", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_7.webp") },
  { id: "luxury_amoled-8", title: "Luxury AMOLED 8", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_8.webp") },
  { id: "luxury_amoled-9", title: "Luxury AMOLED 9", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_9.webp") },
  { id: "luxury_amoled-10", title: "Luxury AMOLED 10", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_10.webp") },
  {id: "luxury_amoled-11", title: "Luxury AMOLED 11", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_11.webp") },
  { id: "luxury_amoled-12", title: "Luxury AMOLED 12", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_12.webp") },
  { id: "luxury_amoled-13", title: "Luxury AMOLED 13", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_13.webp") },
  { id: "luxury_amoled-14", title: "Luxury AMOLED 14", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_14.webp") },
  { id: "luxury_amoled-15", title: "Luxury AMOLED 15", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_15.webp") },
  { id: "luxury_amoled-16", title: "Luxury AMOLED 16", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_16.webp") },
  { id: "luxury_amoled-17", title: "Luxury AMOLED 17", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_17.webp") },
  { id: "luxury_amoled-18", title: "Luxury AMOLED 18", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_18.webp") },
  { id: "luxury_amoled-19", title: "Luxury AMOLED 19", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_19.webp") },
  { id: "luxury_amoled-20", title: "Luxury AMOLED 20", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_20.webp") },
  { id: "luxury_amoled-21", title: "Luxury AMOLED 21", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_21.webp") },
  { id: "luxury_amoled-22", title: "Luxury AMOLED 22", category: "luxury_amoled", image: require("../assets/wallpapers/luxury_amoled/luxury_amoled_22.webp") },



  // Abstract category (9 wallpapers)
  { id: "abstract-1", title: "Abstract 1", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_1.webp") },
  { id: "abstract-2", title: "Abstract 2", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_2.webp") },
  { id: "abstract-3", title: "Abstract 3", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_3.webp") },
  { id: "abstract-4", title: "Abstract 4", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_4.webp") },
  { id: "abstract-5", title: "Abstract 5", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_5.webp") },
  { id: "abstract-6", title: "Abstract 6", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_6.webp") },
  { id: "abstract-7", title: "Abstract 7", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_7.webp") },
  { id: "abstract-8", title: "Abstract 8", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_8.webp") },
  { id: "abstract-9", title: "Abstract 9", category: "abstract", image: require("../assets/wallpapers/abstract/abstract_9.webp") },


  // Sports category (10 wallpapers)
  { id: "sports-1", title: "Sports 1", category: "sports", image: require("../assets/wallpapers/sports/sports_1.webp") },
  { id: "sports-2", title: "Sports 2", category: "sports", image: require("../assets/wallpapers/sports/sports_2.webp") },
  { id: "sports-3", title: "Sports 3", category: "sports", image: require("../assets/wallpapers/sports/sports_3.webp") },
  { id: "sports-4", title: "Sports 4", category: "sports", image: require("../assets/wallpapers/sports/sports_4.webp") },
  { id: "sports-5", title: "Sports 5", category: "sports", image: require("../assets/wallpapers/sports/sports_5.webp") },
  { id: "sports-6", title: "Sports 6", category: "sports", image: require("../assets/wallpapers/sports/sports_6.webp") },
  { id: "sports-7", title: "Sports 7", category: "sports", image: require("../assets/wallpapers/sports/sports_7.webp") },
  { id: "sports-8", title: "Sports 8", category: "sports", image: require("../assets/wallpapers/sports/sports_8.webp") },
  { id: "sports-9", title: "Sports 9", category: "sports", image: require("../assets/wallpapers/sports/sports_9.webp") },
  { id: "sports-10", title: "Sports 10", category: "sports", image: require("../assets/wallpapers/sports/sports_10.webp") },



  // Nature category (10 wallpapers)
  { id: "nature-1", title: "Nature 1", category: "nature", image: require("../assets/wallpapers/nature/nature_1.webp") },
  { id: "nature-2", title: "Nature 2", category: "nature", image: require("../assets/wallpapers/nature/nature_2.webp") },
  { id: "nature-3", title: "Nature 3", category: "nature", image: require("../assets/wallpapers/nature/nature_3.webp") },
  { id: "nature-4", title: "Nature 4", category: "nature", image: require("../assets/wallpapers/nature/nature_4.webp") },
  { id: "nature-5", title: "Nature 5", category: "nature", image: require("../assets/wallpapers/nature/nature_5.webp") },
  { id: "nature-6", title: "Nature 6", category: "nature", image: require("../assets/wallpapers/nature/nature_6.webp") },
  { id: "nature-7", title: "Nature 7", category: "nature", image: require("../assets/wallpapers/nature/nature_7.webp") },
  { id: "nature-8", title: "Nature 8", category: "nature", image: require("../assets/wallpapers/nature/nature_8.webp") },
  { id: "nature-9", title: "Nature 9", category: "nature", image: require("../assets/wallpapers/nature/nature_9.webp") },
  { id: "nature-10", title: "Nature 10", category: "nature", image: require("../assets/wallpapers/nature/nature_10.webp") },


  // Minimal category (5 wallpapers)
  { id: "minimal-1", title: "Minimal 1", category: "minimal", image: require("../assets/wallpapers/minimal/minimal_1.webp") },
  { id: "minimal-2", title: "Minimal 2", category: "minimal", image: require("../assets/wallpapers/minimal/minimal_2.webp") },
  { id: "minimal-3", title: "Minimal 3", category: "minimal", image: require("../assets/wallpapers/minimal/minimal_3.webp") },
  { id: "minimal-4", title: "Minimal 4", category: "minimal", image: require("../assets/wallpapers/minimal/minimal_4.webp") },
  { id: "minimal-5", title: "Minimal 5", category: "minimal", image: require("../assets/wallpapers/minimal/minimal_5.webp") },

  // Fantasy category (9 wallpapers)
  { id: "fantasy-1", title: "Fantasy 1", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_1.webp") },
  { id: "fantasy-2", title: "Fantasy 2", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_2.webp") },
  { id: "fantasy-3", title: "Fantasy 3", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_3.webp") },
  { id: "fantasy-4", title: "Fantasy 4", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_4.webp") },
  { id: "fantasy-5", title: "Fantasy 5", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_5.webp") },
  { id: "fantasy-6", title: "Fantasy 6", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_6.webp") },
  { id: "fantasy-7", title: "Fantasy 7", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_7.webp") },
  { id: "fantasy-8", title: "Fantasy 8", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_8.webp") },
  { id: "fantasy-9", title: "Fantasy 9", category: "fantasy", image: require("../assets/wallpapers/fantasy/fantasy_9.webp") },


  // Anime category (10 wallpapers)
  { id: "anime-1", title: "Anime 1", category: "anime", image: require("../assets/wallpapers/anime/anime_1.webp") },
  { id: "anime-2", title: "Anime 2", category: "anime", image: require("../assets/wallpapers/anime/anime_2.webp") },
  { id: "anime-3", title: "Anime 3", category: "anime", image: require("../assets/wallpapers/anime/anime_3.webp") },
  { id: "anime-4", title: "Anime 4", category: "anime", image: require("../assets/wallpapers/anime/anime_4.webp") },
  { id: "anime-5", title: "Anime 5", category: "anime", image: require("../assets/wallpapers/anime/anime_5.webp") },
  { id: "anime-6", title: "Anime 6", category: "anime", image: require("../assets/wallpapers/anime/anime_6.webp") },
  { id: "anime-7", title: "Anime 7", category: "anime", image: require("../assets/wallpapers/anime/anime_7.webp") },
  { id: "anime-8", title: "Anime 8", category: "anime", image: require("../assets/wallpapers/anime/anime_8.webp") },
  { id: "anime-9", title: "Anime 9", category: "anime", image: require("../assets/wallpapers/anime/anime_9.webp") },
  { id: "anime-10", title: "Anime 10", category: "anime", image: require("../assets/wallpapers/anime/anime_10.webp") },


  
  // Dogs category (18 wallpapers)
  { id: "dogs-1", title: "Dogs 1", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_1.webp") },
  { id: "dogs-2", title: "Dogs 2", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_2.webp") },
  { id: "dogs-3", title: "Dogs 3", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_3.webp") },
  { id: "dogs-4", title: "Dogs 4", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_4.webp") },
  { id: "dogs-5", title: "Dogs 5", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_5.webp") },
  { id: "dogs-6", title: "Dogs 6", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_6.webp") },
  { id: "dogs-7", title: "Dogs 7", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_7.webp") },
  { id: "dogs-8", title: "Dogs 8", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_8.webp") },
  { id: "dogs-9", title: "Dogs 9", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_9.webp") },
  { id: "dogs-10", title: "Dogs 10", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_10.webp") },
  {id: "dogs-11", title: "Dogs 11", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_11.webp") },
  { id: "dogs-12", title: "Dogs 12", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_12.webp") },
  { id: "dogs-13", title: "Dogs 13", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_13.webp") },
  { id: "dogs-14", title: "Dogs 14", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_14.webp") },
  { id: "dogs-15", title: "Dogs 15", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_15.webp") },
  {id: "dogs-16", title: "Dogs 16", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_16.webp") },
  { id: "dogs-17", title: "Dogs 17", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_17.webp") },
  { id: "dogs-18", title: "Dogs 18", category: "dogs", image: require("../assets/wallpapers/dogs/dogs_18.webp") },
 



  // Cats category (13 wallpapers)
  { id: "cats-1", title: "Cats 1", category: "cats", image: require("../assets/wallpapers/cats/cats_1.webp") },
  { id: "cats-2", title: "Cats 2", category: "cats", image: require("../assets/wallpapers/cats/cats_2.webp") },
{ id: "cats-3", title: "Cats 3", category: "cats", image: require("../assets/wallpapers/cats/cats_3.webp") },
  { id: "cats-4", title: "Cats 4", category: "cats", image: require("../assets/wallpapers/cats/cats_4.webp") },
{ id: "cats-5", title: "Cats 5", category: "cats", image: require("../assets/wallpapers/cats/cats_5.webp") },
  { id: "cats-6", title: "Cats 6", category: "cats", image: require("../assets/wallpapers/cats/cats_6.webp") },
{ id: "cats-7", title: "Cats 7", category: "cats", image: require("../assets/wallpapers/cats/cats_7.webp") },
  { id: "cats-8", title: "Cats 8", category: "cats", image: require("../assets/wallpapers/cats/cats_8.webp") },
{ id: "cats-9", title: "Cats 9", category: "cats", image: require("../assets/wallpapers/cats/cats_9.webp") },
  { id: "cats-10", title: "Cats 10", category: "cats", image: require("../assets/wallpapers/cats/cats_10.webp") },
{ id: "cats-11", title: "Cats 11", category: "cats", image: require("../assets/wallpapers/cats/cats_11.webp") },
  { id: "cats-12", title: "Cats 12", category: "cats", image: require("../assets/wallpapers/cats/cats_12.webp") },
{ id: "cats-13", title: "Cats 13", category: "cats", image: require("../assets/wallpapers/cats/cats_13.webp") },
 

// Cartoon category (18 wallpapers)
{ id: "cartoon-1", title: "Cartoon 1", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_1.webp") },
{ id: "cartoon-2", title: "Cartoon 2", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_2.webp") },
{ id: "cartoon-3", title: "Cartoon 3", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_3.webp") },
{ id: "cartoon-4", title: "Cartoon 4", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_4.webp") },
{ id: "cartoon-5", title: "Cartoon 5", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_5.webp") },
{ id: "cartoon-6", title: "Cartoon 6", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_6.webp") },
{ id: "cartoon-7", title: "Cartoon 7", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_7.webp") },
{ id: "cartoon-8", title: "Cartoon 8", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_8.webp") },
{ id: "cartoon-9", title: "Cartoon 9", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_9.webp") },
{ id: "cartoon-10", title: "Cartoon 10", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_10.webp") },
{ id: "cartoon-11", title: "Cartoon 11", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_11.webp") },
{ id: "cartoon-12", title: "Cartoon 12", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_12.webp") },
{ id: "cartoon-13", title: "Cartoon 13", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_13.webp") },
{ id: "cartoon-14", title: "Cartoon 14", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_14.webp") },
{ id: "cartoon-15", title: "Cartoon 15", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_15.webp") },
{ id: "cartoon-16", title: "Cartoon 16", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_16.webp") },
{ id: "cartoon-17", title: "Cartoon 17", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_17.webp") },
{ id: "cartoon-18", title: "Cartoon 18", category: "cartoon", image: require("../assets/wallpapers/cartoon/cartoon_18.webp") },

// Wild Animals category (10 wallpapers)
{ id: "wild_animals-1", title: "Wild Animals 1", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_1.webp") },
{ id: "wild_animals-2", title: "Wild Animals 2", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_2.webp") },
{ id: "wild_animals-3", title: "Wild Animals 3", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_3.webp") },
{ id: "wild_animals-4", title: "Wild Animals 4", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_4.webp") },
{ id: "wild_animals-5", title: "Wild Animals 5", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_5.webp") },
{ id: "wild_animals-6", title: "Wild Animals 6", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_6.webp") },
{ id: "wild_animals-7", title: "Wild Animals 7", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_7.webp") },
{ id: "wild_animals-8", title: "Wild Animals 8", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_8.webp") },
{ id: "wild_animals-9", title: "Wild Animals 9", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_9.webp") },
{ id: "wild_animals-10", title: "Wild Animals 10", category: "wild_animals", image: require("../assets/wallpapers/wild_animals/wild_animals_10.webp") },

// Birds category (16 wallpapers)
{ id: "birds-1", title: "Birds 1", category: "birds", image: require("../assets/wallpapers/birds/birds_1.webp") },
{ id: "birds-2", title: "Birds 2", category: "birds", image: require("../assets/wallpapers/birds/birds_2.webp") },
{ id: "birds-3", title: "Birds 3", category: "birds", image: require("../assets/wallpapers/birds/birds_3.webp") },
{ id: "birds-4", title: "Birds 4", category: "birds", image: require("../assets/wallpapers/birds/birds_4.webp") },
{ id: "birds-5", title: "Birds 5", category: "birds", image: require("../assets/wallpapers/birds/birds_5.webp") },
{ id: "birds-6", title: "Birds 6", category: "birds", image: require("../assets/wallpapers/birds/birds_6.webp") },
{ id: "birds-7", title: "Birds 7", category: "birds", image: require("../assets/wallpapers/birds/birds_7.webp") },
{ id: "birds-8", title: "Birds 8", category: "birds", image: require("../assets/wallpapers/birds/birds_8.webp") },
{ id: "birds-9", title: "Birds 9", category: "birds", image: require("../assets/wallpapers/birds/birds_9.webp") },
{ id: "birds-10", title: "Birds 10", category: "birds", image: require("../assets/wallpapers/birds/birds_10.webp") },
{ id: "birds-11", title: "Birds 11", category: "birds", image: require("../assets/wallpapers/birds/birds_11.webp") },
{ id: "birds-12", title: "Birds 12", category: "birds", image: require("../assets/wallpapers/birds/birds_12.webp") },
{ id: "birds-13", title: "Birds 13", category: "birds", image: require("../assets/wallpapers/birds/birds_13.webp") },
{ id: "birds-14", title: "Birds 14", category: "birds", image: require("../assets/wallpapers/birds/birds_14.webp") },
{ id: "birds-15", title: "Birds 15", category: "birds", image: require("../assets/wallpapers/birds/birds_15.webp") },
{ id: "birds-16", title: "Birds 16", category: "birds", image: require("../assets/wallpapers/birds/birds_16.webp") },

];




