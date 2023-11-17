using GStop_API.Data.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using GStop_API.Services;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;
using GStop_API.DTOs.UserDTOs;
using GStop.Core.Services.Contacts;
using Microsoft.AspNetCore.Cors;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace GStop_API.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("api/accounts")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IUserServices _userServices;
        private readonly ILogger<LoginModel> _logger;
        private readonly IConfiguration _configuration;
        public UserController(UserManager<ApplicationUser> userManager,
            IUserServices userServices, ILogger<LoginModel> logger, 
            SignInManager<ApplicationUser> signInManager,
            IConfiguration configuration)
        {
            _userManager = userManager;
            _userServices = userServices;
            _logger = logger;
            _signInManager = signInManager;
            _configuration = configuration;
        }
        [HttpPost("Registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDTO userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest(ModelState);
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
            var user = await _userManager.FindByEmailAsync(userForRegistration.Email);
            if (user != null && await _userManager.CheckPasswordAsync(user, userForRegistration.Password))
            {
                var userRoles = await _userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var token = GetToken(authClaims);

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
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
        [HttpGet("GetUser")]   
        public async Task<IActionResult> GetCurrentUser()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserName = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            ApplicationUser user = await _userManager.FindByNameAsync(currentUserName);
            return Ok(user);
        }
        private JwtSecurityToken GetToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["JWT:ValidIssuer"],
                audience: _configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddHours(3),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

            return token;
        }
        //FINISH WORK
        //https://www.c-sharpcorner.com/article/jwt-authentication-and-authorization-in-net-6-0-with-identity-framework/

    }
}
