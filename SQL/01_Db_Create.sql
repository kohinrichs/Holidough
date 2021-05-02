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
DROP TABLE IF EXISTS [HolidayItem];
DROP TABLE IF EXISTS [PickUpDay];
DROP TABLE IF EXISTS [PickUpTime];
DROP TABLE IF EXISTS [OrderItem];
GO 

CREATE TABLE [UserType] (
  [Id] int PRIMARY KEY IDENTITY,
  [Role] nvarchar(50) NOT NULL
)
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY,
  [FirstName] nvarchar (50) NOT NULL,
  [LastName] nvarchar (50) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [PhoneNumber] nvarchar(255) NOT NULL,
  [UserTypeId] int NOT NULL

  CONSTRAINT UQ_FirebaseUserId UNIQUE(FirebaseUserId)
)
GO

CREATE TABLE [Item] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(100) NOT NULL,
  [CategoryId] int NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Price] decimal NOT NULL,
  [IsDeleted] bit NOT NULL DEFAULT 0
)
GO

CREATE TABLE [Category] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Order] (
  [Id] int PRIMARY KEY IDENTITY,
  [ConfirmationNumber] nvarchar(255) NOT NULL,
  [DatePlaced] datetime NOT NULL,
  [UserProfileId] int NOT NULL,
  [HolidayId] int NOT NULL,
  [PickUpDateTime] nvarchar(255) NOT NULL,
  [IsPickedUp] bit NOT NULL DEFAULT 0,
  [IsCanceled] bit NOT NULL DEFAULT 0
)
GO

CREATE TABLE [Holiday] (
  [Id] int PRIMARY KEY IDENTITY,
  [Name] nvarchar(255) NOT NULL,
  [Date] datetime NOT NULL,
  [IsAvailable] bit NOT NULL DEFAULT 1
)
GO

CREATE TABLE [HolidayPickUpDay] (
  [Id] int PRIMARY KEY IDENTITY,
  [PickUpDayId] int NOT NULL,
  [HolidayId] int NOT NULL
)
GO

CREATE TABLE [HolidayPickUpTime] (
  [Id] int PRIMARY KEY IDENTITY,
  [PickUpTimeId] int NOT NULL,
  [HolidayId] int NOT NULL
)
GO

CREATE TABLE [HolidayItem] (
  [Id] int PRIMARY KEY IDENTITY,
  [ItemId] int NOT NULL,
  [HolidayId] int NOT NULL,
  [IsDeleted] bit NOT NULL DEFAULT 0
)
GO

CREATE TABLE [PickUpDay] (
  [Id] int PRIMARY KEY IDENTITY,
  [Day] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [PickUpTime] (
  [Id] int PRIMARY KEY IDENTITY,
  [Time] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [OrderItem] (
  [Id] int PRIMARY KEY IDENTITY,
  [OrderId] int NOT NULL,
  [ItemId] int NOT NULL,
  [Quantity] int NOT NULL,
  [IsCanceled] bit NOT NULL DEFAULT 0
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

ALTER TABLE [HolidayItem] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayItem] ADD FOREIGN KEY ([ItemId]) REFERENCES [Item] ([Id])
GO

ALTER TABLE [HolidayPickUpDay] ADD FOREIGN KEY ([PickUpDayId]) REFERENCES [PickUpDay] ([Id])
GO

ALTER TABLE [HolidayPickUpDay] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayPickUpTime] ADD FOREIGN KEY ([HolidayId]) REFERENCES [Holiday] ([Id])
GO

ALTER TABLE [HolidayPickUpTime] ADD FOREIGN KEY ([PickUpTimeId]) REFERENCES [PickUpTime] ([Id])
GO
