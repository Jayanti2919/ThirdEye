## SQL:
### Videos:
```
INSERT INTO videos (videoHash, title, thumbnailHash, uploadDate, genre, tags, description, likeCount, viewCount, commentCount, userId) VALUES
('abc123', 'Awesome Video 1', 'thumb1.jpg', '2024-02-13 10:00:00', 'Action', 'action, adventure, cool', 'Check out this amazing action-packed video!', 100, 1000, 50, 1),
('def456', 'Funny Video 2', 'thumb2.jpg', '2024-02-13 11:30:00', 'Comedy', 'funny, humor, hilarious', 'Laugh out loud with this hilarious comedy video!', 200, 1500, 70, 2),
('ghi789', 'Informative Video 3', 'thumb3.jpg', '2024-02-13 13:45:00', 'Education', 'education, informative, knowledge', 'Learn something new with this informative video!', 150, 800, 30, 3),
('jkl012', 'Exciting Video 4', 'thumb4.jpg', '2024-02-13 15:20:00', 'Adventure', 'adventure, excitement, thrilling', 'Experience the thrill with this exciting adventure video!', 120, 1200, 60, 1),
('mno345', 'Cute Video 5', 'thumb5.jpg', '2024-02-13 16:50:00', 'Family', 'cute, adorable, family-friendly', 'Get ready to say "aww" with this adorable family video!', 80, 900, 40, 2),
('pqr678', 'Music Video 6', 'thumb6.jpg', '2024-02-13 18:15:00', 'Music', 'music, song, rhythm', 'Groove to the beat with this catchy music video!', 250, 2000, 90, 3),
('stu901', 'Action Movie 7', 'thumb7.jpg', '2024-02-13 20:30:00', 'Action', 'action, thriller, intense', 'Experience non-stop action in this thrilling movie!', 180, 1800, 80, 1),
('vwx234', 'Cooking Tutorial 8', 'thumb8.jpg', '2024-02-13 22:00:00', 'Food', 'cooking, tutorial, recipe', 'Learn how to cook delicious dishes with this easy tutorial!', 90, 1000, 45, 2),
('yza567', 'Travel Vlog 9', 'thumb9.jpg', '2024-02-14 00:15:00', 'Travel', 'travel, vlog, adventure', 'Embark on a journey around the world with this exciting travel vlog!', 150, 1500, 70, 3),
('bcd891', 'DIY Crafts 10', 'thumb10.jpg', '2024-02-14 02:45:00', 'Crafts', 'diy, crafts, handmade', 'Get creative with these fun and easy DIY craft ideas!', 120, 1200, 60, 1),
('efg123', 'Gaming Highlights 11', 'thumb11.jpg', '2024-02-14 05:00:00', 'Gaming', 'gaming, highlights, esports', 'Watch epic gaming moments in this action-packed highlights reel!', 220, 2200, 100, 2),
('hij456', 'Fitness Workout 12', 'thumb12.jpg', '2024-02-14 07:30:00', 'Fitness', 'fitness, workout, exercise', 'Get fit and healthy with this intense workout session!', 130, 1300, 65, 3),
('klm789', 'Documentary 13', 'thumb13.jpg', '2024-02-14 09:45:00', 'Documentary', 'documentary, true story, real life', 'Explore real-life stories and events in this captivating documentary!', 170, 1700, 75, 1),
('nop012', 'Pet Videos 14', 'thumb14.jpg', '2024-02-14 11:20:00', 'Pets', 'pets, animals, cute', 'Cuddle up with your furry friends and enjoy these adorable pet videos!', 110, 1100, 55, 2),
('qrs345', 'Science Experiment 15', 'thumb15.jpg', '2024-02-14 13:50:00', 'Science', 'science, experiment, discovery', 'Discover the wonders of science with these mind-blowing experiments!', 190, 1900, 85, 3),
('tuv678', 'Fashion Show 16', 'thumb16.jpg', '2024-02-14 15:55:00', 'Fashion', 'fashion, style, runway', 'Step into the world of fashion with this glamorous runway show!', 140, 1400, 70, 1),
('wxy901', 'Motivational Speech 17', 'thumb17.jpg', '2024-02-14 18:10:00', 'Motivation', 'motivation, inspirational, success', 'Get inspired and motivated with this powerful speech!', 200, 2000, 90, 2),
('zab234', 'Nature Documentary 18', 'thumb18.jpg', '2024-02-14 20:40:00', 'Nature', 'nature, wildlife, environment', 'Immerse yourself in the beauty of nature with this stunning documentary!', 160, 1600, 80, 3),
('bcd567', 'Tech Reviews 19', 'thumb19.jpg', '2024-02-14 22:55:00', 'Technology', 'technology, gadgets, reviews', 'Stay updated on the latest tech trends with these informative reviews!', 120, 1200, 60, 1),
('efg890', 'Art Exhibition 20', 'thumb20.jpg', '2024-02-15 01:15:00', 'Art', 'art, exhibition, creativity', 'Explore the world of art with this captivating exhibition!', 170, 1700, 75, 2),
('hij123', 'Fitness Tips 21', 'thumb21.jpg', '2024-02-15 03:40:00', 'Fitness', 'fitness, tips, healthy living', 'Get expert advice and tips for a healthier lifestyle!', 130, 1300, 65, 3),
('klm456', 'Cooking Challenge 22', 'thumb22.jpg', '2024-02-15 05:55:00', 'Food', 'cooking, challenge, competition', 'Take on the cooking challenge and impress with your culinary skills!', 180, 1800, 85, 1),
('nop789', 'Funny Moments 23', 'thumb23.jpg', '2024-02-15 08:20:00', 'Comedy', 'funny, moments, hilarious', 'Laugh till it hurts with these side-splitting funny moments!', 240, 2400, 110, 2),
('qrs012', 'Science Lecture 24', 'thumb24.jpg', '2024-02-15 10:45:00', 'Science', 'science, lecture, education', 'Expand your knowledge with this insightful science lecture!', 160, 1600, 80, 3),
('tuv345', 'Fashion Trends 25', 'thumb25.jpg', '2024-02-15 12:55:00', 'Fashion', 'fashion, trends, style', 'Stay ahead of the fashion game with these latest trends and styles!', 180, 1800, 90, 1),
('wxy678', 'Motivational Quotes 26', 'thumb26.jpg', '2024-02-15 15:10:00', 'Motivation', 'motivation, quotes, inspiration', 'Find inspiration and motivation with these powerful quotes!', 210, 2100, 100, 2),
('zab901', 'Nature Photography 27', 'thumb27.jpg', '2024-02-15 17:30:00', 'Nature', 'nature, photography, landscapes', 'Capture the beauty of nature with these stunning photography shots!', 140, 1400, 70, 3),
('bcd234', 'Tech News 28', 'thumb28.jpg', '2024-02-15 19:45:00', 'Technology', 'technology, news, updates', 'Stay informed about the latest tech news and updates!', 150, 1500, 75, 1),
('efg567', 'Art Tutorial 29', 'thumb29.jpg', '2024-02-15 21:55:00', 'Art', 'art, tutorial, painting', 'Unlock your creativity with these step-by-step art tutorials!', 190, 1900, 95, 2),
('hij890', 'Fitness Challenge 30', 'thumb30.jpg', '2024-02-16 00:10:00', 'Fitness', 'fitness, challenge, workout', 'Take on the fitness challenge and transform your body!', 140, 1400, 70, 3),
('klm123', 'Cooking Tips 31', 'thumb31.jpg', '2024-02-16 02:30:00', 'Food', 'cooking, tips, tricks', 'Master the art of cooking with these useful tips and tricks!', 170, 1700, 85, 1),
('nop456', 'Funny Pranks 32', 'thumb32.jpg', '2024-02-16 04:45:00', 'Comedy', 'funny, pranks, jokes', 'Get ready to laugh out loud with these hilarious prank videos!', 230, 2300, 105, 2),
('qrs789', 'Science Fiction 33', 'thumb33.jpg', '2024-02-16 07:00:00', 'Science Fiction', 'science fiction, sci-fi, futuristic', 'Explore the unknown with these mind-bending science fiction stories!', 180, 1800, 90, 3),
('tuv012', 'Fashion Tips 34', 'thumb34.jpg', '2024-02-16 09:20:00', 'Fashion', 'fashion, tips, style', 'Stay stylish with these expert fashion tips and advice!', 200, 2000, 100, 1),
('wxy345', 'Motivational Stories 35', 'thumb35.jpg', '2024-02-16 11:40:00', 'Motivation', 'motivation, stories, success', 'Get inspired by real-life success stories and triumphs!', 220, 2200, 110, 2),
('zab678', 'Nature Conservation 36', 'thumb36.jpg', '2024-02-16 14:00:00', 'Nature', 'nature, conservation, environment', 'Join the fight to preserve our planet with these conservation efforts!', 160, 1600, 80, 3),
('bcd901', 'Tech Gadgets 37', 'thumb37.jpg', '2024-02-16 16:20:00', 'Technology', 'technology, gadgets, devices', 'Discover the coolest tech gadgets and devices in the market!', 170, 1700, 85, 1),
('efg234', 'Art Workshop 38', 'thumb38.jpg', '2024-02-16 18:45:00', 'Art', 'art, workshop, creativity', 'Unleash your creativity with these interactive art workshops!', 200, 2000, 100, 2),
('hij567', 'Fitness Motivation 39', 'thumb39.jpg', '2024-02-16 21:10:00', 'Fitness', 'fitness, motivation, goals', 'Stay motivated and crush your fitness goals with these tips!', 180, 1800, 90, 3),
('klm890', 'Cooking Show 40', 'thumb40.jpg', '2024-02-17 00:35:00', 'Food', 'cooking, show, culinary', 'Get ready for some mouth-watering dishes in this cooking show!', 190, 1900, 95, 1),
('nop123', 'Funny Cats Compilation 41', 'thumb41.jpg', '2024-02-17 02:55:00', 'Pets', 'cats, pets, funny', 'Laugh out loud with these hilarious cat videos!', 250, 2500, 120, 2),
('qrs456', 'Science Experiments 42', 'thumb42.jpg', '2024-02-17 05:20:00', 'Science', 'science, experiments, learning', 'Discover the wonders of science through fun and exciting experiments!', 190, 1900, 95, 3),
('tuv789', 'Fashion Lookbook 43', 'thumb43.jpg', '2024-02-17 07:45:00', 'Fashion', 'fashion, lookbook, style', 'Find your perfect style with inspiration from this fashion lookbook!', 210, 2100, 105, 1),
('wxy012', 'Motivational Videos 44', 'thumb44.jpg', '2024-02-17 10:05:00', 'Motivation', 'motivation, videos, inspiration', 'Get motivated and inspired with these uplifting videos!', 230, 2300, 115, 2),
('zab345', 'Nature Photography Tips 45', 'thumb45.jpg', '2024-02-17 12:30:00', 'Nature', 'nature, photography, tips', 'Capture stunning nature shots with these expert photography tips!', 170, 1700, 85, 3),
('bcd678', 'Tech Reviews 46', 'thumb46.jpg', '2024-02-17 14:55:00', 'Technology', 'technology, reviews, gadgets', 'Get in-depth reviews of the latest tech gadgets and devices!', 180, 1800, 90, 1),
('efg901', 'Art Inspiration 47', 'thumb47.jpg', '2024-02-17 17:20:00', 'Art', 'art, inspiration, creativity', 'Find inspiration for your next art project with these creative ideas!', 190, 1900, 95, 2),
('hij234', 'Fitness Challenges 48', 'thumb48.jpg', '2024-02-17 19:45:00', 'Fitness', 'fitness, challenges, workout', 'Challenge yourself and push your limits with these intense fitness challenges!', 200, 2000, 100, 3),
('klm567', 'Cooking Recipes 49', 'thumb49.jpg', '2024-02-17 22:10:00', 'Food', 'cooking, recipes, culinary', 'Cook up a storm in the kitchen with these delicious recipes!', 210, 2100, 105, 1),
('nop890', 'Funny Dog Videos 50', 'thumb50.jpg', '2024-02-18 00:35:00', 'Pets', 'dogs, pets, funny', 'Get ready to laugh with these adorable and hilarious dog videos!', 240, 2400, 115, 2),
('qrs123', 'Science Discoveries 51', 'thumb51.jpg', '2024-02-18 03:00:00', 'Science', 'science, discoveries, innovation', 'Explore groundbreaking scientific discoveries that are shaping the future!', 200, 2000, 100, 3),
('tuv456', 'Fashion Haul 52', 'thumb52.jpg', '2024-02-18 05:25:00', 'Fashion', 'fashion, haul, shopping', 'Discover the latest fashion trends with this exciting clothing haul!', 220, 2200, 110, 1),
('wxy789', 'Motivational Talks 53', 'thumb53.jpg', '2024-02-18 07:50:00', 'Motivation', 'motivation, talks, inspiration', 'Get inspired and motivated with these powerful and uplifting talks!', 240, 2400, 120, 2),
('zab012', 'Nature Walks 54', 'thumb54.jpg', '2024-02-18 10:15:00', 'Nature', 'nature, walks, outdoors', 'Take a walk on the wild side with these breathtaking nature walks!', 180, 1800, 90, 3),
('bcd345', 'Tech Tips 55', 'thumb55.jpg', '2024-02-18 12:40:00', 'Technology', 'technology, tips, tricks', 'Master your gadgets and devices with these handy tech tips!', 190, 1900, 95, 1),
('efg678', 'Art Therapy 56', 'thumb56.jpg', '2024-02-18 15:05:00', 'Art', 'art, therapy, healing', 'Find peace and relaxation through the therapeutic power of art!', 210, 2100, 105, 2),
('hij901', 'Fitness Journey 57', 'thumb57.jpg', '2024-02-18 17:30:00', 'Fitness', 'fitness, journey, transformation', 'Join this inspiring fitness journey and witness amazing transformations!', 220, 2200, 110, 3),
('klm234', 'Cooking Challenges 58', 'thumb58.jpg', '2024-02-18 19:55:00', 'Food', 'cooking, challenges, competition', 'Take on these cooking challenges and test your culinary skills!', 230, 2300, 115, 1),
('nop567', 'Funny Animal Videos 59', 'thumb59.jpg', '2024-02-18 22:20:00', 'Pets', 'animals, pets, funny', 'Laugh out loud with these hilarious animal antics!', 260, 2600, 125, 2),
('qrs890', 'Science Talks 60', 'thumb60.jpg', '2024-02-19 00:45:00', 'Science', 'science, talks, discussion', 'Join the conversation and explore fascinating scientific topics!', 210, 2100, 105, 3),
('tuv123', 'Fashion Trends 61', 'thumb61.jpg', '2024-02-19 03:10:00', 'Fashion', 'fashion, trends, style', 'Stay ahead of the fashion curve with these latest trends!', 230, 2300, 115, 1),
('wxy456', 'Motivational Moments 62', 'thumb62.jpg', '2024-02-19 05:35:00', 'Motivation', 'motivation, moments, inspiration', 'Find motivation in everyday moments with these inspiring videos!', 250, 2500, 125, 2),
('zab789', 'Nature Conservation Tips 63', 'thumb63.jpg', '2024-02-19 07:50:00', 'Nature', 'nature, conservation, tips', 'Learn how you can contribute to nature conservation with these helpful tips!', 190, 1900, 95, 3),
('bcd012', 'Tech Tutorials 64', 'thumb64.jpg', '2024-02-19 10:15:00', 'Technology', 'technology, tutorials, guides', 'Master your gadgets with these easy-to-follow tech tutorials!', 200, 2000, 100, 1),
('efg345', 'Art Showcase 65', 'thumb65.jpg', '2024-02-19 12:40:00', 'Art', 'art, showcase, exhibition', 'Discover talented artists and their stunning works in this art showcase!', 220, 2200, 110, 2),
('hij678', 'Fitness Goals 66', 'thumb66.jpg', '2024-02-19 15:05:00', 'Fitness', 'fitness, goals, achievement', 'Set your fitness goals and crush them with determination and perseverance!', 230, 2300, 115, 3),
('klm901', 'Cooking Tutorial 67', 'thumb67.jpg', '2024-02-19 17:30:00', 'Food', 'cooking, tutorial, recipe', 'Learn how to cook delicious dishes with this easy tutorial!', 210, 2100, 105, 1),
('nop234', 'Funny Moments 68', 'thumb68.jpg', '2024-02-19 19:55:00', 'Comedy', 'funny, moments, hilarious', 'Laugh till it hurts with these side-splitting funny moments!', 270, 2700, 130, 2),
('qrs567', 'Science Experiment 69', 'thumb69.jpg', '2024-02-19 22:20:00', 'Science', 'science, experiment, discovery', 'Discover the wonders of science with these mind-blowing experiments!', 200, 2000, 100, 3),
('tuv890', 'Fashion Show 70', 'thumb70.jpg', '2024-02-20 00:45:00', 'Fashion', 'fashion, style, runway', 'Step into the world of fashion with this glamorous runway show!', 230, 2300, 115, 1),
('wxy123', 'Motivational Speech 71', 'thumb71.jpg', '2024-02-20 03:10:00', 'Motivation', 'motivation, inspirational, success', 'Get inspired and motivated with this powerful speech!', 250, 2500, 125, 2),
('zab456', 'Nature Documentary 72', 'thumb72.jpg', '2024-02-20 05:35:00', 'Nature', 'nature, wildlife, environment', 'Immerse yourself in the beauty of nature with this stunning documentary!', 200, 2000, 100, 3),
('bcd789', 'Tech Reviews 73', 'thumb73.jpg', '2024-02-20 07:50:00', 'Technology', 'technology, gadgets, reviews', 'Stay updated on the latest tech trends with these informative reviews!', 210, 2100, 105, 1),
('efg012', 'Art Exhibition 74', 'thumb74.jpg', '2024-02-20 10:15:00', 'Art', 'art, exhibition, creativity', 'Explore the world of art with this captivating exhibition!', 240, 2400, 120, 2),
('hij345', 'Fitness Tips 75', 'thumb75.jpg', '2024-02-20 12:40:00', 'Fitness', 'fitness, tips, healthy living', 'Get expert advice and tips for a healthier lifestyle!', 240, 2400, 120, 3),
('klm678', 'Cooking Challenge 76', 'thumb76.jpg', '2024-02-20 15:05:00', 'Food', 'cooking, challenge, competition', 'Take on the cooking challenge and impress with your culinary skills!', 250, 2500, 125, 1),
('nop901', 'Funny Pranks 77', 'thumb77.jpg', '2024-02-20 17:30:00', 'Comedy', 'funny, pranks, jokes', 'Get ready to laugh out loud with these hilarious prank videos!', 280, 2800, 135, 2),
('qrs234', 'Science Lecture 78', 'thumb78.jpg', '2024-02-20 19:55:00', 'Science', 'science, lecture, education', 'Expand your knowledge with this insightful science lecture!', 220, 2200, 110, 3),
('tuv567', 'Fashion Trends 79', 'thumb79.jpg', '2024-02-20 22:20:00', 'Fashion', 'fashion, trends, style', 'Stay ahead of the fashion game with these latest trends and styles!', 240, 2400, 120, 1),
('wxy890', 'Motivational Quotes 80', 'thumb80.jpg', '2024-02-21 00:45:00', 'Motivation', 'motivation, quotes, inspiration', 'Find inspiration and motivation with these powerful quotes!', 270, 2700, 135, 2),
('zab123', 'Nature Photography 81', 'thumb81.jpg', '2024-02-21 03:10:00', 'Nature', 'nature, photography, landscapes', 'Capture the beauty of nature with these stunning photography shots!', 220, 2200, 110, 3),
('bcd456', 'Tech News 82', 'thumb82.jpg', '2024-02-21 05:35:00', 'Technology', 'technology, news, updates', 'Stay informed about the latest tech news and updates!', 230, 2300, 115, 1),
('efg789', 'Art Tutorial 83', 'thumb83.jpg', '2024-02-21 07:50:00', 'Art', 'art, tutorial, painting', 'Unlock your creativity with these step-by-step art tutorials!', 250, 2500, 125, 2),
('hij012', 'Fitness Challenge 84', 'thumb84.jpg', '2024-02-21 10:15:00', 'Fitness', 'fitness, challenge, workout', 'Take on the fitness challenge and transform your body!', 220, 2200, 110, 3),
('klm345', 'Cooking Tips 85', 'thumb85.jpg', '2024-02-21 12:40:00', 'Food', 'cooking, tips, tricks', 'Master the art of cooking with these useful tips and tricks!', 240, 2400, 120, 1),
('nop678', 'Funny Moments 86', 'thumb86.jpg', '2024-02-21 15:05:00', 'Comedy', 'funny, moments, hilarious', 'Laugh till it hurts with these side-splitting funny moments!', 290, 2900, 140, 2),
('qrs901', 'Science Experiment 87', 'thumb87.jpg', '2024-02-21 17:30:00', 'Science', 'science, experiment, discovery', 'Discover the wonders of science with these mind-blowing experiments!', 220, 2200, 110, 3),
('tuv234', 'Fashion Tips 88', 'thumb88.jpg', '2024-02-21 19:55:00', 'Fashion', 'fashion, tips, style', 'Stay stylish with these expert fashion tips and advice!', 250, 2500, 125, 1),
('wxy567', 'Motivational Stories 89', 'thumb89.jpg', '2024-02-21 22:20:00', 'Motivation', 'motivation, stories, success', 'Get inspired by real-life success stories and triumphs!', 270, 2700, 135, 2),
('zab890', 'Nature Conservation 90', 'thumb90.jpg', '2024-02-22 00:45:00', 'Nature', 'nature, conservation, environment', 'Join the fight to preserve our planet with these conservation efforts!', 230, 2300, 115, 3),
('bcd123', 'Tech Gadgets 91', 'thumb91.jpg', '2024-02-22 03:10:00', 'Technology', 'technology, gadgets, devices', 'Discover the coolest tech gadgets and devices in the market!', 240, 2400, 120, 1),
('efg456', 'Art Inspiration 92', 'thumb92.jpg', '2024-02-22 05:35:00', 'Art', 'art, inspiration, creativity', 'Find inspiration for your next art project with these creative ideas!', 260, 2600, 130, 2),
('hij789', 'Fitness Challenges 93', 'thumb93.jpg', '2024-02-22 07:50:00', 'Fitness', 'fitness, challenges, workout', 'Challenge yourself and push your limits with these intense fitness challenges!', 270, 2700, 135, 3),
('klm012', 'Cooking Recipes 94', 'thumb94.jpg', '2024-02-22 10:15:00', 'Food', 'cooking, recipes, culinary', 'Cook up a storm in the kitchen with these delicious recipes!', 280, 2800, 140, 1),
('nop345', 'Funny Dog Videos 95', 'thumb95.jpg', '2024-02-22 12:40:00', 'Pets', 'dogs, pets, funny', 'Get ready to laugh with these adorable and hilarious dog videos!', 310, 3100, 150, 2),
('qrs678', 'Science Fiction 96', 'thumb96.jpg', '2024-02-22 15:05:00', 'Science Fiction', 'science fiction, sci-fi, futuristic', 'Explore the unknown with these mind-bending science fiction stories!', 260, 2600, 130, 3),
('tuv901', 'Fashion Tips 97', 'thumb97.jpg', '2024-02-22 17:30:00', 'Fashion', 'fashion, tips, style', 'Stay stylish with these expert fashion tips and advice!', 280, 2800, 140, 1),
('wxy234', 'Motivational Quotes 98', 'thumb98.jpg', '2024-02-22 19:55:00', 'Motivation', 'motivation, quotes, inspiration', 'Find inspiration and motivation with these powerful quotes!', 300, 3000, 150, 2),
('zab567', 'Nature Photography 99', 'thumb99.jpg', '2024-02-22 22:20:00', 'Nature', 'nature, photography, landscapes', 'Capture the beauty of nature with these stunning photography shots!', 240, 2400, 120, 3),
('bcd890', 'Tech Reviews 100', 'thumb100.jpg', '2024-02-23 00:45:00', 'Technology', 'technology, gadgets, reviews', 'Stay updated on the latest tech trends with these informative reviews!', 250, 2500, 125, 1);

```

### Users:
```
INSERT INTO users values(1, 'user1@example.com', 'Channel Name 1', 'Description for channel 1', 150, 'profile1.jpg',0);
INSERT INTO users values(2, 'user2@example.com', 'Channel Name 2', 'Description for channel 2', 100, 'profile2.jpg',0);
INSERT INTO users values(3, 'user3@example.com', 'Channel Name 3', 'Description for channel 3', 10, 'profile3.jpg',0);
```