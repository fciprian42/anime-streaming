const iconInteresets = {
  action: require('@assets/icons/interesets/action.webp'),
  romance: require('@assets/icons/interesets/romance.webp'),
  adventure: require('@assets/icons/interesets/adventure.webp'),
  thriller: require('@assets/icons/interesets/thriller.webp'),
  fantasy: require('@assets/icons/interesets/fantasy.webp'),
  magic: require('@assets/icons/interesets/magic.webp'),
  kids: require('@assets/icons/interesets/kids.webp'),
  drama: require('@assets/icons/interesets/drama.webp'),
  comedy: require('@assets/icons/interesets/comedy.webp'),
  cars: require('@assets/icons/interesets/cars.webp'),
  horror: require('@assets/icons/interesets/horror.webp'),
  demons: require('@assets/icons/interesets/demons.webp'),
  space: require('@assets/icons/interesets/space.webp'),
  game: require('@assets/icons/interesets/game.webp'),
  music: require('@assets/icons/interesets/music.webp'),
  samurai: require('@assets/icons/interesets/samurai.webp'),
  school: require('@assets/icons/interesets/school.webp'),
  superpower: require('@assets/icons/interesets/midoriya.webp'),
  martialarts: require('@assets/icons/interesets/vegeta.webp'),
  sports: require('@assets/icons/interesets/sports.webp'),
  vampire: require('@assets/icons/interesets/vampire.webp'),
  isekai: require('@assets/icons/interesets/isekai.webp'),
  shounen: require('@assets/icons/interesets/naruto.webp'),
};

export const iconRegistry = {
  back: require('@assets/icons/navigation/back.png'),
  ...iconInteresets,
};

export type IconTypes = keyof typeof iconRegistry;
