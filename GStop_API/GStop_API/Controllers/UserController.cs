﻿using GStop_API.Data.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GStop_API.Services;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;
using GStop_API.DTOs.UserDTOs;
using GStop.Core.Services.Contacts;

namespace GStop_API.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IUserServices _userServices;
        private readonly ILogger<LoginModel> _logger;
        public UserController(UserManager<ApplicationUser> userManager, IUserServices userServices, ILogger<LoginModel> logger)
        {
            _userManager = userManager;
            _userServices = userServices;
            _logger=logger;
        }
        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDTO userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();
            var user = new ApplicationUser
            {
                Id = Guid.NewGuid(),
                Email = userForRegistration.Email,
                UserName = userForRegistration.UserName,
               
                Money = 0,
            };
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                return HandleErrors(result);
            }

            return StatusCode(201);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> LogUser([FromBody] UserLoginDTO userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();
            var user = await _userServices.GetUserByEmail(userForRegistration.Email);
            if (user == null)
            {
                return NotFound("User not found");
            }
            var passwordIsValid = await _userManager.CheckPasswordAsync(user, userForRegistration.Password);

            if (passwordIsValid)
            {
                var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.UserName),
            // Add other claims as needed
        };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    ExpiresUtc = DateTimeOffset.UtcNow.AddHours(8),

                    // Allow session cookies to be persistent (stored between browser sessions)
                    IsPersistent = true,

                    // Set the cookie path (optional, defaults to '/')
                    RedirectUri = "/",
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);

                // Redirect to a protected resource or return a success response
                return Ok(new { Message = "Login successful" });
            }
            else
            {
                return Unauthorized(new { message = "Invalid login credentials" });
            }

        }
        [HttpPost("Logout")]
        public async Task<IActionResult> LogOutUser()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok(new { Message = "Logout successful" });
        }
        private IActionResult HandleErrors(IdentityResult result)
        {
            var errors = result.Errors.Select(e => e.Description);
            return BadRequest(new { Errors = errors });
        }
    }
}
