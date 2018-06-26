﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using moody.Models;
using System;

namespace moody.Migrations
{
    [DbContext(typeof(MoodyContext))]
    partial class MoodyContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.0.3-rtm-10026")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("moody.Models.Administrator", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("UserID");

                    b.Property<string>("FirstName")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<string>("LastName")
                        .HasMaxLength(50);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("UserId");

                    b.ToTable("Administrator");
                });

            modelBuilder.Entity("moody.Models.Album", b =>
                {
                    b.Property<int>("AlbumId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("AlbumID");

                    b.Property<string>("AlbumName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime?>("DateReleased")
                        .HasColumnType("datetime");

                    b.Property<string>("Genre")
                        .HasMaxLength(20)
                        .IsUnicode(false);

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.HasKey("AlbumId");

                    b.ToTable("Album");
                });

            modelBuilder.Entity("moody.Models.Artist", b =>
                {
                    b.Property<int>("ArtistCode")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("Band");

                    b.Property<string>("Biography");

                    b.Property<DateTime?>("BirthDate")
                        .HasColumnType("datetime");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Introduce");

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(50);

                    b.Property<int?>("ProducerCode");

                    b.HasKey("ArtistCode");

                    b.ToTable("Artist");
                });

            modelBuilder.Entity("moody.Models.Category", b =>
                {
                    b.Property<int>("TagCode")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("TagCode");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("moody.Models.Member", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("UserID");

                    b.Property<string>("FirstName")
                        .HasMaxLength(50);

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.Property<string>("LastName")
                        .HasMaxLength(50);

                    b.Property<string>("MiddleName")
                        .HasMaxLength(50);

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .IsUnicode(false);

                    b.HasKey("UserId");

                    b.HasIndex("Username")
                        .IsUnique()
                        .HasName("UK_Table_1");

                    b.ToTable("Member");
                });

            modelBuilder.Entity("moody.Models.Playlist", b =>
                {
                    b.Property<int>("SongId")
                        .HasColumnName("SongID");

                    b.Property<int>("UserId")
                        .HasColumnName("UserID");

                    b.HasKey("SongId", "UserId");

                    b.ToTable("Playlist");
                });

            modelBuilder.Entity("moody.Models.Producer", b =>
                {
                    b.Property<int>("ProducerCode")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(100);

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("ProducerCode");

                    b.ToTable("Producer");
                });

            modelBuilder.Entity("moody.Models.Rating", b =>
                {
                    b.Property<int>("UserId")
                        .HasColumnName("UserID");

                    b.Property<int>("SongId")
                        .HasColumnName("SongID");

                    b.Property<double>("Score");

                    b.HasKey("UserId", "SongId");

                    b.ToTable("Rating");
                });

            modelBuilder.Entity("moody.Models.Song", b =>
                {
                    b.Property<int>("SongCode")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AlbumId")
                        .HasColumnName("AlbumID");

                    b.Property<int>("Composer");

                    b.Property<int>("ContributingArtist");

                    b.Property<DateTime?>("DateReleased")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasDefaultValueSql("(((1)/(1))/(1900))");

                    b.Property<DateTime?>("LastModifyAt")
                        .HasColumnType("datetime");

                    b.Property<int?>("LastModifyBy");

                    b.Property<int>("ListeningFrequency")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("((0))");

                    b.Property<string>("Lyric")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("('N/A')");

                    b.Property<double>("Rating")
                        .ValueGeneratedOnAdd()
                        .HasDefaultValueSql("((0))");

                    b.Property<string>("Subtitle")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(50);

                    b.HasKey("SongCode");

                    b.HasIndex("AlbumId");

                    b.ToTable("Song");
                });

            modelBuilder.Entity("moody.Models.Tag", b =>
                {
                    b.Property<int>("TagCode");

                    b.Property<int>("SongCode");

                    b.HasKey("TagCode", "SongCode");

                    b.HasIndex("SongCode");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("moody.Models.Song", b =>
                {
                    b.HasOne("moody.Models.Album")
                        .WithMany("Song")
                        .HasForeignKey("AlbumId");
                });

            modelBuilder.Entity("moody.Models.Tag", b =>
                {
                    b.HasOne("moody.Models.Song")
                        .WithMany("Tag")
                        .HasForeignKey("SongCode")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("moody.Models.Category")
                        .WithMany("Tag")
                        .HasForeignKey("TagCode")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
