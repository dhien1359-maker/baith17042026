// File: data.js
export const productData = [
  // --- Nhóm Trứng & Mì (Dùng cho màn Search & Filter) ---
  { id: '1', name: 'Egg Chicken Red', size: '4pcs, Price', price: 1.99, category: 'Eggs', brand: 'Individual Collection', image: require('./assets/egg_red.png') },
  { id: '2', name: 'Egg Chicken White', size: '180g, Price', price: 1.50, category: 'Eggs', brand: 'Individual Collection', image: require('./assets/egg_white.png') },
  { id: '3', name: 'Egg Pasta', size: '30gm, Price', price: 15.99, category: 'Noodles & Pasta', brand: 'Cocola', image: require('./assets/egg_pasta.png') },
  { id: '4', name: 'Egg Noodles', size: '2L, Price', price: 15.99, category: 'Noodles & Pasta', brand: 'Cocola', image: require('./assets/egg_noodles.png') },
  { id: '5', name: 'Mayonnais Eggless', size: '2L, Price', price: 4.99, category: 'Eggs', brand: 'Ifad', image: require('./assets/mayo.png') },

  // --- Nhóm Đồ uống (Dùng cho màn Favorites) ---
  { id: '6', name: 'Sprite Can', size: '325ml, Price', price: 1.50, category: 'Beverages', brand: 'Coca Cola', isFavorite: true, image: require('./assets/SpriteCan.png') },
  { id: '7', name: 'Diet Coke', size: '355ml, Price', price: 1.99, category: 'Beverages', brand: 'Coca Cola', isFavorite: true, image: require('./assets/DietCoke.png') },
  { id: '8', name: 'Apple & Grape Juice', size: '2L, Price', price: 15.50, category: 'Beverages', brand: 'Naturel', isFavorite: true, image: require('./assets/Applegrape.png') },
  { id: '9', name: 'Coca Cola Can', size: '325ml, Price', price: 4.99, category: 'Beverages', brand: 'Coca Cola', isFavorite: true, image: require('./assets/CocaColaCan.png') },
  { id: '10', name: 'Pepsi Can', size: '330ml, Price', price: 4.99, category: 'Beverages', brand: 'Pepsi', isFavorite: true, image: require('./assets/PepsiCan.png') },

  // --- Nhóm Rau củ (Dùng cho màn Cart) ---
  { id: '11', name: 'Bell Pepper Red', size: '1kg, Price', price: 4.99, category: 'Vegetables', brand: 'Kazi Farmas', inCart: true, cartQty: 1, image: require('./assets/bellpepper.png') },
  { id: '12', name: 'Organic Bananas', size: '12kg, Price', price: 3.00, category: 'Fruits', brand: 'Individual Collection', inCart: true, cartQty: 1, image: require('./assets/banana.jpg') },
  { id: '13', name: 'Ginger', size: '250gm, Price', price: 2.99, category: 'Vegetables', brand: 'Individual Collection', inCart: true, cartQty: 1, image: require('./assets/ginger.png') },
];