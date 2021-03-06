import {
  Box,
  Container,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import { BiShieldQuarter } from "@react-icons/all-files/bi/BiShieldQuarter";
import { DividerWithText } from "components/Common/DividerWIthText";
import { useEffectAsync } from "hooks/useEffectAsync";
import { useNSwagClient } from "hooks/useNSwagClient";
import React, { FC, useState } from "react";
import { ChannelClient, ChannelMemberDTO } from "services/backend/nswagts";
import { logger } from "utils/logger";

import ChannelListItem from "./ChannelListItem";
import NewChannelButton from "./NewChannelButton";
import NotMemberChannelsList from "./NotMemberChannels/NotMemberChannelsList";

const ChannelList: FC = () => {
  const [channels, setChannels] = useState<ChannelMemberDTO[]>([]);

  const { genClient } = useNSwagClient(ChannelClient);

  useEffectAsync(async () => {
    try {
      const client = await genClient();
      const data = await client.getMyChannelMemberships();
      if (data && data.length >= 0) {
        setChannels(data);
      } else logger.info("ChannelClient.getMyChannels got no data");
    } catch (err) {
      logger.warn("ChannelClient.getMyChannels Error", err);
    }
  }, []);

  return (
    <Container maxW="4xl">
      <Heading size="lg" textAlign="center">
        Buddy Channels!
      </Heading>
      <Box p={8} mt={8} bgColor={useColorModeValue("gray.200", "gray.700")} borderRadius={24}>
        <Text>
          Welcome to your Coffee Buddies home away from home. Here you will find the channels
          available for you to join or should you be daring type where you get to create a new one!
          <br />
          Once you are in, your active channels hold:
        </Text>
        <List>
          <ListItem>
            <ListIcon color="blue.500" as={BiShieldQuarter} />
            An overview of all the rounds present and past.
          </ListItem>
          <ListItem>
            <ListIcon color="blue.500" as={BiShieldQuarter} />A gallery of all the important
            beautiful selfies everyone has shared.
          </ListItem>
          <ListItem>
            <ListIcon color="blue.500" as={BiShieldQuarter} />
            Most importantly, the prizes!
          </ListItem>
        </List>
        <DividerWithText m={1}>Your memberships</DividerWithText>
        <Flex direction="column" style={{ gap: "0.5rem" }}>
          {channels.map(channel => (
            <ChannelListItem key={channel.id} membership={channel} />
          ))}
        </Flex>
        <DividerWithText m={1}>Other open channels in your organization</DividerWithText>
        <Flex direction="column">
          <Text as="i">
            Click to join isn&apos;t implemented yet - use Slack to join any of these channels.
          </Text>
          <NotMemberChannelsList />
        </Flex>
        <DividerWithText m={1}>Create a new buddies channel</DividerWithText>
        <Text mb={4}>
          Before you create a new buddy channel, you must first create the actual Slack channel. You
          can choose between private and public, but if your channel is private users will not see
          it on the list above of available channels they can join.
          <br />
          Once the channel has been created, you will need to select an admin. The admin can change
          settings and set up the prizes.
        </Text>
        <NewChannelButton />
      </Box>
    </Container>
  );
};

export default ChannelList;
