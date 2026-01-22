using Microsoft.EntityFrameworkCore;
using ContactApp.Models;

namespace ContactApp.Data
{
    public class ContactDbContext : DbContext
    {
        public ContactDbContext(DbContextOptions<ContactDbContext> options) : base(options)
        {
        }

        public DbSet<ContactModel> Contacts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure ContactModel
            modelBuilder.Entity<ContactModel>()
                .HasKey(c => c.ContactID);

            modelBuilder.Entity<ContactModel>()
                .Property(c => c.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<ContactModel>()
                .Property(c => c.Mobile)
                .IsRequired()
                .HasMaxLength(20);

            modelBuilder.Entity<ContactModel>()
                .Property(c => c.Country)
                .IsRequired()
                .HasMaxLength(100);

            // Add unique constraint on Name
            modelBuilder.Entity<ContactModel>()
                .HasIndex(c => c.Name)
                .IsUnique();
        }
    }
}
