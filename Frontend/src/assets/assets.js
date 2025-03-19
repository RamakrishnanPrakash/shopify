import logo from "./logo.png";
import macbook from "./macbook.png";
import macphone from "./macphone.png";
import speaker from "./speaker.png";
import account from "./account.png";
import right_arrow from "./right_arrow.png";
import add_icon from "./add.svg";
import list_icon from "./list.svg";
import order_icon from "./order.svg";
import upload_img from "./upload_area.png";
import add_card_icon from "./add_card.png";
import heard_icon from "./heart.png";

import star_icon from "./star.svg";
import star_dull_icon from "./stardull.svg";
import apple_image from "./apple.jpg";
import headset_image from "./hearedgirl.jpg";
import phone_image from "./phone.jpg";
import right_arrow_light from "./right_arrow_light.png";
import close_icon from "./close-black.png";
import eye_icon from "./eye.png";
import eyeOff_icon from "./eye_off.png";
import pencil_icon from "./pencil.png";
import left_arrow from "./left_arrow.svg";
import card_icon from "./card.png";
import cards_icon from "./cards.png";
import sign_out_icon from "./sign_out.png";
import order_icons from "./order.png";
import add from "./add.png";
import empty_box from "./box.png";
import address_img from "./address.svg";
import check_icon from "./check.png";
import box_icon from "./box.svg";
import right_arrow1 from "./rightArrow.svg";
import CheckOutline from "./CheckOutline.gif";
export const assets = {
  right_arrow1,
  box_icon,
  CheckOutline,
  check_icon,
  empty_box,
  logo,
  account,
  right_arrow,
  add_icon,
  list_icon,
  order_icon,
  upload_img,
  add_card_icon,
  heard_icon,
  star_icon,
  star_dull_icon,
  close_icon,
  right_arrow_light,
  eye_icon,
  eyeOff_icon,
  pencil_icon,
  left_arrow,
  card_icon,
  cards_icon,
  sign_out_icon,
  order_icons,
  add,
  address_img,
};

export const BACKEND_URL = "http://localhost:3000";
export const STRIPE_PUBLIC_KEY =
  "pk_test_51R2tLmClil64PxAZjCSzLLHTCz7ZkTYgsBqSyAA9BjABgcVwCYpqGKV6Prm8w0spOziCJCsMetPvZ1VxK7ooNmoc00qSlSVMk0";
export const imageSliderData = [
  {
    id: 1,
    title: "Experience Pure Sound - Your Perfect Headphones Awaits!",
    offer: "Limited Time Offer 30% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    image: speaker,
  },
  {
    id: 2,
    title: "Power Meets Elegance - Apple MacBook Pro is Here for you!",
    offer: "Exclusive Deal 40% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    image: macbook,
  },

  {
    id: 3,
    title: "Flagship Performance, Stunning Design – Shop iPhone Today!",
    offer: "Exclusive Deal 20% Off",
    buttonText1: "Buy now",
    buttonText2: "Find more",
    image: macphone,
  },
];

