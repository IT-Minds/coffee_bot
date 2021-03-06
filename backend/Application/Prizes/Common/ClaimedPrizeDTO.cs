using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Prizes.Common
{
  public class ClaimedPrizeDTO : IAutoMap<ClaimedPrize>
  {
    public int Id {get; set;}
    public System.DateTimeOffset DateClaimed {get; set;}
    public int PointCost {get; set;}
    public bool IsDelivered { get; set; }

    public PrizeIdDTO Prize {get; set;}
  }
}
