const User = require('../models/User');
const Blog = require('../models/Blog');
const bcrypt = require('bcryptjs');

const defaultBlogs = [
  {
    title: "Charminar: The Historic Heart of Hyderabad",
    category: "Historical",
    description: "Built in 1591 by Sultan Muhammad Quli Qutb Shah, the Charminar is the global icon of Hyderabad. This architectural masterpiece features four ornate minarets, grand arches, and a mosque on the top floor. It was constructed to celebrate the end of a deadly plague. The surrounding markets, filled with the aroma of Hyderabadi chai and the shine of Laad Bazaar bangles, offer a sensory journey through centuries of heritage.",
    image: "https://images.unsplash.com/photo-1626125345510-4603468eedfb?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Golconda Fort: Echoes of Diamonds and Acoustics",
    category: "Historical",
    description: "Famous for its acoustic architecture and historical link to the Koh-i-Noor diamond, Golconda Fort is a marvel of medieval engineering. A clap at the dome of the entrance gate can be heard at the hilltop pavilion (Bala Hissar) over a kilometer away. The massive fort complex includes royal palaces, water reservoirs, gardens, and the famous light and sound show that narrates the glory days of the Qutb Shahi rulers.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Ramappa Temple: The UNESCO World Heritage Wonder",
    category: "Temples",
    description: "Inscribed as a UNESCO World Heritage site in 2021, the Ramappa Temple in Palampet stands as a supreme monument to the artistic height of the Kakatiya dynasty. Dedicated to Lord Shiva, it is uniquely named after its sculptor, Ramappa. The temple is celebrated for its floating bricks, star-shaped architecture, and incredibly detailed black basalt carvings depicting mythical creatures, dancers, and musicians.",
    image: "https://images.unsplash.com/photo-1600100397608-f010e527fc18?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Yadadri Temple: Black Granite Marvel on the Hill",
    category: "Temples",
    description: "The sacred hill shrine of Yadadri, dedicated to Lord Lakshmi Narasimha, has been transformed into a massive modern architectural marvel. Built entirely out of black granite stone (krishna shila) following ancient scriptures, the temple showcases exquisite stone carvings, gold-plated domes, and massive pillars. It is a major spiritual center attracting millions of devotees seeking blessings.",
    image: "https://images.unsplash.com/photo-1602631985686-2bb048e36b52?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Kuntala Waterfalls: The Highest Cascade in Telangana",
    category: "Waterfalls",
    description: "Located deep within the dense forests of Adilabad district, Kuntala Waterfalls is the highest waterfall in Telangana, plunging 150 feet over rocky terrains. Formed by the Kadam River, it is surrounded by lush green valleys and offers a refreshing escape for nature lovers. According to local folklore, the waterfalls are named after Shakuntala, who was mesmerized by their beauty.",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bogatha Waterfalls: The Niagara of Telangana",
    category: "Waterfalls",
    description: "Known as the 'Niagara of Telangana', Bogatha Waterfalls in Mulugu district is a breathtaking sight, especially during the monsoon. The waterfall flows wide and strong over a 30-foot drop into a large natural pool, surrounded by thick deciduous forest. It has become a premier destination for trekking, picnics, and swimming, offering a serene connection with nature.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bathukamma: Telangana's Floral Festival of Life",
    category: "Culture & Festivals",
    description: "Bathukamma is a beautiful, nine-day floral festival celebrated during Navratri by the women of Telangana. It honors the relationship between earth, water, and human life. Women arrange seasonal flowers in beautiful concentric, conical stacks resembling a temple tower. They dance around it in circles, singing folk songs that praise nature and womanhood, before immersing the flowers in local lakes.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Bonalu: A Colorful Tribute to the Divine Mother",
    category: "Culture & Festivals",
    description: "Bonalu is a vibrant state festival of Telangana celebrated to thank Goddess Mahakali for fulfilling wishes. Women dress in traditional silk sarees and carry decorated brass or clay pots (Bonam) on their heads, containing rice cooked with milk and sugar as an offering. The festival is marked by energetic drum beats, the fierce dance of the Pothuraju, and grand street processions.",
    image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Hyderabadi Dum Biryani: The Royal Culinary Jewel",
    category: "Food Places",
    description: "A culinary legacy of the Qutb Shahi and Nizam dynasties, Hyderabadi Dum Biryani is a world-renowned dish. It is prepared by slow-cooking (dum) basmati rice and marinated meat with yogurt, saffron, fried onions, and a blend of aromatic spices in a sealed copper pot. Every bite offers a perfect balance of spices, fluffiness, and tenderness that is unmatched in global cuisine.",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "The Telangana Spice Trail: Rustic Local Flavors",
    category: "Food Places",
    description: "Telangana's regional food is distinct and fiery, utilizing local ingredients like tamarind, sesame, peanuts, and red chillies. Signature dishes include Sarva Pindi—a savory flatbread with sesame seeds—and Sakinalu, a traditional deep-fried concentric snack made during Makar Sankranti. From spicy country chicken (Natu Kodi) curry to local toddy-palm delicacies, the state offers a rich culinary heritage.",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80"
  }
];

async function seedDatabase() {
  try {
    const blogCount = await Blog.countDocuments();
    if (blogCount > 0) {
      console.log('ℹ️ Blogs already exist in the database. Skipping seeding.');
      return;
    }

    console.log('🌱 Seeding database with default blogs...');

    // Find or create an admin user to be the author
    let admin = await User.findOne({ role: 'admin' });
    if (!admin) {
      // Find any user
      admin = await User.findOne();
      if (!admin) {
        // Create a default admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        admin = await User.create({
          name: 'Admin User',
          email: 'admin@example.com',
          password: hashedPassword,
          role: 'admin'
        });
        console.log('👤 Created default admin user for seeding:', admin.email);
      }
    }

    // Insert default blogs
    const blogsToInsert = defaultBlogs.map(blog => ({
      ...blog,
      author: admin._id
    }));

    await Blog.insertMany(blogsToInsert);
    console.log(`✅ Successfully seeded ${blogsToInsert.length} default blogs.`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

module.exports = seedDatabase;
