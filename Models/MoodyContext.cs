using System; 
using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.Metadata; 

namespace moody.Models {
    public partial class MoodyContext:DbContext {
        public virtual DbSet < Administrator > Administrator {get; set; }
        public virtual DbSet < Album > Album {get; set; }
        public virtual DbSet < Artist > Artist {get; set; }
        public virtual DbSet < Category > Category {get; set; }
        public virtual DbSet < Member > Member {get; set; }
        public virtual DbSet < Playlist > Playlist {get; set; }
        public virtual DbSet < Producer > Producer {get; set; }
        public virtual DbSet < Rating > Rating {get; set; }
        public virtual DbSet < Song > Song {get; set; }
        public virtual DbSet < Tag > Tag {get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            if ( ! optionsBuilder.IsConfigured) {
                optionsBuilder.UseSqlServer(@"Server=localhost;Database=Moody;User ID=sa;Password=123"); 
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity < Administrator > (entity =>  {
                entity.HasKey(e => e.UserId); 

                entity.Property(e => e.UserId).HasColumnName("UserID"); 

                entity.Property(e => e.FirstName).HasMaxLength(50); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.LastName).HasMaxLength(50); 

                entity.Property(e => e.MiddleName).HasMaxLength(50); 

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false); 

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false); 
            }); 

            modelBuilder.Entity < Album > (entity =>  {
                entity.Property(e => e.AlbumId).HasColumnName("AlbumID"); 

                entity.Property(e => e.AlbumName)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.Property(e => e.DateReleased).HasColumnType("datetime"); 

                entity.Property(e => e.Genre)
                    .HasMaxLength(20)
                    .IsUnicode(false); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Album)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Album_Administrator"); 
            }); 

            modelBuilder.Entity < Artist > (entity =>  {
                entity.HasKey(e => e.ArtistCode); 

                entity.Property(e => e.BirthDate).HasColumnType("datetime"); 

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.Property(e => e.MiddleName).HasMaxLength(50); 

                entity.HasOne(d => d.BandNavigation)
                    .WithMany(p => p.InverseBandNavigation)
                    .HasForeignKey(d => d.Band)
                    .HasConstraintName("FK_Artist_Artist"); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Artist)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Artist_Administrator"); 

                entity.HasOne(d => d.ProducerCodeNavigation)
                    .WithMany(p => p.Artist)
                    .HasForeignKey(d => d.ProducerCode)
                    .HasConstraintName("FK_Artist_Producer"); 
            }); 

            modelBuilder.Entity < Category > (entity =>  {
                entity.HasKey(e => e.TagCode); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.TagName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Category)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Category_Administrator"); 
            }); 

            modelBuilder.Entity < Member > (entity =>  {
                entity.HasKey(e => e.UserId); 

                entity.HasIndex(e => e.Username)
                    .HasName("UK_Table_1")
                    .IsUnique(); 

                entity.Property(e => e.UserId).HasColumnName("UserID"); 

                entity.Property(e => e.FirstName).HasMaxLength(50); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.LastName).HasMaxLength(50); 

                entity.Property(e => e.MiddleName).HasMaxLength(50); 

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false); 

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Member)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Member_Administrator"); 
            }); 

            modelBuilder.Entity < Playlist > (entity =>  {
                entity.HasKey(e => new {e.SongId, e.UserId }); 

                entity.Property(e => e.SongId).HasColumnName("SongID"); 

                entity.Property(e => e.UserId).HasColumnName("UserID"); 

                entity.HasOne(d => d.Song)
                    .WithMany(p => p.Playlist)
                    .HasForeignKey(d => d.SongId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Playlist_Song"); 

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Playlist)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Playlist_Member"); 
            }); 

            modelBuilder.Entity < Producer > (entity =>  {
                entity.HasKey(e => e.ProducerCode); 

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasMaxLength(100); 

                entity.Property(e => e.CompanyName)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.Owner)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Producer)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Producer_Administrator"); 
            }); 

            modelBuilder.Entity < Rating > (entity =>  {
                entity.HasKey(e => new {e.UserId, e.SongId }); 

                entity.Property(e => e.UserId).HasColumnName("UserID"); 

                entity.Property(e => e.SongId).HasColumnName("SongID"); 

                entity.HasOne(d => d.Song)
                    .WithMany(p => p.RatingNavigation)
                    .HasForeignKey(d => d.SongId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Song"); 

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Rating)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rating_Member"); 
            }); 

            modelBuilder.Entity < Song > (entity =>  {
                entity.HasKey(e => e.SongCode); 

                entity.Property(e => e.AlbumId).HasColumnName("AlbumID"); 

                entity.Property(e => e.DateReleased)
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(((1)/(1))/(1900))"); 

                entity.Property(e => e.LastModifyAt).HasColumnType("datetime"); 

                entity.Property(e => e.ListeningFrequency).HasDefaultValueSql("((0))"); 

                entity.Property(e => e.Lyric)
                    .IsRequired()
                    .HasDefaultValueSql("('N/A')"); 

                entity.Property(e => e.Rating).HasDefaultValueSql("((0))"); 

                entity.Property(e => e.Subtitle)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50); 

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.Song)
                    .HasForeignKey(d => d.AlbumId)
                    .HasConstraintName("FK_Song_Album"); 

                entity.HasOne(d => d.ComposerNavigation)
                    .WithMany(p => p.SongComposerNavigation)
                    .HasForeignKey(d => d.Composer)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Song_Artist"); 

                entity.HasOne(d => d.ContributingArtistNavigation)
                    .WithMany(p => p.SongContributingArtistNavigation)
                    .HasForeignKey(d => d.ContributingArtist)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Song_Artist1"); 

                entity.HasOne(d => d.LastModifyByNavigation)
                    .WithMany(p => p.Song)
                    .HasForeignKey(d => d.LastModifyBy)
                    .HasConstraintName("FK_Song_Administrator"); 
            }); 

            modelBuilder.Entity < Tag > (entity =>  {
                entity.HasKey(e => new {e.TagCode, e.SongCode }); 

                entity.HasOne(d => d.SongCodeNavigation)
                    .WithMany(p => p.Tag)
                    .HasForeignKey(d => d.SongCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tag_Song"); 

                entity.HasOne(d => d.TagCodeNavigation)
                    .WithMany(p => p.Tag)
                    .HasForeignKey(d => d.TagCode)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Tag_Category"); 
            }); 
        }
    }
}
