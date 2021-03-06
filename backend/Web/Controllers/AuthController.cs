using Application.Common;
using Application.Common.Hangfire.MediatR;
using Application.User.Common;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SlackAuth.Query.GetAuthUrl;
using SlackAuth.Query.GetUserFromCallback;
using System.Threading;
using System.Threading.Tasks;
using User.Query.CheckCurrentUser;
using Web.Options;

namespace Web.Controllers
{
  public class AuthController : ApiControllerBase
  {
    private readonly RedirectOptions redirectOptions;

    public AuthController(IOptions<RedirectOptions> options)
    {
      redirectOptions = options.Value;
    }

    [HttpPut]
    public async Task<ActionResult<UserDTO>> CheckAuth( CancellationToken cancellationToken) =>
      await Mediator.Send(new CheckCurrentUserQuery {}, cancellationToken);


    [HttpGet("login")]
    public async Task<ActionResult<bool>> Login()
    {
      var url = await Mediator.Send(new GetAuthUrlQuery());

      return Redirect(url);
    }

    [HttpGet("login-callback")]
    public async Task<ActionResult<bool>> LoginCallback([FromQuery] string code, [FromQuery] string state)
    {
      var token = await Mediator.Send(new GetUserFromCallbackQuery {
        Code = code
      });

      return Redirect(redirectOptions.URL + token);
    }

    [HttpGet("app-install")]
    public async Task<ActionResult<bool>> InstallCallback([FromQuery] string code, [FromQuery] string state)
    {
      Mediator.Enqueue(new GetUserFromCallbackQuery {
        Code = code,
        IsInstall = true
      });

      return true;
    }
  }
}
