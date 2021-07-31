import { Center } from "@chakra-ui/react";
import { ChosenChannelContext } from "components/Common/AppContainer/ChosenChannelContext";
import OurSpinner from "components/Common/OurSpinner";
import RoundInfo from "components/Round/RoundInfo";
import { AuthContext } from "contexts/AuthContext";
import { withAuth } from "hocs/withAuth";
import { useEffectAsync } from "hooks/useEffectAsync";
import { useNSwagClient } from "hooks/useNSwagClient";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import React, { useContext, useState } from "react";
import { ActiveRoundDto, ChannelClient } from "services/backend/nswagts";
import isomorphicEnvSettings from "utils/envSettings";

const IndexPage: NextPage = () => {
  const { activeUser } = useContext(AuthContext);
  const { chosenChannel } = useContext(ChosenChannelContext);
  const { query, replace } = useRouter();

  const [round, setRound] = useState<ActiveRoundDto>(null);

  const { genClient } = useNSwagClient(ChannelClient);
  useEffectAsync(async () => {
    if (!activeUser || !query.channelId) return;

    const channelId = parseInt(query.channelId as string);

    const client = await genClient();
    const result = await client.getActiveRound(channelId);

    if (result == null) {
      replace("/channels/[channelId]/rounds", `/channels/${chosenChannel.id}/rounds`);
      return;
    }

    const envSettings = isomorphicEnvSettings();

    result.groups.forEach(group => {
      (group as any).publicSrc = envSettings.backendUrl + "/images/coffeegroups/" + group.photoUrl;
    });

    setRound(result);
  }, [activeUser, query]);

  return (
    <>
      {round ? (
        <RoundInfo round={round} />
      ) : (
        <Center>
          <OurSpinner />
        </Center>
      )}
    </>
  );
};

export default withAuth(IndexPage);
