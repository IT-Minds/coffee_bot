using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Linq;
using Application.Common.Security;
using Application.Rounds.DTO;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Rounds.GetChannelRounds
{
  [AuthorizeAttribute]
  public class GetChannelRoundsQuery : IRequest<IEnumerable<RoundSnipDto>>
  {
    public int ChannelId { get; set; }

    public class GetChannelRoundsQueryHandler : IRequestHandler<GetChannelRoundsQuery, IEnumerable<RoundSnipDto>>
    {
      private readonly IApplicationDbContext applicationDbContext;
      private readonly IMapper mapper;

      public GetChannelRoundsQueryHandler(IApplicationDbContext applicationDbContext, IMapper mapper)
      {
        this.applicationDbContext = applicationDbContext;
        this.mapper = mapper;
      }

      public async Task<IEnumerable<RoundSnipDto>> Handle(GetChannelRoundsQuery request, CancellationToken cancellationToken)
      {
        var rounds = await applicationDbContext.CoffeeRounds
          .Include(x => x.CoffeeRoundGroups)
          .Where(x => x.ChannelId == request.ChannelId)
          .ToListAsync();

        return rounds.Select(round => mapper.Map<RoundSnipDto>(round));
      }
    }
  }
}
