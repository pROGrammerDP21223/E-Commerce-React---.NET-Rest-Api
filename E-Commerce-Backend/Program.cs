using E_Commerce.Interfaces;
using E_Commerce.Repository;
using E_Commerce.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using System.Text;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Enable PII (Personally Identifiable Information) logging for deeper diagnostics
        IdentityModelEventSource.ShowPII = true;

        // Add services to the container.
        builder.Services.AddControllers();

        // Register DbContext
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

        // Register services
        builder.Services.AddScoped<IUser, UserService>();
        builder.Services.AddScoped<IProduct, ProductService>();
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
            {
                policy.WithOrigins("*") // your React app
                      .AllowAnyHeader()
                      .AllowAnyMethod();
            });
        });
        // Get the secret key from configuration
        var jwtKey = builder.Configuration["Jwt:Key"];
        var key = Encoding.ASCII.GetBytes(jwtKey);

        // Add authentication with JWT Bearer token and logging
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true
            };

            // Add detailed debugging events
            options.Events = new JwtBearerEvents
            {
                OnAuthenticationFailed = context =>
                {
                    Console.WriteLine("Authentication failed:");
                    Console.WriteLine($"  Exception: {context.Exception}");
                    return Task.CompletedTask;
                },
                OnTokenValidated = context =>
                {
                    Console.WriteLine("Token validated successfully.");
                    return Task.CompletedTask;
                },
                OnChallenge = context =>
                {
                    Console.WriteLine("JWT Challenge triggered.");
                    Console.WriteLine($"  Error: {context.Error}");
                    Console.WriteLine($"  Description: {context.ErrorDescription}");
                    return Task.CompletedTask;
                },
                OnMessageReceived = context =>
                {
                    Console.WriteLine($"Received JWT token: {context.Token}");
                    return Task.CompletedTask;
                }
            };
        });

        builder.Services.AddAuthorization();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseStaticFiles();
        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseCors();
        app.MapControllers();

        app.Run();
    }
}
