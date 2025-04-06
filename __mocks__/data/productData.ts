export const products = [
  {
    id: 100001,
    category: 'Furniture',
    subCategories: [
      {
        id: 200001,
        parentId: 100001,
        subCategory: 'Sofas',
        products: [
          ...Array.from({ length: 60 }, (_, i) => ({
            id: 300001 + i,
            name: `Leather Sofa ${i + 1}`,
            categoryId: 200001,
            attributes: {
              sku: 501001 + i,
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
              available: i % 2 === 0,
              description: `A premium leather sofa model ${i + 1}.`,
              colors: ['Black', 'Brown', 'Beige'],
            },
          })),
        ],
      },
      {
        id: 200002,
        parentId: 100001,
        subCategory: 'Tables',
        products: [
          {
            id: 300003,
            name: 'Dining Table',
            categoryId: 200002,
            attributes: {
              sku: 501003,
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
              available: true,
              description: 'Solid wood dining table for 6 people.',
              colors: ['Walnut', 'Oak'],
            },
          },
          {
            id: 300004,
            name: 'Coffee Table',
            categoryId: 200002,
            attributes: {
              sku: 501004,
              url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7',
              available: true,
              description: 'Compact coffee table with storage shelf.',
              colors: ['Black', 'White'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 100002,
    category: 'Garden and Leisure',
    subCategories: [
      {
        id: 200003,
        parentId: 100002,
        subCategory: 'Outdoor Furniture',
        products: [
          {
            id: 300005,
            name: 'Patio Set',
            categoryId: 200003,
            attributes: {
              sku: 501005,
              url: 'https://images.unsplash.com/photo-1556912999-54f5f6f6f6f6',
              available: true,
              description: 'Durable patio set with chairs and table.',
              colors: ['Gray', 'White'],
            },
          },
          {
            id: 300006,
            name: 'Hammock',
            categoryId: 200003,
            attributes: {
              sku: 501006,
              url: 'https://images.unsplash.com/photo-1556912999-54f5f6f6f6f6',
              available: false,
              description: 'Relaxing hammock for your garden retreat.',
              colors: ['Green', 'Beige'],
            },
          },
        ],
      },
      {
        id: 200004,
        parentId: 100002,
        subCategory: 'Gardening Tools',
        products: [
          {
            id: 300007,
            name: 'Rake',
            categoryId: 200004,
            attributes: {
              sku: 501007,
              url: 'https://images.unsplash.com/photo-1556912999-54f5f6f6f6f6',
              available: true,
              description: 'Sturdy garden rake with ergonomic handle.',
              colors: ['Red', 'Green'],
            },
          },
          {
            id: 300008,
            name: 'Shovel',
            categoryId: 200004,
            attributes: {
              sku: 501008,
              url: 'https://images.unsplash.com/photo-1556912999-54f5f6f6f6f6',
              available: true,
              description: 'Steel shovel for heavy-duty digging.',
              colors: ['Black', 'Silver'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 100003,
    category: 'Accessories',
    subCategories: [
      {
        id: 200005,
        parentId: 100003,
        subCategory: 'Decor',
        products: [
          {
            id: 300009,
            name: 'Vase',
            categoryId: 200005,
            attributes: {
              sku: 501009,
              url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
              available: true,
              description: 'Elegant ceramic vase for any decor.',
              colors: ['White', 'Blue', 'Gold'],
            },
          },
          {
            id: 300010,
            name: 'Wall Art',
            categoryId: 200005,
            attributes: {
              sku: 501010,
              url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
              available: false,
              description: 'Modern canvas wall art for living spaces.',
              colors: ['Multicolor'],
            },
          },
        ],
      },
      {
        id: 200006,
        parentId: 100003,
        subCategory: 'Storage',
        products: [
          {
            id: 300011,
            name: 'Baskets',
            categoryId: 200006,
            attributes: {
              sku: 501011,
              url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
              available: true,
              description: 'Handwoven storage baskets for organization.',
              colors: ['Natural', 'White'],
            },
          },
          {
            id: 300012,
            name: 'Boxes',
            categoryId: 200006,
            attributes: {
              sku: 501012,
              url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36',
              available: true,
              description: 'Set of decorative storage boxes.',
              colors: ['Brown', 'Gray'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 100004,
    category: 'Lamps',
    subCategories: [
      {
        id: 200007,
        parentId: 100004,
        subCategory: 'Ceiling Lamps',
        products: [
          {
            id: 300013,
            name: 'Chandelier',
            categoryId: 200007,
            attributes: {
              sku: 501013,
              url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
              available: true,
              description: 'Crystal chandelier for a luxurious look.',
              colors: ['Gold', 'Clear'],
            },
          },
          {
            id: 300014,
            name: 'Pendant Light',
            categoryId: 200007,
            attributes: {
              sku: 501014,
              url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
              available: false,
              description: 'Minimalist pendant light for modern homes.',
              colors: ['Black', 'White'],
            },
          },
        ],
      },
      {
        id: 200008,
        parentId: 100004,
        subCategory: 'Table Lamps',
        products: [
          {
            id: 300015,
            name: 'Desk Lamp',
            categoryId: 200008,
            attributes: {
              sku: 501015,
              url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
              available: true,
              description: 'Adjustable LED desk lamp with USB charging.',
              colors: ['Black', 'Silver'],
            },
          },
          {
            id: 300016,
            name: 'Bedside Lamp',
            categoryId: 200008,
            attributes: {
              sku: 501016,
              url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85',
              available: true,
              description: 'Soft glow bedside lamp with touch control.',
              colors: ['White', 'Wood'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 100005,
    category: 'Kitchen',
    subCategories: [
      {
        id: 200009,
        parentId: 100005,
        subCategory: 'Cookware',
        products: [
          {
            id: 300017,
            name: 'Frying Pan',
            categoryId: 200009,
            attributes: {
              sku: 501017,
              url: 'https://images.unsplash.com/photo-1603394532903-284c5fcd93d2',
              available: true,
              description: 'Non-stick frying pan with ergonomic handle.',
              colors: ['Black', 'Red'],
            },
          },
          {
            id: 300018,
            name: 'Saucepan',
            categoryId: 200009,
            attributes: {
              sku: 501018,
              url: 'https://images.unsplash.com/photo-1603394532903-284c5fcd93d2',
              available: false,
              description: 'Stainless steel saucepan with glass lid.',
              colors: ['Silver'],
            },
          },
        ],
      },
      {
        id: 200010,
        parentId: 100005,
        subCategory: 'Utensils',
        products: [
          {
            id: 300019,
            name: 'Spatula',
            categoryId: 200010,
            attributes: {
              sku: 501019,
              url: 'https://images.unsplash.com/photo-1603394532903-284c5fcd93d2',
              available: true,
              description: 'Heat-resistant silicone spatula.',
              colors: ['Green', 'Orange'],
            },
          },
          {
            id: 300020,
            name: 'Whisk',
            categoryId: 200010,
            attributes: {
              sku: 501020,
              url: 'https://images.unsplash.com/photo-1603394532903-284c5fcd93d2',
              available: true,
              description: 'Stainless steel balloon whisk.',
              colors: ['Silver'],
            },
          },
        ],
      },
    ],
  },
  {
    id: 100006,
    category: 'Bedroom',
    subCategories: [
      {
        id: 200011,
        parentId: 100006,
        subCategory: 'Beds',
        products: [
          {
            id: 300021,
            name: 'Queen Bed',
            categoryId: 200011,
            attributes: {
              sku: 501021,
              url: 'https://images.unsplash.com/photo-1601979031925-3ccdebb6d6d3',
              available: true,
              description: 'Spacious queen-size bed with headboard.',
              colors: ['Gray', 'White'],
            },
          },
          {
            id: 300022,
            name: 'Bunk Bed',
            categoryId: 200011,
            attributes: {
              sku: 501022,
              url: 'https://images.unsplash.com/photo-1601979031925-3ccdebb6d6d3',
              available: false,
              description: 'Wooden bunk bed with safety rails.',
              colors: ['Natural', 'White'],
            },
          },
        ],
      },
      {
        id: 200012,
        parentId: 100006,
        subCategory: 'Wardrobes',
        products: [
          {
            id: 300023,
            name: '2-Door Wardrobe',
            categoryId: 200012,
            attributes: {
              sku: 501023,
              url: 'https://images.unsplash.com/photo-1601979031925-3ccdebb6d6d3',
              available: true,
              description: 'Spacious 2-door wardrobe with mirror.',
              colors: ['Walnut', 'Oak'],
            },
          },
          {
            id: 300024,
            name: 'Sliding Wardrobe',
            categoryId: 200012,
            attributes: {
              sku: 501024,
              url: 'https://images.unsplash.com/photo-1601979031925-3ccdebb6d6d3',
              available: true,
              description: 'Modern sliding wardrobe with soft-close doors.',
              colors: ['Black', 'White'],
            },
          },
        ],
      },
    ],
  },
];
