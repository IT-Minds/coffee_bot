using System;

namespace Application.ChannelSetting.Commands.UpdateChannelPaused
{
  public class UpdateChannelPauseInput
  {
    public int ChannelId { get; set; }
    public bool Paused { get; set; }
    public DateTimeOffset? UnPauseDate { get; set; }
  }
}
