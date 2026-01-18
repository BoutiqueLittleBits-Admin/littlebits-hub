"use client";
import { useState } from 'react';
import { useCart } from '../../components/CartContext';
import { useParams } from 'next/navigation';
import Toast from '../../components/Toast';

// All Etsy Products with Real Images
const allProducts = [
  {
    slug: "teen-woman-valentine-countdown",
    name: "Teen/Woman Valentine Countdown - 14 Days of Joy",
    price: "32.00",
    category: "Gift Sets",
    description: "Spread the LOVE! The teen or woman in your life will enjoy counting down to Valentine's Day. For 14 days starting February 1st, they will delight in opening a little gift each day. From spa items and beauty products to fun accessories and treats, each day brings a new surprise. Ages 12 and up. Candy-free options available upon request!",
    image: "https://i.etsystatic.com/42012371/r/il/46986b/7524183824/il_fullxfull.7524183824_f0xb.jpg",
  },
  {
    slug: "jumbo-friendship-bracelet",
    name: "Jumbo Friendship Bracelet - Custom Made to Order",
    price: "38.50",
    category: "Accessories",
    description: "Elevate your space with personalized decor! These handcrafted, vibrant oversized bracelets serve as delightful room embellishments and photography props. Perfect for baby photos, school photos, birthdays, classroom displays, and special events. Personalize with up to 15 letters! Made with bright, durable balls/shapes in a variety of fun colors that you choose. Ideal for nursery decor, birthday party props, classroom displays, unique personalized gifts, photo shoots, and party station indicators.",
    image: "https://i.etsystatic.com/42012371/r/il/8ce7a4/5888005579/il_fullxfull.5888005579_sm3z.jpg",
  },
  {
    slug: "rainbow-zipper-pencil-cases",
    name: "Rainbow Zipper Pencil Cases - Stylish Organizers",
    price: "8.00",
    category: "Kids",
    description: "Upgrade your stationery game with our trendy Pencil Cases! Each case features a sleek design and vibrant rainbow zipper, adding a pop of color to your everyday essentials. Perfect for organizing pencils, pens, and small items. Available in black, purple, and green. These pencil cases make fantastic gifts for students, artists, or anyone who loves staying organized with flair!",
    image: "https://i.etsystatic.com/42012371/r/il/faa7e0/5609801779/il_fullxfull.5609801779_4wud.jpg",
  },
  {
    slug: "kids-valentine-countdown",
    name: "Kids Valentine Countdown - 14 Days of Surprises",
    price: "32.00",
    category: "Gift Sets",
    description: "Spread the LOVE! Children ages 3-10 will enjoy counting down to Valentine's Day. For 14 days, kids will delight in opening a little gift each day - toys, novelties, games, and treats customized by age. From Tic Tac Toe and sidewalk chalk to Play-doh and fidget spinners, each day brings excitement! Candy-free options available. Let us know about any allergies at checkout.",
    image: "https://i.etsystatic.com/42012371/r/il/0853bc/6597768787/il_fullxfull.6597768787_8nzt.jpg",
  },
  {
    slug: "teen-tween-advent-calendar",
    name: "Teen & Tween Advent Calendar - Holiday Countdown",
    price: "30.00",
    category: "Gift Sets",
    description: "Celebrate the season with our custom-filled Teen/Tween Girl Advent Calendars! Each box makes every day of December exciting with fun, stylish, and self-care surprises chosen just for her. From beauty products and accessories to fun novelties, each day of the countdown brings joy and anticipation!",
    image: "https://i.etsystatic.com/42012371/r/il/aa22bc/7322461668/il_fullxfull.7322461668_1r12.jpg",
  },
  {
    slug: "tubby-time-bag",
    name: "Tubby Time Bag - Bath Fun Kit for Kids",
    price: "15.00",
    category: "Kids",
    description: "Elevate bath time fun with our Tubby Time Bag! This adorable kit includes everything your child needs for a playful and refreshing bath experience - bath toy, washcloth, toothbrush, cup, and body wash. Make bath time something to look forward to!",
    image: "https://i.etsystatic.com/42012371/r/il/bfde82/5969239582/il_fullxfull.5969239582_ec9c.jpg",
  },
  {
    slug: "pamper-yourself-set",
    name: "Pamper Yourself Set - Ultimate Self-Care Kit",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in well-deserved self-care! This comprehensive beauty kit includes hand cream, cuticle oil, nail polish, nail file, toe separator, and cozy socks. The perfect pampering gift for women who deserve a little relaxation and luxury.",
    image: "https://i.etsystatic.com/42012371/r/il/182d84/6017238711/il_fullxfull.6017238711_tiha.jpg",
  },
  {
    slug: "going-to-bed-set-small",
    name: "Going To Bed Set - Sweet Dreams Bundle",
    price: "20.00",
    category: "Kids",
    description: "Indulge your child's imagination with this enchanting bedtime bundle! Features a charming plush companion, soothing ice cream nightlight, and captivating bedtime story. Perfect for creating magical bedtime routines and helping little ones drift off to dreamland with comfort and joy.",
    image: "https://i.etsystatic.com/42012371/r/il/826ba0/6007312259/il_fullxfull.6007312259_k3pb.jpg",
  },
  {
    slug: "going-to-bed-mini-set",
    name: "Going To Bed Mini Set - Plush, Nightlight & Story",
    price: "15.00",
    category: "Kids",
    description: "Prepare your little one for peaceful sleep with this adorable mini set! Includes a plush lovey, nightlight, and bedtime story - all the essentials for a cozy and comforting bedtime routine. A perfect gift for little ones.",
    image: "https://i.etsystatic.com/42012371/r/il/9db06e/6006071655/il_fullxfull.6006071655_kwui.jpg",
  },
  {
    slug: "lovely-lavender-kit",
    name: "Lovely Lavender Spa Kit - Complete Relaxation Set",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in self-care with our Lovely Lavender Kit! This delightful kit includes lavender caddy, spa headband, scrunchie, small hairbrush, lavender handheld mirror, face mask, lip mask, and eye mask. Everything you need to pamper yourself and relax.",
    image: "https://i.etsystatic.com/42012371/r/il/c97ae1/7581594477/il_fullxfull.7581594477_ksfj.jpg",
  },
  {
    slug: "pinktastic-facial-kit",
    name: "PINKtastic Facial Kit - Pink Spa Essentials",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in self-care with our PINKtastic Facial Kit! Includes pink zipper clear cosmetic bag, headband, wristbands, scrunchie, pink bow compact, face mask, lip mask, and eye mask. Everything you need for a fabulous spa day at home!",
    image: "https://i.etsystatic.com/42012371/r/il/352f1d/7581509995/il_fullxfull.7581509995_94kb.jpg",
  },
  {
    slug: "outdoor-play-kit",
    name: "Outdoor Play Kit - Fun-Filled Activities",
    price: "10.00",
    category: "Kids",
    description: "Encourage outdoor fun with our Outdoor Play Kit! This exciting set includes jump rope, jacks, bubbles, sidewalk chalk, and fun fan. Everything kids need to stay entertained and active in the fresh air. Perfect for sunny days and outdoor adventures!",
    image: "https://i.etsystatic.com/42012371/r/il/ca5ddd/6008383073/il_fullxfull.6008383073_3lf7.jpg",
  },
  {
    slug: "hello-kitty-friends-purse",
    name: "Hello Kitty & Friends Purse with Add-Ons",
    price: "15.00",
    category: "Accessories",
    description: "Upgrade your style with our adorable Sanrio character purses! Perfect for any occasion, this charming purse adds a playful touch to your ensemble. Looking to enhance your purchase? Choose from exclusive add-on fashion sets for extra fun!",
    image: "https://i.etsystatic.com/42012371/r/il/903ed9/5568980902/il_fullxfull.5568980902_l1xl.jpg",
  },
  {
    slug: "sequined-heart-crossbody",
    name: "Sequined Heart Crossbody Bag - Glamorous Sparkle",
    price: "12.00",
    category: "Accessories",
    description: "Indulge in glamour with our Sequined Heart Crossbody Bags! These darling purses are adorned with dazzling sequins, creating a stunning shimmer that exudes elegance. Crafted to steal hearts, our bags are the epitome of style and sophistication.",
    image: "https://i.etsystatic.com/42012371/r/il/6d1238/5629549371/il_fullxfull.5629549371_2gws.jpg",
  },
  {
    slug: "enchanting-unicorn-purse",
    name: "Enchanting Unicorn Purse - Magical Style",
    price: "19.00",
    category: "Accessories",
    description: "Discover the enchantment of our Unicorn Purses! A delightful accessory adding a touch of magic to your style. Available in four mesmerizing colors, these purses are the perfect blend of whimsy and functionality. Add-on sets available!",
    image: "https://i.etsystatic.com/42012371/r/il/f8b196/5788503614/il_fullxfull.5788503614_iyq1.jpg",
  },
  {
    slug: "kitty-cat-purse",
    name: "Adorable Kitty Cat Purse - Crossbody Bag",
    price: "19.00",
    category: "Accessories",
    description: "Our charming Kitty Cat Purse is a purr-fect addition to your wardrobe! Express your feline affection with this adorable accessory available in various colors to suit your style. Add-on options available to enhance your purchase!",
    image: "https://i.etsystatic.com/42012371/r/il/bc4e3d/5808460964/il_fullxfull.5808460964_6za7.jpg",
  },
  {
    slug: "mermaid-tail-coin-keeper",
    name: "Mermaid Tail Coin Keeper - Fun Coin Bag",
    price: "10.00",
    category: "Accessories",
    description: "Magical Mermaid Tails - Dive into savings! This adorable coin bag makes saving fun for kids, adding a fintastic touch to their savings routine. Perfect for little mermaid fans who love sparkle and sea life!",
    image: "https://i.etsystatic.com/42012371/r/il/1af771/5636095195/il_fullxfull.5636095195_4z6l.jpg",
  },
  {
    slug: "sweet-straw-bag",
    name: "Sweet Straw Bag - Darling Crossbody",
    price: "19.00",
    category: "Accessories",
    description: "Indulge in the sweetness of our charming Sweet Straw Bag! This irresistible crossbody features a drawstring closure and delightful design sure to enchant. Optional add-on fillers available to customize your purchase!",
    image: "https://i.etsystatic.com/42012371/r/il/1d5ab8/5620420985/il_fullxfull.5620420985_oax6.jpg",
  },
  {
    slug: "hello-beautiful-spa-set",
    name: "Hello Beautiful Spa Set - Complete Pampering Kit",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in self-care with our Hello Beautiful Spa Set! Includes headband, scrunchie, face mask, lip and eye mask, nails, lotion, and bunny keychain. Everything you need to pamper yourself from head to toe!",
    image: "https://i.etsystatic.com/42012371/r/il/f5fbbb/5959337220/il_fullxfull.5959337220_gmb9.jpg",
  },
  {
    slug: "little-baker-set",
    name: "Little Baker Set - Kids Baking Fun",
    price: "15.99",
    category: "Kids",
    description: "Ignite your child's culinary creativity with the Little Baker set! Watch them don their apron and baker's hat, ready to whip up something scrumptious alongside you. Whether it's a cake, muffin, or cheesecake mix, it's the quality time that counts. Perfect party favor or grandparent's gift!",
    image: "https://i.etsystatic.com/42012371/r/il/72b1c7/5459680443/il_fullxfull.5459680443_cdfx.jpg",
  },
  {
    slug: "water-fun-kit",
    name: "Ultimate Water Fun Kit for Summer",
    price: "10.00",
    category: "Kids",
    description: "Dive into endless aquatic adventures with our Water Fun Kit! Packed with everything for a splashing good time - beach toys, balloons, sunglasses, and more. Endless laughter and cherished memories for the whole family!",
    image: "https://i.etsystatic.com/42012371/r/il/ac7323/5534132300/il_fullxfull.5534132300_pm3t.jpg",
  },
  {
    slug: "bedtime-pack",
    name: "Bedtime Pack for Sweet Dreams",
    price: "10.00",
    category: "Kids",
    description: "Transform bedtime into a magical journey with our enchanting Bedtime Pack! Thoughtfully curated to help your little one drift into dreamland with ease. Includes a book, plush lovey, and nightlight with LED lights.",
    image: "https://i.etsystatic.com/42012371/r/il/16f223/5522916592/il_fullxfull.5522916592_nori.jpg",
  },
  {
    slug: "milkshake-party-favor",
    name: "Fancy Milkshake Party Favor Cup",
    price: "14.00",
    category: "Gift Sets",
    description: "A sweet token for your child's cherished guests! This charming cup is brimming with goodies - small hand cream, nail polish, lip balm, rings, and hair tie. Perfect for birthdays, parties, and Halloween!",
    image: "https://i.etsystatic.com/42012371/r/il/df1828/5397444566/il_fullxfull.5397444566_ahex.jpg",
  },
  {
    slug: "ultimate-spa-kit",
    name: "Ultimate Self-Care Spa Kit for Women",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in well-deserved self-care with our Pamper & Relax kit! Includes sheet face mask, eye mask, lip mask, spa headband, and sleep mask. The perfect pampering gift to relax and rejuvenate!",
    image: "https://i.etsystatic.com/42012371/r/il/cb6dcf/5967458892/il_fullxfull.5967458892_9mk7.jpg",
  },
  {
    slug: "personalized-kids-sunglasses",
    name: "Personalized Kids Sunglasses - Custom Shades",
    price: "12.00",
    category: "Accessories",
    description: "Upgrade your child's sunny style with Personalized Sunnies! These custom shades offer both protection and personality - the perfect accessory for outdoor adventures. Available in multiple colors!",
    image: "https://i.etsystatic.com/42012371/r/il/54ce5d/5855690122/il_fullxfull.5855690122_fng6.jpg",
  },
  {
    slug: "bath-spa-set",
    name: "Bath Spa Set - Complete Relaxation Kit",
    price: "23.00",
    category: "Spa & Beauty",
    description: "Indulge in a luxurious bath experience with our Bath Spa Set! Includes hair turban, makeup removal cloth, loofa, and more. Everything you need to unwind and pamper yourself after a long day.",
    image: "https://i.etsystatic.com/42012371/r/il/3f3061/6007383455/il_fullxfull.6007383455_fd8y.jpg",
  },
  {
    slug: "bunny-bunting-easter",
    name: "Handcrafted Bunny Bunting - Easter Decor",
    price: "20.00",
    category: "Home Decor",
    description: "Welcome spring with our enchanting handmade Bunny Bunting! Perfect for Easter decorations, this unique bunting brings whimsical charm to any space. Ideal for mantles, shelves, or children's rooms.",
    image: "https://i.etsystatic.com/42012371/r/il/3f8c81/5882309683/il_fullxfull.5882309683_cwvi.jpg",
  },
  {
    slug: "christmas-advent-calendar",
    name: "Christmas Countdown Advent Calendar",
    price: "30.00",
    category: "Gift Sets",
    description: "Make the countdown to Christmas magical! Custom-filled advent calendar with toys, novelties, games, and treats customized by age (3-11 years). Available in 12 or 24 day options. Candy-free options available!",
    image: "https://i.etsystatic.com/42012371/r/il/b1f81d/5536624188/il_fullxfull.5536624188_gsez.jpg",
  },
  {
    slug: "sundae-coin-clutch",
    name: "Sundae Coin Clutch with Add-On Options",
    price: "12.00",
    category: "Accessories",
    description: "A sweet addition to your accessory collection! Elevate your style with exclusive add-on options: The Fashionista (earrings, bracelets, rings, hair bow), Little Lady (sunglasses, tissues, scrunchie, lip balm), Note Taker (notebook, pen, hair tie, stickers), or Player (jacks, chalk, UNO, jump rope).",
    image: "https://i.etsystatic.com/42012371/r/il/b19ed0/5767275245/il_fullxfull.5767275245_7min.jpg",
  },
  {
    slug: "shark-coin-pouch",
    name: "Shark Coin Zipper Pouches",
    price: "12.99",
    category: "Accessories",
    description: "Indulge in fabulous shark cuteness! Crafted to dazzle, make a splash with our Shark Zippered Coin Keeper Bags. Embrace the magic of sea life fashion! Perfect for shark lovers of all ages.",
    image: "https://i.etsystatic.com/42012371/r/il/838ac5/6970523894/il_fullxfull.6970523894_a8u7.jpg",
  },
  {
    slug: "little-artist-starter-kit",
    name: "Little Artist Starter Kit - Creative Fun",
    price: "13.50",
    category: "Kids",
    description: "Introduce your child to the world of art with our Little Artist Starter Kit! Includes a colorful kid-friendly apron, watercolor paint set, paintbrush, wooden easel, and mini 4x4 inch canvas. Everything budding artists need to unleash their creativity!",
    image: "https://i.etsystatic.com/42012371/r/il/088acb/6990615820/il_fullxfull.6990615820_7dz0.jpg",
  },
];

