 
import styled from 'styled-components';
import '../index.css';   
import { useState } from 'react';
import ProductCard from './productCard';
import {  Search } from "lucide-react";
import { Input } from './input';
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
  height: 100vh;
  padding: 20px 20px;
`;


  

function marketplace() {
    

    const Products = [
    {
      id: '1',
      title: 'Cosmic Warrior #3847',
      creator: 'PixelMaster',
      price: '2.5',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      
      rarity: 'legendary' as const,
    },
    {
      id: '2',
      title: 'Neon Dreams Collection',
      creator: 'CyberArtist',
      price: '1.8',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
       
      rarity: 'epic' as const,
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
          <header style={{justifyContent:'space-evenly'}}>  
            <div className='relative' style={{display:'flex', borderRadius:'5px', borderWidth:'1px', borderStyle:'groove', borderColor:'white'}}>
              <Search  style={{ height:'30px', margin:'6px'}}/>
              <input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
               style={{ height: '40px', width: 'auto', background:'transparent', color:'white', border:'none'}}/>
            </div></header> <br/>
  <div style={{display:'flex', gap: '20px'}}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>  <div><FootNavig/></div>
        </StyledApp>
    );
}
export default marketplace;
