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
insert into [Item] ([Id], [Name], [CategoryId], [Description], [Price])
values (1, 'French Country Sourdough', 1, 'Classic sourdough bread', 5), (2, 'Baguette', 1, 'Made with sourdough starter', 4), (3, 'Pumpkin Pie', 2, 'Delicious!', 30), (4, 'Apple Galette', 2, 'Freeform pie', 15), (5, 'Cranberry Sauce', 3, 'Fermented - Tangy and Sweet / 1 pint', 6), (6, 'Take and Bake - Green Bean Casserole', 3, 'Just finish at home in the oven', 30) ;
set identity_insert [Item] off

set identity_insert [UserProfile] on
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (1, 'Admin', 'Admin', 'a@a.com', '615-123-4567', 1, 'Wb7P8MB7buU0NLiQUI1gmVYhocm1');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (2, 'Yvonne', 'Yesterday', 'y@y.com', '615-891-4567', 2, 'MPQHmVY3CHYgthnGy9t3sfNVAoW2');
insert into UserProfile (Id, FirstName, LastName, Email, PhoneNumber, UserTypeId, FirebaseUserId) values (3, 'Zeb', 'Zebra', 'z@z.com', '615-253-4677', 2, 'vseQrvHBa1e8iZELZCcPkoE4k4d2');
set identity_insert [UserProfile] off

set identity_insert [Holiday] on
insert into Holiday (Id, [Name], [Date]) values (1, 'Thanksgiving', '2021-11-25');
insert into Holiday (Id, [Name], [Date]) values (2, 'Christmas', '2021-12-25');
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
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (1, 2, 1);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (2, 3, 1);
insert into HolidayPickUpDay (Id, PickUpDayId, HolidayId) values (3, 4, 1);
set identity_insert [HolidayPickUpDay] off

set identity_insert [HolidayPickUpTime] on
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (1, 1, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (2, 2, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (3, 3, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (4, 4, 1);
insert into HolidayPickUpTime (Id, PickUpTimeId, HolidayId) values (5, 5, 1);
set identity_insert [HolidayPickUpTime] off

set identity_insert [HolidayItem] on
insert into HolidayItem (Id, ItemId, HolidayId) values (1, 1, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (2, 2, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (3, 3, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (4, 5, 1);
insert into HolidayItem (Id, ItemId, HolidayId) values (5, 6, 1);
set identity_insert [HolidayItem] off