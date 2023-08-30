using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BE_CRUD_MASCOTA.Models;

public partial class ModelContext : DbContext
{
    public ModelContext()
    {
    }

    public ModelContext(DbContextOptions<ModelContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Mascota> Mascotas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){ }
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//        => optionsBuilder.UseOracle("User Id=JOSAMA;Password=Josueama*2;Data Source=10.1.19.112/DESDB;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("JOSAMA");

        modelBuilder.Entity<Mascota>(entity =>
        {
            entity.HasKey(e => e.Idmascota).HasName("MASCOTAS_PK");

            entity.ToTable("MASCOTAS");

            entity.Property(e => e.Idmascota)
                .ValueGeneratedOnAdd()
                .HasColumnType("NUMBER")
                .HasColumnName("IDMASCOTA");
            entity.Property(e => e.Color)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("COLOR");
            entity.Property(e => e.Edad)
                .HasColumnType("NUMBER")
                .HasColumnName("EDAD");
            entity.Property(e => e.Fechacreacion)
                .HasColumnType("DATE")
                .HasColumnName("FECHACREACION");
            entity.Property(e => e.Nombre)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("NOMBRE");
            entity.Property(e => e.Peso).HasColumnName("PESO");
            entity.Property(e => e.Raza)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("RAZA");
        });
        modelBuilder.HasSequence("MASCOTA_SEQ");

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
