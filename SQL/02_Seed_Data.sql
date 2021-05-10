USE [Holidough];
GO

set identity_insert [UserType] on
insert into [UserType] ([Id], [Role]) VALUES (1, 'Admin'), (2, 'Customer');
set identity_insert [UserType] off

set identity_insert [Category] on
insert into [Category] ([Id], [Name]) 
values (1, 'Bread'), (2, 'Pastry'), (3, 'Savory'), (4, 'Other')
set identity_insert [Category] off

set identity_insert [Item] on
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (1, 'French Country Sourdough', 1, 'Classic sourdough bread', 5);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (2, 'Baguette', 1, 'Made with sourdough starter', 4);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (3, 'Focaccia', 1, '8" x 11" - sea salt + olive oil flavor', 12);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (4, 'Flora Sourdough', 1, 'Sourdough bread hydrated with lavender, hibiscus + chamomile tea with a touch of honey, and spelt flour.', 5.50);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (5, 'Umami', 1, 'Kombu and shiitake mushrooms | rich umami flavor | wild yeast (vegan)', 6);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (6, 'Hearth Rye', 1, 'Fruity, hearty, soft crumb | made with Carolina Ground rye flour and wild yeast', 5);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (7, 'Oatmeal Sandwich Bread', 1, 'Whole pullman loaf | organic oat porridge |  soft and slightly sweet (contains milk)', 9);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (8, 'Oatmeal Sandwich Bread', 1, 'Whole pullman loaf | approachable tanginess | soft crust (vegan)', 9);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (9, 'Red Quinoa and Sunflower Seed Boule', 1, 'Earthy and nutty | organic whole wheat + white flour | fermented with 100% wild yeast (vegan)', 5.50);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (10, 'Round Braided Challah - Plain', 1, 'Traditional challah, egg washed', 8);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (11, 'Round Braided Challah - Golden Raisin', 1, 'Traditional challah, egg washed', 8);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (12, 'Lemon Lavender Pie', 2, 'Lemon custard topped with a lavender whipped cream', 27);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (13, 'Chocolate Cream Pie', 2, 'Now with a coookie crust!', 32);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (14, 'Rhubarb Orange Pie', 2, 'Seasonal fresh rhubarb with orange zest and a lattice top.', 32);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (15, 'Strawberry Pie', 2, 'Local Rocky Glade Farm strawberries and fresh whipped cream.', 40);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (16, 'Peach Pie', 2, 'The Peach Truck peaches and a lattice top.', 32);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (17, 'Blueberry Chess Pie', 2, 'Browned butter chess pie with local blueberries', 27);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (18, 'Cherry Bourbon Pie', 2, 'Topped with an almond crumble.', 27);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (19, 'Apple Pie', 2, 'A fall favorite!', 30);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (20, 'Pumpkin Pie', 2, 'With a sugar and cinnamon crust.', 30);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (21, 'Butterscotch Pecan Pie', 2, 'Classic pecan pie with a delicious bourbon butterscotch sauce.', 32);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (22, 'Buttermilk Pear Pie', 2, 'Sugar-crusted - similar to a chess pie.', 30);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (23, 'Strawberry Galette', 2, 'Whole strawberry galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (24, 'Peach Galette', 2, 'Whole peach galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (25, 'Blueberry Galette', 2, 'Whole blueberry galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (26, 'Cherry Galette', 2, 'Whole cherry galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (27, 'Apple Galette', 2, 'Whole apple galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (28, 'Cranberry Orange Galette', 2, 'Whole cranberry orange galette with almond frangipane | serves 6 (comes whole, not sliced)', 15);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (29, 'Brown Sugar Shortcakes', 2, '4 pack of classic brown sugar shortcakes', 6.50);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (30, 'Pumpkin Cranberry Loaf - Large', 2, 'Serves 4-5', 10);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (31, 'Pumpkin Cranberry Loaf - Small', 2, 'Serves 2-3', 5);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (32, 'Take and Bake - Chicken Pot Pie', 3, 'Comes frozen. | Bake from frozen and enjoy!', 25);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (33, 'Take and Bake - Vegetable Pot Pie', 3, 'Comes frozen. | Bake from frozen and enjoy!', 23);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (34, 'Sweet + Soured Cranberry Sauce', 3, 'Fermented - Tangy and Sweet / 1 pint', 6);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (35, 'Sourdough Bread Cubes', 3, 'Perfect for dressing - about 12 cups or 2 lbs.', 9);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (36, 'Take and Bake - Green Bean Casserole', 3, 'Just finish at home in the oven', 20);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (37, 'CREMA Coffee Beans', 4, 'Package size : 12oz bag of whole coffee beans | Roasted by CREMA in Nashville, TN.', 18);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (38, 'Potato Rolls', 1, '1 Dozen', 10);
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price]) values (39, 'Sweet Potato Hearth Bread', 1, 'Sweet potatoes and millet.', 6);
set identity_insert [Item] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (1, 'Admin', 'Admin', 'a@a.com', '615-123-4567', 1, 'Wb7P8MB7buU0NLiQUI1gmVYhocm1');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (2, 'Tina', 'TRex', 't@t.com', '615-237-3453', 2, '6CipTzbMpzMJ7HqVhkEdopUQrtQ2');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (3, 'Urb', 'Ultra', 'u@u.com', '345-253-4677', 2, '9psRV93VDGhaE9Z4HaGZ5lif2bs1');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (4, 'Veronica', 'Vix', 'v@v.com', '763-237-3453', 2, 'wxGifoIaP9OlAvFXYkcEZCROvQY2');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (5, 'Xavior', 'Xye', 'x@x.com', '651-253-4677', 2, '6PvRbghmF0YFlz4se9wnbovVHoa2');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (6, 'Wanda', 'Walker', 'w@w.com', '612-253-4677', 2, 'pyuM8QPfWAQumtbtAIiWmBucL412');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (7, 'Yvonne', 'Yesterday', 'y@y.com', '615-891-4567', 2, 'MPQHmVY3CHYgthnGy9t3sfNVAoW2');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (8, 'Zeb', 'Zebra', 'z@z.com', '615-253-4677', 2, 'vseQrvHBa1e8iZELZCcPkoE4k4d2');
set identity_insert [UserProfile] off

set identity_insert [Holiday] on
insert into Holiday (Id, [Name], [Date]) values (1, 'Memorial Day', '2021-05-31');
insert into Holiday (Id, [Name], [Date]) values (2, '4th of July', '2021-07-04');
insert into Holiday (Id, [Name], [Date]) values (3, 'Labor Day', '2021-09-06');
insert into Holiday (Id, [Name], [Date]) values (4, 'Rosh Hashanah', '2021-09-06');
insert into Holiday (Id, [Name], [Date]) values (5, 'Thanksgiving', '2021-11-25');
insert into Holiday (Id, [Name], [Date]) values (6, 'Christmas', '2021-12-25');
set identity_insert [Holiday] off

set identity_insert [PickUpDay] on
insert into PickUpDay (Id, [Day]) values (1, 'Sunday');
insert into PickUpDay (Id, [Day]) values (2, 'Monday');
insert into PickUpDay (Id, [Day]) values (3, 'Tuesday');
insert into PickUpDay (Id, [Day]) values (4, 'Wednesday');
insert into PickUpDay (Id, [Day]) values (5, 'Thursday');
insert into PickUpDay (Id, [Day]) values (6, 'Friday');
insert into PickUpDay (Id, [Day]) values (7, 'Saturday');
set identity_insert [PickUpDay] off

set identity_insert [PickUpTime] on
insert into PickUpTime (Id, [Time]) values (1, '7am - 10am');
insert into PickUpTime (Id, [Time]) values (2, '10am - 12p');
insert into PickUpTime (Id, [Time]) values (3, '12pm - 2pm');
insert into PickUpTime (Id, [Time]) values (4, '2pm - 4pm');
insert into PickUpTime (Id, [Time]) values (5, '4pm - 6pm');
insert into PickUpTime (Id, [Time]) values (6, '6pm - 8pm');
set identity_insert [PickUpTime] off

set identity_insert [HolidayPickUpDay] on
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (1, 1, 1);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (2, 2, 1);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (3, 7, 1);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (4, 1, 2);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (5, 7, 2);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (6, 1, 3);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (7, 2, 3);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (8, 7, 3);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (9, 1, 4);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (10, 2, 4);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (11, 7, 4);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (12, 2, 5);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (13, 3, 5);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (14, 4, 5);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (15, 5, 6);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (16, 6, 6);
set identity_insert [HolidayPickUpDay] off

set identity_insert [HolidayPickUpTime] on
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (1, 1, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (2, 2, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (3, 3, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (4, 4, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (5, 5, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (6, 1, 2);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (7, 2, 2);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (8, 3, 2);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (9, 4, 2);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (10, 5, 2);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (11, 1, 3);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (12, 2, 3);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (13, 3, 3);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (14, 4, 3);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (15, 5, 3);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (16, 1, 4);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (17, 2, 4);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (18, 3, 4);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (19, 4, 4);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (20, 5, 4);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (21, 1, 5);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (22, 2, 5);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (23, 3, 5);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (24, 4, 5);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (25, 5, 5);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (26, 1, 6);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (27, 2, 6);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (28, 3, 6);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (29, 4, 6);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (30, 5, 6);
set identity_insert [HolidayPickUpTime] off

set identity_insert [HolidayItem] on
insert into HolidayItem (Id, ItemId, HolidayId) values (1, 1, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (2, 2, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (3, 3, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (4, 4, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (5, 5, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (6, 6, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (7, 7, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (8, 8, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (9, 9, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (10, 12, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (11, 13, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (12, 14, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (13, 15, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (14, 32, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (15, 33, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (16, 37, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (49, 29, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (17, 1, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (18, 2, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (19, 3, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (20, 4, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (21, 5, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (22, 6, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (23, 7, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (24, 8, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (25, 9, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (26, 12, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (27, 13, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (28, 16, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (29, 17, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (30, 32, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (31, 33, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (32, 37, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (50, 29, 2);
insert into HolidayItem (Id, ItemId, HolidayId) values (33, 1, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (34, 2, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (35, 3, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (36, 4, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (37, 5, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (38, 6, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (39, 7, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (40, 8, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (41, 9, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (42, 12, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (43, 13, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (44, 17, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (45, 18, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (46, 32, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (47, 33, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (48, 37, 3);
insert into HolidayItem (Id, ItemId, HolidayId) values (51, 10, 4);
insert into HolidayItem (Id, ItemId, HolidayId) values (52, 11, 4);
insert into HolidayItem (Id, ItemId, HolidayId) values (53, 1, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (54, 2, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (55, 3, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (56, 4, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (57, 5, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (58, 6, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (59, 7, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (60, 8, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (61, 9, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (62, 13, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (63, 19, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (64, 20, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (65, 21, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (66, 22, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (67, 27, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (68, 28, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (69, 30, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (70, 31, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (71, 32, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (72, 33, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (73, 34, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (74, 35, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (75, 36, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (76, 37, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (77, 38, 5);
insert into HolidayItem (Id, ItemId, HolidayId) values (78, 39, 5);
set identity_insert [HolidayItem] off

set identity_insert [Order] on
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (1, 'koh112012', '2021-05-09', 2, 1, 'Saturday 7am - 10am');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (2, 'koh112013', '2021-05-09', 3, 1, 'Saturday 7am - 10am');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (3, 'koh112014', '2021-05-09', 4, 1, 'Saturday 7am - 10am');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (4, 'koh112015', '2021-05-09', 5, 1, 'Saturday 7am - 10am');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (5, 'koh112016', '2021-05-09', 6, 1, 'Saturday 7am - 10am');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (10, 'koh11201422', '2021-05-09', 4, 2, 'Saturday 10am - 12p');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (11, 'koh11201512', '2021-05-09', 5, 2, 'Saturday 10am - 12p');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (12, 'koh11201313', '2021-05-09', 6, 2, 'Saturday 10am - 12p');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (13, 'koh11201414', '2021-05-09', 7, 2, 'Saturday 10am - 12p');
insert into [Order] (Id, ConfirmationNumber, DatePlaced, UserProfileId, HolidayId, PickUpDateTime) values (14, 'koh11201515', '2021-05-09', 8, 2, 'Saturday 10am - 12p');
set identity_insert [Order] off

set identity_insert [OrderItem] on
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (1, 1, 12, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (2, 1, 1, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (3, 2, 12, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (4, 2, 1, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (5, 3, 12, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (6, 3, 1, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (7, 4, 12, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (8, 4, 1, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (9, 5, 12, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (10, 5, 1, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (11, 10, 16, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (12, 10, 2, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (13, 11, 16, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (14, 11, 2, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (15, 12, 16, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (16, 12, 2, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (17, 13, 16, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (18, 13, 2, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (19, 14, 16, 2);
insert into [OrderItem] (Id, OrderId, ItemId, Quantity) values (20, 14, 2, 2);
set identity_insert [OrderItem] off