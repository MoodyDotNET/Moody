USE [master]
GO
/****** Object:  Database [Moody]    Script Date: 6/20/2018 8:25:53 PM ******/
CREATE DATABASE [Moody]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Moody', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Moody.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Moody_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\Moody_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Moody] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Moody].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Moody] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Moody] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Moody] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Moody] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Moody] SET ARITHABORT OFF 
GO
ALTER DATABASE [Moody] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Moody] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Moody] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Moody] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Moody] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Moody] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Moody] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Moody] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Moody] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Moody] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Moody] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Moody] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Moody] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Moody] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Moody] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Moody] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Moody] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Moody] SET RECOVERY FULL 
GO
ALTER DATABASE [Moody] SET  MULTI_USER 
GO
ALTER DATABASE [Moody] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Moody] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Moody] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Moody] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Moody] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Moody', N'ON'
GO
ALTER DATABASE [Moody] SET QUERY_STORE = OFF
GO
USE [Moody]
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [Moody]
GO
/****** Object:  Table [dbo].[Administrator]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administrator](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[LastModifyAt] [datetime] NULL,
 CONSTRAINT [PK_Administrator] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Album]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Album](
	[AlbumID] [int] IDENTITY(1,1) NOT NULL,
	[AlbumName] [nvarchar](50) NOT NULL,
	[DateReleased] [datetime] NULL,
	[Genre] [varchar](20) NULL,
	[LastModifyAt] [datetime] NULL,
	[LastModifyBy] [int] NULL,
 CONSTRAINT [PK_Album_1] PRIMARY KEY CLUSTERED 
(
	[AlbumID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Artist]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Artist](
	[ArtistCode] [int] IDENTITY(1,1) NOT NULL,
	[Band] [int] NULL,
	[FirstName] [nvarchar](50) NOT NULL,
	[LastName] [nvarchar](50) NOT NULL,
	[MiddleName] [nvarchar](50) NULL,
	[Biography] [nvarchar](max) NULL,
	[BirthDate] [datetime] NULL,
	[Introduce] [nvarchar](max) NULL,
	[ProducerCode] [int] NULL,
	[LastModifyAt] [datetime] NULL,
	[LastModifyBy] [int] NULL,
 CONSTRAINT [PK_Artist] PRIMARY KEY CLUSTERED 
(
	[ArtistCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[TagCode] [int] IDENTITY(1,1) NOT NULL,
	[TagName] [varchar](50) NOT NULL,
	[LastModifyAt] [datetime] NULL,
	[LastModifyBy] [int] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[TagCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Member]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[UserID] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](50) NOT NULL,
	[Password] [varchar](50) NOT NULL,
	[FirstName] [nvarchar](50) NULL,
	[MiddleName] [nvarchar](50) NULL,
	[LastName] [nvarchar](50) NULL,
	[LastModifyBy] [int] NULL,
	[LastModifyAt] [datetime] NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Playlist]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Playlist](
	[SongID] [int] NOT NULL,
	[UserID] [int] NOT NULL,
 CONSTRAINT [PK_Playlist] PRIMARY KEY CLUSTERED 
(
	[SongID] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Producer]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Producer](
	[ProducerCode] [int] IDENTITY(1,1) NOT NULL,
	[CompanyName] [nvarchar](50) NOT NULL,
	[Owner] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](100) NOT NULL,
	[LastModifyAt] [datetime] NULL,
	[LastModifyBy] [int] NULL,
 CONSTRAINT [PK_Producer] PRIMARY KEY CLUSTERED 
(
	[ProducerCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rating]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rating](
	[UserID] [int] NOT NULL,
	[SongID] [int] NOT NULL,
	[Score] [float] NOT NULL,
 CONSTRAINT [PK_Rating] PRIMARY KEY CLUSTERED 
(
	[UserID] ASC,
	[SongID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Song]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Song](
	[SongCode] [int] IDENTITY(1,1) NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Subtitle] [nvarchar](50) NOT NULL,
	[Rating] [float] NOT NULL,
	[ListeningFrequency] [int] NOT NULL,
	[ContributingArtist] [int] NOT NULL,
	[AlbumID] [int] NULL,
	[DateReleased] [datetime] NULL,
	[LastModifyAt] [datetime] NULL,
	[LastModifyBy] [int] NULL,
	[Composer] [int] NOT NULL,
	[Lyric] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Song] PRIMARY KEY CLUSTERED 
(
	[SongCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Tag]    Script Date: 6/20/2018 8:25:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Tag](
	[TagCode] [int] NOT NULL,
	[SongCode] [int] NOT NULL,
 CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED 
(
	[TagCode] ASC,
	[SongCode] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Administrator] ON 

INSERT [dbo].[Administrator] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyAt]) VALUES (5, N'hongphat', N'hongphat', N'Phat', N'Hong', N'Nguyen', CAST(N'2018-06-20T07:10:10.313' AS DateTime))
INSERT [dbo].[Administrator] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyAt]) VALUES (6, N'hoangduong', N'hoangduong', N'Duong', N'Hoang', N'Phan Tran', CAST(N'2018-06-20T07:10:10.313' AS DateTime))
INSERT [dbo].[Administrator] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyAt]) VALUES (7, N'minhnhat', N'minhnhat', N'Nhat', N'Minh', N'Le', CAST(N'2018-06-20T07:10:10.313' AS DateTime))
SET IDENTITY_INSERT [dbo].[Administrator] OFF
SET IDENTITY_INSERT [dbo].[Album] ON 

INSERT [dbo].[Album] ([AlbumID], [AlbumName], [DateReleased], [Genre], [LastModifyAt], [LastModifyBy]) VALUES (1, N'Duong''s Favorite', CAST(N'2018-07-30T17:00:00.000' AS DateTime), N'Mix', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
SET IDENTITY_INSERT [dbo].[Album] OFF
SET IDENTITY_INSERT [dbo].[Artist] ON 

INSERT [dbo].[Artist] ([ArtistCode], [Band], [FirstName], [LastName], [MiddleName], [Biography], [BirthDate], [Introduce], [ProducerCode], [LastModifyAt], [LastModifyBy]) VALUES (3, NULL, N'Jay', N'Chou', N' ', N' ', CAST(N'2018-06-20T07:10:10.313' AS DateTime), N' ', 1, CAST(N'2018-06-20T14:10:58.943' AS DateTime), 6)
INSERT [dbo].[Artist] ([ArtistCode], [Band], [FirstName], [LastName], [MiddleName], [Biography], [BirthDate], [Introduce], [ProducerCode], [LastModifyAt], [LastModifyBy]) VALUES (4, NULL, N'Goose', N'House', N' ', N' ', CAST(N'2018-06-20T07:10:10.313' AS DateTime), N' ', 1, CAST(N'2018-06-20T14:10:58.943' AS DateTime), 6)
INSERT [dbo].[Artist] ([ArtistCode], [Band], [FirstName], [LastName], [MiddleName], [Biography], [BirthDate], [Introduce], [ProducerCode], [LastModifyAt], [LastModifyBy]) VALUES (5, NULL, N'Se7en', N'Eleven', N' ', N'Korea-Japan Artist', CAST(N'2018-06-20T07:10:10.313' AS DateTime), N' Korea-Japan Artist', 1, CAST(N'2018-06-20T14:10:58.943' AS DateTime), 6)
SET IDENTITY_INSERT [dbo].[Artist] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (1, N'Blue', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (2, N'Classical', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (3, N'Rock', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (4, N'Pop', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (5, N'VietNamese', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (6, N'US-UK', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (7, N'Japanese', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (8, N'France', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (9, N'Korea', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (10, N'Traditional', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (11, N'Dance', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (12, N'Remix', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (13, N'Rap', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
INSERT [dbo].[Category] ([TagCode], [TagName], [LastModifyAt], [LastModifyBy]) VALUES (14, N'Hiphop', CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6)
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Member] ON 

INSERT [dbo].[Member] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyBy], [LastModifyAt]) VALUES (1, N'dragneol', N'123', N'Duong', N'Hoang', N'Phan Tran', 6, CAST(N'2018-06-20T07:10:10.313' AS DateTime))
INSERT [dbo].[Member] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyBy], [LastModifyAt]) VALUES (2, N'nguyenhongphat0', N'123', N'Phat', N'Hong', N'Nguyen', 6, CAST(N'2018-06-20T07:10:10.313' AS DateTime))
INSERT [dbo].[Member] ([UserID], [Username], [Password], [FirstName], [MiddleName], [LastName], [LastModifyBy], [LastModifyAt]) VALUES (3, N'leminhnhat', N'123', N'Nhat', N'Minh', N'Le', 6, CAST(N'2018-06-20T07:10:10.313' AS DateTime))
SET IDENTITY_INSERT [dbo].[Member] OFF
INSERT [dbo].[Playlist] ([SongID], [UserID]) VALUES (7, 1)
SET IDENTITY_INSERT [dbo].[Producer] ON 

INSERT [dbo].[Producer] ([ProducerCode], [CompanyName], [Owner], [Address], [LastModifyAt], [LastModifyBy]) VALUES (1, N'DuongProduction', N'Hoang Duong', N'TCH10', NULL, NULL)
SET IDENTITY_INSERT [dbo].[Producer] OFF
INSERT [dbo].[Rating] ([UserID], [SongID], [Score]) VALUES (1, 7, 5)
SET IDENTITY_INSERT [dbo].[Song] ON 

INSERT [dbo].[Song] ([SongCode], [Title], [Subtitle], [Rating], [ListeningFrequency], [ContributingArtist], [AlbumID], [DateReleased], [LastModifyAt], [LastModifyBy], [Composer], [Lyric]) VALUES (7, N'Aitai', N'会いたい', 5, 500, 5, NULL, CAST(N'2018-06-20T07:10:10.313' AS DateTime), CAST(N'2018-06-20T07:10:10.313' AS DateTime), 6, 5, N'1')
SET IDENTITY_INSERT [dbo].[Song] OFF
INSERT [dbo].[Tag] ([TagCode], [SongCode]) VALUES (4, 7)
INSERT [dbo].[Tag] ([TagCode], [SongCode]) VALUES (7, 7)
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK_Table_1]    Script Date: 6/20/2018 8:25:54 PM ******/
ALTER TABLE [dbo].[Member] ADD  CONSTRAINT [UK_Table_1] UNIQUE NONCLUSTERED 
(
	[Username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Song] ADD  CONSTRAINT [DF_Song_Rating]  DEFAULT ((0)) FOR [Rating]
GO
ALTER TABLE [dbo].[Song] ADD  CONSTRAINT [DF_Song_ListeningFrequency]  DEFAULT ((0)) FOR [ListeningFrequency]
GO
ALTER TABLE [dbo].[Song] ADD  CONSTRAINT [DF_Song_DateReleased]  DEFAULT (((1)/(1))/(1900)) FOR [DateReleased]
GO
ALTER TABLE [dbo].[Song] ADD  CONSTRAINT [DF_Song_Lyric]  DEFAULT ('N/A') FOR [Lyric]
GO
ALTER TABLE [dbo].[Album]  WITH CHECK ADD  CONSTRAINT [FK_Album_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Album] CHECK CONSTRAINT [FK_Album_Administrator]
GO
ALTER TABLE [dbo].[Artist]  WITH CHECK ADD  CONSTRAINT [FK_Artist_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Artist] CHECK CONSTRAINT [FK_Artist_Administrator]
GO
ALTER TABLE [dbo].[Artist]  WITH CHECK ADD  CONSTRAINT [FK_Artist_Artist] FOREIGN KEY([Band])
REFERENCES [dbo].[Artist] ([ArtistCode])
GO
ALTER TABLE [dbo].[Artist] CHECK CONSTRAINT [FK_Artist_Artist]
GO
ALTER TABLE [dbo].[Artist]  WITH CHECK ADD  CONSTRAINT [FK_Artist_Producer] FOREIGN KEY([ProducerCode])
REFERENCES [dbo].[Producer] ([ProducerCode])
GO
ALTER TABLE [dbo].[Artist] CHECK CONSTRAINT [FK_Artist_Producer]
GO
ALTER TABLE [dbo].[Category]  WITH CHECK ADD  CONSTRAINT [FK_Category_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Category] CHECK CONSTRAINT [FK_Category_Administrator]
GO
ALTER TABLE [dbo].[Member]  WITH CHECK ADD  CONSTRAINT [FK_Member_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Member] CHECK CONSTRAINT [FK_Member_Administrator]
GO
ALTER TABLE [dbo].[Playlist]  WITH CHECK ADD  CONSTRAINT [FK_Playlist_Member] FOREIGN KEY([UserID])
REFERENCES [dbo].[Member] ([UserID])
GO
ALTER TABLE [dbo].[Playlist] CHECK CONSTRAINT [FK_Playlist_Member]
GO
ALTER TABLE [dbo].[Playlist]  WITH CHECK ADD  CONSTRAINT [FK_Playlist_Song] FOREIGN KEY([SongID])
REFERENCES [dbo].[Song] ([SongCode])
GO
ALTER TABLE [dbo].[Playlist] CHECK CONSTRAINT [FK_Playlist_Song]
GO
ALTER TABLE [dbo].[Producer]  WITH CHECK ADD  CONSTRAINT [FK_Producer_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Producer] CHECK CONSTRAINT [FK_Producer_Administrator]
GO
ALTER TABLE [dbo].[Rating]  WITH CHECK ADD  CONSTRAINT [FK_Rating_Member] FOREIGN KEY([UserID])
REFERENCES [dbo].[Member] ([UserID])
GO
ALTER TABLE [dbo].[Rating] CHECK CONSTRAINT [FK_Rating_Member]
GO
ALTER TABLE [dbo].[Rating]  WITH CHECK ADD  CONSTRAINT [FK_Rating_Song] FOREIGN KEY([SongID])
REFERENCES [dbo].[Song] ([SongCode])
GO
ALTER TABLE [dbo].[Rating] CHECK CONSTRAINT [FK_Rating_Song]
GO
ALTER TABLE [dbo].[Song]  WITH CHECK ADD  CONSTRAINT [FK_Song_Administrator] FOREIGN KEY([LastModifyBy])
REFERENCES [dbo].[Administrator] ([UserID])
GO
ALTER TABLE [dbo].[Song] CHECK CONSTRAINT [FK_Song_Administrator]
GO
ALTER TABLE [dbo].[Song]  WITH CHECK ADD  CONSTRAINT [FK_Song_Album] FOREIGN KEY([AlbumID])
REFERENCES [dbo].[Album] ([AlbumID])
GO
ALTER TABLE [dbo].[Song] CHECK CONSTRAINT [FK_Song_Album]
GO
ALTER TABLE [dbo].[Song]  WITH CHECK ADD  CONSTRAINT [FK_Song_Artist] FOREIGN KEY([Composer])
REFERENCES [dbo].[Artist] ([ArtistCode])
GO
ALTER TABLE [dbo].[Song] CHECK CONSTRAINT [FK_Song_Artist]
GO
ALTER TABLE [dbo].[Song]  WITH CHECK ADD  CONSTRAINT [FK_Song_Artist1] FOREIGN KEY([ContributingArtist])
REFERENCES [dbo].[Artist] ([ArtistCode])
GO
ALTER TABLE [dbo].[Song] CHECK CONSTRAINT [FK_Song_Artist1]
GO
ALTER TABLE [dbo].[Tag]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Category] FOREIGN KEY([TagCode])
REFERENCES [dbo].[Category] ([TagCode])
GO
ALTER TABLE [dbo].[Tag] CHECK CONSTRAINT [FK_Tag_Category]
GO
ALTER TABLE [dbo].[Tag]  WITH CHECK ADD  CONSTRAINT [FK_Tag_Song] FOREIGN KEY([SongCode])
REFERENCES [dbo].[Song] ([SongCode])
GO
ALTER TABLE [dbo].[Tag] CHECK CONSTRAINT [FK_Tag_Song]
GO
USE [master]
GO
ALTER DATABASE [Moody] SET  READ_WRITE 
GO
