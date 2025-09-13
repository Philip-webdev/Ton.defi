 import styled from 'styled-components';
import '../index.css';   
import { useState } from 'react';
import ProductCard from './productCard';
import {  Package, Search } from "lucide-react";
import FootNavig from './footnavig';
 
 


const StyledApp = styled.div`
 background-color: #F9F9F9;
  color: black;
  margin:0;
font-family: Lexend;
 
   @media (prefers-color-scheme: dark) {
     background-color: rgb(15,15,15);
     color: white ;
}
  height: 500vh;
  padding: 20px 20px;
`;


  

function marketplace() {
  const [clicked , setClick] = useState(false);
 const [cartItems, loadCart] = useState<any>("Loading items");

    const [Id, setId] = useState<string>('');
const addItems = ()=>{
      const preExisting = JSON.stringify(localStorage.getItem('cartList'));
      const list  = [preExisting];
      const product = Products.find(p => p.id === Id);
      const item = product ? product.title : null;
      const  parseItem = JSON.stringify(item);
         list.push(parseItem);
   
      localStorage.setItem('cartList', JSON.stringify(list));
      console.log(list);
    }
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
      rarity: 'rare'  as const,
      button: { label: 'Add', onClick: () => { setId('3'); addItems(); } }
    },
     {
      id: '4',
      title: 'tomato',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/tomatoNft.jpg',
      rarity: 'rare' as const,
      button: { label: 'Add', onClick: () => { setId('4'); addItems(); } }
    },
     {
      id: '5',
      title: 'Spinach',
      creator: 'CryptoPhil',
      price: '1.8',
      image: '/riceNft.jpg',
      rarity: 'rare' as const,
      button:{ label: 'Add', onClick: () => { setId('5'); addItems(); } }
    }
    ];
 // ADD DATA FROM ADMIN SIDE
// const data = fetch(url, data); 
// a
// Products.push(data);

    

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
          { clicked && ( <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg p-8 text-center flex flex-col items-center">
                      <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
                      <p className="text-gray-700 text-lg font-medium">
                        Your cart items
                        <span>{cartItems}</span>
                      </p>
                    </div>
                  </div>)}
          <header style={{justifyContent:'space-evenly'}}>  
            <div className='relative' style={{display:'flex', borderRadius:'5px', borderWidth:'1px', borderStyle:'groove', borderColor:'grey'}}>
              <Search  style={{ height:'30px', margin:'6px'}}/>
              <input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
               style={{ height: '40px', width: 'auto', background:'transparent', color:'white', border:'none'}}/>
            </div></header> <br/> 
           
  <div style={{}}>
            {filteredProducts.map((product) => (
              
               <ProductCard key={product.id} {...product} />
               
               
            ))}
          </div>  <div><FootNavig/></div>
        </StyledApp>
    );
}
export default marketplace;