export default function ProductPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  
  const product = allProducts.find(p => p.slug === slug);

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-sage mb-4">Product Not Found</h1>
          <a href="/shop" className="text-brand-coral hover:underline">← Back to Shop</a>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="min-h-screen">
      <Toast message="Added to cart!" isVisible={showToast} />
      
      <section className="max-w-6xl mx-auto py-16 px-6">
        <a href="/shop" className="text-brand-sage hover:text-brand-coral transition-colors mb-8 inline-block">
          ← Back to Shop
        </a>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <span className="text-sm font-medium text-brand-sage bg-brand-mint/20 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <h1 className="text-4xl font-bold text-brand-sage mt-4 mb-4">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-brand-coral mb-6">
              ${product.price}
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
            <button 
              onClick={() => handleAddToCart(product)}
              className="w-full md:w-auto bg-brand-sage text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-brand-coral transition-all shadow-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-brand-sage mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 group">
                  <a href={`/shop/${item.slug}`}>
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </a>
                  <div className="p-4">
                    <a href={`/shop/${item.slug}`}>
                      <h3 className="text-sm font-semibold text-brand-sage mb-1 hover:text-brand-coral transition-colors line-clamp-2">{item.name}</h3>
                    </a>
                    <p className="text-md font-bold text-brand-coral mb-3">${item.price}</p>
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-brand-sage text-white py-2 rounded-lg font-semibold hover:bg-brand-coral transition-colors text-xs"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
