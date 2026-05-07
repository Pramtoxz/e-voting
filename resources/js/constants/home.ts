export const BATIK_PATTERN_URL =
    'https://img.freepik.com/free-vector/white-organic-lines-seamless-pattern-brown-background_1409-4450.jpg?t=st=1745350003~exp=1745353603~hmac=9136d2f2846337b3ff161fd1128332e04d74e31db2eb4ca1a246022b4194f730&w=996';

export const GARUDA_URL = 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Garuda_Pancasila%2C_Coat_of_Arms_of_Indonesia.svg';

export const TYPING_TEXT_ARRAY = ['Created By....', 'Rafi Chandra', 'Pramudito Metra', 'Follow Us On Instagram.....', '@chandra_rafi', '@pramuditometra'];

export const HOME_STYLES = `
@keyframes floating {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.garuda-float {
  animation: floating 3s ease-in-out infinite;
}

@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 20s linear infinite;
}

.animate-marquee2 {
  animation: marquee 100s linear infinite;
  animation-delay: 20s;
}

.marquee-item {
  transition: all 0.3s ease;
}

.marquee-item:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  z-index: 10;
}
`;
