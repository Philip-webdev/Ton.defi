import styled from 'styled-components';
import '../index.css';   
import { useState } from 'react';
import ProductCard from './productCard';
import { Search } from "lucide-react";
import FootNavig from './footnavig';

const StyledApp = styled.div`
  background-color: #F9F9F9;
  color: black;
  margin: 0;
  font-family: Lexend;

  @media (prefers-color-scheme: dark) {
    background-color: rgb(15,15,15);
    color: white;
  }

  min-height: 100vh;
  padding: 20px;
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 3fr)); 
  gap: 20px;
  margin-top: 20px;
`;

function Marketplace() {
  const [clicked, setClick] = useState(false);
  const [cartItems, loadCart] = useState<any>("Loading items");
  const [Id, setId] = useState<string>('');

  const addItems = () => {
    const preExisting = JSON.parse(localStorage.getItem('cartList') || '[]');
    const product = Products.find(p => p.id === Id);
    if (product) {
      preExisting.push(product);
      localStorage.setItem('cartList', JSON.stringify(preExisting));
      loadCart(preExisting);
    }
  };

  const Products = [
    {
      id: '1',
      title: 'Spinach',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/spinachNft.jpg',
      rarity: 'legendary' as const,
      button: { label: 'Add', onClick: () => { setId('1'); addItems(); } }
    },
    {
      id: '2',
      title: 'Tomato',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/spinachNft.jpg',       
      rarity: 'epic' as const,
      button: { label: 'Add', onClick: () => { setId('2'); addItems(); } }
    },
    {
      id: '3',
      title: 'Spinach',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/spinachNft.jpg', 
      rarity: 'rare' as const,
      button: { label: 'Add', onClick: () => { setId('3'); addItems(); } }
    },
    {
      id: '4',
      title: 'Tomato',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/tomatoNft.jpg',
      rarity: 'rare' as const,
      button: { label: 'Add', onClick: () => { setId('4'); addItems(); } }
    },
    {
      id: '5',
      title: 'Rice',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/riceNft.jpg',
      rarity: 'rare' as const,
      button: { label: 'Add', onClick: () => { setId('5'); addItems(); } }
    }
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(Products);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = Products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.creator.toLowerCase().includes(query.toLowerCase()) || 
      item.rarity.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <StyledApp>
      {clicked && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 text-lg font-medium">
              Your cart items: <span>{cartItems.length}</span>
            </p>
          </div>
        </div>
      )}

      <header style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <div className="relative" style={{width:'100%', display: 'flex', borderRadius: '5px', borderWidth: '1px', borderStyle: 'groove', borderColor: 'grey' }}>
          <Search style={{ height: '30px', margin: '6px' }} />
          <input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            style={{ height: '40px', width: 'auto', background: 'transparent', color: 'white', border: 'none' }}
          />
        </div>
      </header>

      <GridWrapper>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </GridWrapper>

      <FootNavig />
    </StyledApp>
  );
}

export default Marketplace;
