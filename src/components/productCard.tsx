
import { Heart, Eye, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  creator: string;
  price: string;
  image: string;
   
  rarity?: 'common' | 'rare' | 'epic' | 'legendary';
}

const ProductCard = ({ title, creator, price, image,    rarity = 'common' }: ProductCardProps) => {
  const rarityColors = {
    common: 'rgba(156, 163, 175, 0.3)',
    rare: 'rgba(59, 130, 246, 0.3)',
    epic: 'rgba(139, 92, 246, 0.3)',
    legendary: 'rgba(245, 158, 11, 0.3)',
  };

  const rarityGradients = {
    common: 'linear-gradient(45deg, #6B7280, #9CA3AF)',
    rare: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
    epic: 'linear-gradient(45deg, #8B5CF6, #A78BFA)',
    legendary: 'linear-gradient(45deg, #F59E0B, #FBBF24)',
  };

  return (
    <div 
      style={{
        background: 'rgba(17, 17, 17, 0.8)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${rarityColors[rarity]}`,
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        margin:'7px'
        
      }}
      className="group hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
    >
      {/* Rarity Badge */}
      <div 
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px', 
          background: rarityGradients[rarity],
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '0.75rem',
          fontWeight: '600',
          color: 'white',
          textTransform: 'uppercase',
          zIndex: 10,
        }}
      >
        {rarity}
      </div>

      {/* Image Container */}
      <div className='' style={{  aspectRatio: '1' }}>
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
          className="group-hover:scale-110"
        />
        
        {/* Overlay on Hover */}
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(6, 182, 212, 0.8))',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="group-hover:opacity-100"
        >
     
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '7px' }}>
        <h3 
          style={{
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: '600',
            marginBottom: '8px',
            lineHeight: '1.4',
          }}
          className="line-clamp-2"
        >
          {title}
        </h3>
        
        <p style={{ color: '#9CA3AF', fontSize: '0.875rem', marginBottom: '16px' }}>
          by {creator}
        </p>

       
          

        {/* Price and Buy Button */}
        <div className="flex items-center justify-between">
          <div>
            <div style={{ color: '#9CA3AF', fontSize: '0.75rem' }}>Current Price</div>
            <div 
              style={{
                background: rarityGradients[rarity],
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontSize: '1.25rem',
                fontWeight: '700',
              }}
            >
              {price} TON
            </div>
          </div>
          
          <button 
            style={{
              background: 'linear-gradient(45deg, #8B5CF6, #06B6D4)',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.875rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            className="hover:shadow-lg hover:shadow-purple-500/30"
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
