using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace moody.Migrations
{
    public partial class EditAlbumTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Administrator",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Available = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: true),
                    LastModifyAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    LastModifyBy = table.Column<int>(nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: true),
                    MiidleName = table.Column<string>(maxLength: 50, nullable: true),
                    Password = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    Username = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Administrator", x => x.UserID);
                    table.ForeignKey(
                        name: "FK_Administrator_Administrator",
                        column: x => x.LastModifyBy,
                        principalTable: "Administrator",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Album",
                columns: table => new
                {
                    AlbumID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CoverLink = table.Column<string>(unicode: false, maxLength: 10, nullable: true),
                    DateReleased = table.Column<DateTime>(type: "datetime", nullable: true),
                    Genre = table.Column<string>(unicode: false, maxLength: 20, nullable: true),
                    Album = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Album", x => x.AlbumID);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    TagCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    TagName = table.Column<string>(unicode: false, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.TagCode);
                });

            migrationBuilder.CreateTable(
                name: "Member",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 50, nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: true),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    Password = table.Column<string>(unicode: false, maxLength: 50, nullable: false),
                    Username = table.Column<string>(unicode: false, maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Member", x => x.UserID);
                });

            migrationBuilder.CreateTable(
                name: "Producer",
                columns: table => new
                {
                    ProducerCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Address = table.Column<string>(maxLength: 100, nullable: false),
                    Available = table.Column<bool>(nullable: false),
                    CompanyName = table.Column<string>(maxLength: 50, nullable: false),
                    LastModifyAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    LastModifyBy = table.Column<int>(nullable: true),
                    Owner = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Producer", x => x.ProducerCode);
                    table.ForeignKey(
                        name: "FK_Producer_Administrator",
                        column: x => x.LastModifyBy,
                        principalTable: "Administrator",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Artist",
                columns: table => new
                {
                    ArtistCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Available = table.Column<bool>(nullable: false),
                    Band = table.Column<int>(nullable: true),
                    Biography = table.Column<string>(maxLength: 500, nullable: true),
                    BirthDate = table.Column<DateTime>(type: "datetime", nullable: true),
                    CoverLink = table.Column<string>(unicode: false, maxLength: 10, nullable: false, defaultValueSql: "('404.png')"),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    Introduce = table.Column<string>(maxLength: 100, nullable: true),
                    LastModifyAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    LastModifyBy = table.Column<int>(nullable: true),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    MiddleName = table.Column<string>(maxLength: 50, nullable: true),
                    ProducerCode = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Artist", x => x.ArtistCode);
                    table.ForeignKey(
                        name: "FK_Artist_Artist",
                        column: x => x.Band,
                        principalTable: "Artist",
                        principalColumn: "ArtistCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Artist_Administrator",
                        column: x => x.LastModifyBy,
                        principalTable: "Administrator",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Artist_Producer",
                        column: x => x.ProducerCode,
                        principalTable: "Producer",
                        principalColumn: "ProducerCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Song",
                columns: table => new
                {
                    SongCode = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AlbumID = table.Column<int>(nullable: true),
                    Available = table.Column<bool>(nullable: false),
                    Composer = table.Column<int>(nullable: false),
                    ContributingArtist = table.Column<int>(nullable: false),
                    CoverLink = table.Column<string>(unicode: false, maxLength: 10, nullable: false, defaultValueSql: "('404.png')"),
                    DateReleased = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(((1)/(1))/(1900))"),
                    LastModifyAt = table.Column<DateTime>(type: "datetime", nullable: true),
                    LastModifyBy = table.Column<int>(nullable: true),
                    Length = table.Column<TimeSpan>(type: "time(0)", nullable: true),
                    ListeningFrequency = table.Column<int>(nullable: false, defaultValueSql: "((0))"),
                    LyricCode = table.Column<string>(unicode: false, maxLength: 20, nullable: false, defaultValueSql: "('N/A')"),
                    Rating = table.Column<double>(nullable: false, defaultValueSql: "((0))"),
                    Subtitle = table.Column<string>(maxLength: 50, nullable: false),
                    Title = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Song", x => x.SongCode);
                    table.ForeignKey(
                        name: "FK_Song_Album",
                        column: x => x.AlbumID,
                        principalTable: "Album",
                        principalColumn: "AlbumID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Song_Artist",
                        column: x => x.Composer,
                        principalTable: "Artist",
                        principalColumn: "ArtistCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Song_Artist1",
                        column: x => x.ContributingArtist,
                        principalTable: "Artist",
                        principalColumn: "ArtistCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Song_Administrator",
                        column: x => x.LastModifyBy,
                        principalTable: "Administrator",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rating",
                columns: table => new
                {
                    UserID = table.Column<int>(nullable: false),
                    SongID = table.Column<int>(nullable: false),
                    Score = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rating", x => new { x.UserID, x.SongID });
                    table.ForeignKey(
                        name: "FK_Rating_Song",
                        column: x => x.SongID,
                        principalTable: "Song",
                        principalColumn: "SongCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rating_Member",
                        column: x => x.UserID,
                        principalTable: "Member",
                        principalColumn: "UserID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    TagCode = table.Column<int>(nullable: false),
                    SongCode = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => new { x.TagCode, x.SongCode });
                    table.ForeignKey(
                        name: "FK_Tag_Song",
                        column: x => x.SongCode,
                        principalTable: "Song",
                        principalColumn: "SongCode",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Tag_Category",
                        column: x => x.TagCode,
                        principalTable: "Category",
                        principalColumn: "TagCode",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Administrator_LastModifyBy",
                table: "Administrator",
                column: "LastModifyBy");

            migrationBuilder.CreateIndex(
                name: "IX_Artist_Band",
                table: "Artist",
                column: "Band");

            migrationBuilder.CreateIndex(
                name: "IX_Artist_LastModifyBy",
                table: "Artist",
                column: "LastModifyBy");

            migrationBuilder.CreateIndex(
                name: "IX_Artist_ProducerCode",
                table: "Artist",
                column: "ProducerCode");

            migrationBuilder.CreateIndex(
                name: "UK_Table_1",
                table: "Member",
                column: "Username",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Producer_LastModifyBy",
                table: "Producer",
                column: "LastModifyBy");

            migrationBuilder.CreateIndex(
                name: "IX_Rating_SongID",
                table: "Rating",
                column: "SongID");

            migrationBuilder.CreateIndex(
                name: "IX_Song_AlbumID",
                table: "Song",
                column: "AlbumID");

            migrationBuilder.CreateIndex(
                name: "IX_Song_Composer",
                table: "Song",
                column: "Composer");

            migrationBuilder.CreateIndex(
                name: "IX_Song_ContributingArtist",
                table: "Song",
                column: "ContributingArtist");

            migrationBuilder.CreateIndex(
                name: "IX_Song_LastModifyBy",
                table: "Song",
                column: "LastModifyBy");

            migrationBuilder.CreateIndex(
                name: "IX_Tag_SongCode",
                table: "Tag",
                column: "SongCode");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rating");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.DropTable(
                name: "Member");

            migrationBuilder.DropTable(
                name: "Song");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Album");

            migrationBuilder.DropTable(
                name: "Artist");

            migrationBuilder.DropTable(
                name: "Producer");

            migrationBuilder.DropTable(
                name: "Administrator");
        }
    }
}
