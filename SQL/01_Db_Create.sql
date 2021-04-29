USE [master]
GO

IF db_id('Holidough') IS NULL
  CREATE DATABASE Holidough
GO

USE [Holidough]
GO

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [UserType];
DROP TABLE IF EXISTS [Item];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Order];
DROP TABLE IF EXISTS [Holiday];
DROP TABLE IF EXISTS [HolidayPickUpDay];
DROP TABLE IF EXISTS [HolidayPickUpTime];
DROP TABLE IF EXISTS [HolidayItems];
DROP TABLE IF EXISTS [PickUpDay];
DROP TABLE IF EXISTS [PickUpTime];
DROP TABLE IF EXISTS [OrderItem];
GO 

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY NOT NULL,
  [Role] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [PhoneNumber] nvarchar(255) NOT NULL,
  [UserTypeId] int NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY NOT NULL,
  [Name] nvarchar(100) NOT NULL,
  [CategoryId] int NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Price] decimal NOT NULL,
  [IsDeleted] bit NOT NULL
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Order] (
  [Id] int PRIMARY KEY NOT NULL,
  [ConfirmationNumber] nvarchar(255) NOT NULL,
  [DatePlaced] datetime NOT NULL,
  [UserId] int NOT NULL,
  [HolidayId] int NOT NULL,
  [PickUpDateTime] datetime NOT NULL,
  [IsPickedUp] bit NOT NULL,
  [IsCanceled] bit NOT NULL
)
GO

CREATE TABLE [Holiday] (
  [Id] int PRIMARY KEY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL,
  [IsAvavilble] bit NOT NULL
)
GO

CREATE TABLE [HolidayPickUpDay] (
  [Id] int PRIMARY KEY NOT NULL,
  [PickUpDayId] int NOT NULL,
  [HolidayId] int NOT NULL
)
GO

CREATE TABLE [HolidayPickUpTime] (
  [Id] int PRIMARY KEY NOT NULL,
  [PickUpTimeId] int NOT NULL,
  [HolidayId] int NOT NULL
)
GO

CREATE TABLE [HolidayItems] (
  [Id] int PRIMARY KEY NOT NULL,
  [ItemId] int NOT NULL,
  [HolidayId] int NOT NULL,
  [IsDeleted] bit NOT NULL
)
GO

CREATE TABLE [PickUpDay] (
  [Id] int PRIMARY KEY NOT NULL,
  [Day] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [PickUpTime] (
  [Id] int PRIMARY KEY NOT NULL,
  [Time] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [OrderItem] (
  [Id] int PRIMARY KEY NOT NULL,
  [OrderId] int NOT NULL,
  [ItemId] int NOT NULL,
  [Quantity] int NOT NULL
)
GO

ALTER TABLE [UserProfile] ADD FOREIGN KEY ([UserTypeId]) REFERENCES [UserType] ([Id])
GO

ALTER TABLE [Order] ADD FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [OrderItem] ADD FOREIGN KEY ([OrderId]) REFERENCES [Order] ([Id])
GO

ALTER TABLE [OrderItem] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [Item] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [Order] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayItems] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayItems] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [HolidayPickUpDay] ADD FOREIGN KEY ([PickUpDayId]) REFERENCES [PickUpDay] ([Id])
GO

ALTER TABLE [HolidayPickUpDay] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayPickUpTime] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayPickUpTime] ADD FOREIGN KEY ([PickUpTimeId]) REFERENCES [PickUpTime] ([Id])
GO