export const productsDummyData = [
  {
    _id: "67ba2b86ea97e0cd09e25bcf",
    name: "iPhone 16 Pro Max ",
    description:
      " iPhone 16 Pro Max has a strong and light titanium design with a larger 17.43 cm (6.9″) Super Retina XDR display. It’s remarkably durable with the latest-generation Ceramic Shield material that’s 2x tougher than any smartphone glass.",
    price: "184900",
    offerPrice: "175999",
    categories: "Mobilephone",
    images: [
      "1740254086609-iphone11.png",
      "1740254086610-iphone13.png",
      "1740254086612-iphone12.png",
      "1740254086614-iphone14.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba2c70ea97e0cd09e25bd1",
    name: "Apple iPhone 15 PINK",
    description:
      "DYNAMIC ISLAND COMES TO IPHONE 15 — Dynamic Island bubbles up alerts and Live Activities — so you don’t miss them while you’re doing something else. You can see who’s calling, track your next ride, check your flight status, and so much more.",
    price: "89600",
    offerPrice: "70999",
    categories: "Mobilephone",
    images: [
      "1740254320757-71v2jVh6nIL._SX679_-removebg-preview.png",
      "1740254320759-516IO6TPGIL._SX679_-removebg-preview.png",
      "1740254320762-61f4dTush1L._SX679_-removebg-preview.png",
      "1740254320765-712CBkmhLhL._SX679_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba2d58ea97e0cd09e25bd3",
    name: "iPhone 16 Pro Max 256 GB: 5G Mobile Phone with Camera Control, 4K 120 fps Dolby Vision and a Huge Leap in Battery Life. Works with AirPods; Natural Titanium",
    description:
      " Apple Intelligence is the personal intelligence system that helps you write, express yourself and get things done effortlessly. With groundbreaking privacy protections, it gives you peace of mind that no one else can access your data — not even Apple.",
    price: "144900",
    offerPrice: "135900",
    categories: "Mobilephone",
    images: [
      "1740254551991-iphone1.png",
      "1740254551992-iphone3.png",
      "1740254551995-iphone4.png",
      "1740254551997-iphone2.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba2ef4ea97e0cd09e25bd5",
    name: "OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB Storage)",
    description:
      "Pro-Level Hasselblad Camera System: -Primary 50MP Sony's LYT-808 with OIS - 64 MP 3X Periscope Telephoto for studio-level portraits - 48 MP Ultra-wide 114° Fov\r\nElite, Long-lasting Performance - Qualcomm Snapdragon 8 Gen 3 Mobile Platform - Software-assisted platform for Optimization - Keep apps active for up to 72 hours without reloading - Up to 3 hours of heavy gaming",
    price: "64999",
    offerPrice: "61998",
    categories: "Mobilephone",
    images: [
      "1740254964313-717Qo4MH97L._SY450_-removebg-preview.png",
      "1740254964315-61CEiTA5WWL._SY450_-removebg-preview.png",
      "1740254964318-61AplC-qoML._SY450_-removebg-preview.png",
      "1740254964319-61fVA2RaThL._SY450_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba3054ea97e0cd09e25bd7",
    name: "Samsung Galaxy S25 Ultra 5G AI Smartphone (Titanium Silverblue, 12GB RAM, 256GB Storage), 200MP Camera, S Pen Included, Long Battery Life",
    description:
      "Meet Galaxy S25 Ultra, your true AI companion. Powered by the next chapter of Galaxy AI with multi-modality, and the most advanced Galaxy fundamentals, Galaxy S25 Ultra naturally adapts to you: learning your patterns, anticipating your needs, and connecting your world seamlessly. With Now Brief, it also offers you personalized insights to get you through your day.",
    price: "129999",
    offerPrice: "100000",
    categories: "Mobilephone",
    images: [
      "1740255316940-71P85R392uL._SX679_-removebg-preview.png",
      "1740255316942-71iRY9pUoVL._SX679_-removebg-preview.png",
      "1740255316943-71dtnI25tmL._SX679_-removebg-preview.png",
      "1740255316946-71pfjBJUA7L._SX679_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba3213ea97e0cd09e25bd9",
    name: "Redmi 14C 5G (Starlight Blue, 6GB RAM, 128GB Storage)",
    description:
      "High performance - Snapdragon 4 Gen 2 5G Processor | Large 17.47cm 120Hz Display | Upto 8GB RAM including 6GB Virtual RAM |128GB Storage | Fast Side fingerprint sensor",
    price: "14999",
    offerPrice: "11999",
    categories: "Mobilephone",
    images: [
      "1740255763860-81PjX4nMY5L._SX679_-removebg-preview.png",
      "1740255763862-81Mvb_VYFsL._SX679_-removebg-preview.png",
      "1740255763863-812hXzB1ONL._SX679_-removebg-preview.png",
      "1740255763869-81PjX4nMY5L._SX679_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba33d9ea97e0cd09e25bdb",
    name: "Acer Aspire Lite 13th Gen Intel Core i3-1305U",
    description:
      "Powerful Productivity: Latest 13th Generation Intel Core i3-1305U Processor delivers unmatched speed and intelligence, enabling impressive creating, productivity, and gaming experiences. With Turbo Boost Technology, get up to 4.5GHz for your high-demand applications. Connectivity Technology: Wi-Fi, Bluetooth, HDMI",
    price: "50990",
    offerPrice: "31999",
    categories: "Loptop",
    images: [
      "1740256217689-61fDHkQ6MqL._SX679_-removebg-preview.png",
      "1740256217691-71xcBBdAX9L._SX679_-removebg-preview.png",
      "1740256217692-61Xkk_I8kGL._SX679_-removebg-preview.png",
      "1740256217695-61zDpKrm9KL._SX679_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba3527ea97e0cd09e25bdd",
    name: "HP Victus Windows 11 Home Gaming Laptop",
    description:
      "8-core AMD Ryzen 7 7840HS AI powered】16 threads and 16MB L3 cache allow you to dominate virtual battlefields with fast processing speeds. The updated thermals let you do it all while keeping your cool.;【6GB NVIDIA GeForce RTX 3050 Laptop GPU】Unlock an immersive gaming experience with graphics that deliver AI-accelerated performance, enhanced 3D rendering, and hyper-efficient data processing.",
    price: "101715",
    offerPrice: "78490",
    categories: "Loptop",
    images: [
      "1740256551520-71lZvVXdYcL._SX679_-removebg-preview.png",
      "1740256551522-81GzTnBrNyL._SX679_-removebg-preview.png",
      "1740256551526-71UEGd17soL._SL1500_-removebg-preview.png",
      "1740256551527-711IUL-UmgL._SL1500_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba367bea97e0cd09e25bdf",
    name: "Lenovo ThinkPad E14 AMD Ryzen",
    description:
      "Processor: AMD Ryzen 5 7530U processor | 6 Cores | 12 Threads | Speed Upto 4.5 Ghz | 16 MB L3 Cache | Memory: 8GB DDR4-3200 MHz, dual-channel capable upgradable upto 40GB | Storage: 512GB SSD M.2",
    price: "91966",
    offerPrice: "47990",
    categories: "Loptop",
    images: [
      "1740256891965-518BYF8LHRL._SX679_-removebg-preview.png",
      "1740256891968-51WLBhJJbAL._SX679_-removebg-preview.png",
      "1740256891970-518BYF8LHRL._SX679_-removebg-preview (1).png",
      "1740256891973-71UEGd17soL._SL1500_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba37a5ea97e0cd09e25be1",
    name: "Tribit StormBox 2 Bluetooth Speaker",
    description:
      "Immerse yourself in powerful 360° audio with our Bluetooth wireless speakers, delivering 34W peak power. Equipped with two 48mm full-range drivers, they ensure crystal-clear sound quality.",
    price: "8999",
    offerPrice: "5999",
    categories: "Speaker",
    images: [
      "1740257189525-71BAtx2GfyL._SX679_-removebg-preview.png",
      "1740257189529-71Eb3sheN_L._SX679_-removebg-preview.png",
      "1740257189531-71F4xms603L._SX679_-removebg-preview.png",
      "1740257189532-71BAtx2GfyL._SX679_-removebg-preview.png",
    ],
    __v: 0,
  },
  {
    _id: "67ba38c2ea97e0cd09e25be3",
    name: "Fujifilm X-H2",
    description:
      "Equipped with the newly developed “X-Trans CMOS 5 HR” (*1) sensor to achieve the highest image quality in the history of the “X Series”. 20 Film Simulation modes inside of X-H2 replicate the analog look of the classic photographic film stocks developed by Fujifilm for over 85 years. Reproduce the classic colors and tones that Fujifilm are known for.",
    price: "244999",
    offerPrice: "213000",
    categories: "Camera",
    images: [
      "1740257474040-71ELU_BPBWL._SY450_-removebg-preview.png",
      "1740257474042-81oGDAy0syL._SY450_-removebg-preview.png",
      "1740257474044-71tKWjJVWkL._SY450_-removebg-preview.png",
      "1740257474046-71fMtaW_1YL._SY450_-removebg-preview.png",
    ],
    __v: 0,
  },
];

export const featuredProduct = [
  {
    image: apple_image,
    title: "Power in Every Pixel",
    description: "Shop the latest laptops for work, gaming, and more.",
  },
  {
    image: headset_image,
    title: "Stay Connected",
    description: "Compact and stylish earphones for every occasion.",
  },
  {
    image: phone_image,
    title: "Optimize performens",
    description: "latest Samsung Galaxy for work, gaming, and more.",
  },
];
