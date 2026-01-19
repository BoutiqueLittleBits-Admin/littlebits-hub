"use client";
import { useState } from 'react';
import { useCart } from '../components/CartContext';
import Toast from '../components/Toast';

const products = [
  {
    slug: "teen-woman-valentine-countdown",
    name: "Teen/Woman Valentine Countdown - 14 Days of Joy",
    price: "32.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/46986b/7524183824/il_fullxfull.7524183824_f0xb.jpg",
  },
  {
    slug: "jumbo-friendship-bracelet",
    name: "Jumbo Friendship Bracelet - Custom Made to Order",
    price: "38.50",
    category: "Accessories",
    image: "https://i.etsystatic.com/42012371/r/il/8ce7a4/5888005579/il_fullxfull.5888005579_sm3z.jpg",
  },
  {
    slug: "rainbow-zipper-pencil-cases",
    name: "Rainbow Zipper Pencil Cases - Stylish Organizers",
    price: "8.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/faa7e0/5609801779/il_fullxfull.5609801779_4wud.jpg",
  },
  {
    slug: "kids-valentine-countdown",
    name: "Kids Valentine Countdown - 14 Days of Surprises",
    price: "32.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/0853bc/6597768787/il_fullxfull.6597768787_8nzt.jpg",
  },
  {
    slug: "teen-tween-advent-calendar",
    name: "Teen & Tween Advent Calendar - Holiday Countdown",
    price: "30.00",
    category: "Gift Sets",
    image: "https://i.etsystatic.com/42012371/r/il/aa22bc/7322461668/il_fullxfull.7322461668_1r12.jpg",
  },
  {
    slug: "tubby-time-bag",
    name: "Tubby Time Bag - Bath Fun Kit for Kids",
    price: "15.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/bfde82/5969239582/il_fullxfull.5969239582_ec9c.jpg",
  },
  {
    slug: "pamper-yourself-set",
    name: "Pamper Yourself Set - Ultimate Self-Care Kit",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/182d84/6017238711/il_fullxfull.6017238711_tiha.jpg",
  },
  {
    slug: "going-to-bed-set-small",
    name: "Going To Bed Set - Sweet Dreams Bundle",
    price: "20.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/826ba0/6007312259/il_fullxfull.6007312259_k3pb.jpg",
  },
  {
    slug: "going-to-bed-mini-set",
    name: "Going To Bed Mini Set - Plush, Nightlight & Story",
    price: "15.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/9db06e/6006071655/il_fullxfull.6006071655_kwui.jpg",
  },
  {
    slug: "lovely-lavender-kit",
    name: "Lovely Lavender Spa Kit - Complete Relaxation Set",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/c97ae1/7581594477/il_fullxfull.7581594477_ksfj.jpg",
  },
  {
    slug: "pinktastic-facial-kit",
    name: "PINKtastic Facial Kit - Pink Spa Essentials",
    price: "23.00",
    category: "Spa & Beauty",
    image: "https://i.etsystatic.com/42012371/r/il/352f1d/7581509995/il_fullxfull.7581509995_94kb.jpg",
  },
  {
    slug: "outdoor-play-kit",
    name: "Outdoor Play Kit - Fun-Filled Activities",
    price: "10.00",
    category: "Kids",
    image: "https://i.etsystatic.com/42012371/r/il/ca5ddd/6008383073/il_fullxfull.6008383073_3lf7.jpg",
  },
  {
    slug: "hello-kitty-friends-purse",
    name: "Hello Kitty & Friends Purse wi
