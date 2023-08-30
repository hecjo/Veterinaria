using BE_CRUD_MASCOTA.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var cadenaConexion = builder.Configuration.GetConnectionString("defaultConnection");
builder.Services.AddDbContext<ModelContext>(x => x.UseOracle(cadenaConexion, options => options.UseOracleSQLCompatibility("11")));

//Cors
builder.Services.AddCors(options => options.AddPolicy("AllowWebapp",
                          builder => builder.AllowAnyOrigin()
                                             .AllowAnyHeader()
                                             .AllowAnyMethod()));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowWebapp");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
