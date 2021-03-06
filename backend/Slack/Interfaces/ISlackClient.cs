using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Slack.DTO;
using SlackNet.WebApi;

namespace Slack.Interfaces
{
  public interface ISlackClient
  {

    SlackNet.ISlackApiClient Client();

    Task<IEnumerable<Conversation>> GetAllMyChannels(CancellationToken cancellationToken);

    Task<SlackThread> SendMessageInThread(CancellationToken cancellationToken, Conversation conversation, string text, SlackThread thread);

    Task<SlackThread> SendMessageToChannel(CancellationToken cancellationToken, Message message);
    Task<SlackThread> SendMessageToChannel(CancellationToken cancellationToken, string conversationId, string text);

    Task<SlackThread> SendPrivateMessageToMembers(CancellationToken cancellationToken, IEnumerable<string> memberIds, string text);
    Task<SlackThread> SendPrivateMessageToMembers(CancellationToken cancellationToken, IEnumerable<string> memberIds, Message message);

    Task<bool> UpdateMessage(string channelId, string msgTsToUpdate, CancellationToken cancellationToken);
    Task<List<SlackNet.User>> GetUsers(IEnumerable<string> userIds, CancellationToken cancellationToken);

  }
}
