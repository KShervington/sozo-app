// Execute with node populate_users.ts

const usersTestData = [
  {
    username: 'ReinaSantos',
    email: 'reina.santos@auto.com',
    password: 'kbcskdbjkJVJ7KBB^*b!',
    bio: '',
  },
  {
    name: 'Heels',
    description: 'Durable hiking boots for rugged trails',
    price: 80.96,
    imageUrl: 'http://example.com/flip_flops_image.jpg',
    nftId: 'unique-nft-id-8138',
    seller: '66f99f7f67c080cc3043afc2',
  },
  {
    name: 'Hiking Boots',
    description: 'Lightweight running shoes for fitness',
    price: 109.05,
    imageUrl: 'http://example.com/heels_image.jpg',
    nftId: 'unique-nft-id-5650',
    seller: '66f99f7f67c080cc3043afc2',
  },
  {
    name: 'Brogues',
    description: 'Lightweight running shoes for fitness',
    price: 97.83,
    imageUrl: 'http://example.com/brogues_image.jpg',
    nftId: 'unique-nft-id-7612',
    seller: '66f98db7ea27d958950b2ddf',
  },
  {
    name: 'Running Shoes',
    description: 'Casual summer sandals',
    price: 111.23,
    imageUrl: 'http://example.com/brogues_image.jpg',
    nftId: 'unique-nft-id-5466',
    seller: '66f98db7ea27d958950b2ddf',
  },
  {
    name: 'Mud Boots',
    description: 'Formal brogues for business attire',
    price: 83.52,
    imageUrl: 'http://example.com/heels_image.jpg',
    nftId: 'unique-nft-id-7747',
    seller: '66e78426c6b127633a315573',
  },
  {
    name: 'Blue Jeans',
    description: 'Casual summer sandals',
    price: 58.61,
    imageUrl: 'http://example.com/boots_image.jpg',
    nftId: 'unique-nft-id-5782',
    seller: '66e78426c6b127633a315573',
  },
  {
    name: 'Slippers',
    description: 'Casual flip flops for beach outings',
    price: 142.81,
    imageUrl: 'http://example.com/hiking_boots_image.jpg',
    nftId: 'unique-nft-id-3697',
    seller: '66e773a8d84fc19d0aaf18ed',
  },
  {
    name: 'Shawl',
    description: 'Durable hiking boots for rugged trails',
    price: 45.66,
    imageUrl: 'http://example.com/heels_image.jpg',
    nftId: 'unique-nft-id-8995',
    seller: '66e76191c87d92bfc5b68348',
  },
  {
    name: 'Flats',
    description: 'Casual summer sandals',
    price: 126.47,
    imageUrl: 'http://example.com/flip_flops_image.jpg',
    nftId: 'unique-nft-id-4332',
    seller: '66f99e67619cad1068e2952b',
  },
];

const instantiateUserDb = async () => {
  const axios = require('axios');
  const url = `http://localhost:3000/users`;

  for (const user of usersTestData) {
    try {
      const response = await axios.post(url, user);
      console.log(`Successfully added: ${user.name}`);
    } catch (error) {
      console.error(`Failed to add ${user.name}:\n${error}`);
    }
  }
};

instantiateUserDb();
