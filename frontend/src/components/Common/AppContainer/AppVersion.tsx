import { Code, useToast, VisuallyHidden } from "@chakra-ui/react";
import { AuthContext } from "contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import { FC, useCallback, useMemo, useRef } from "react";

const AppVersion: FC = ({ children }) => {
  const copyInput = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const router = useRouter();

  const { activeUser } = useContext(AuthContext);

  const copy = useCallback(() => {
    copyInput.current.select();
    copyInput.current.setSelectionRange(0, 99999);

    document.execCommand("copy");

    toast({
      title: "Client info copied!",
      description: "Your application and client information has been copied to your clipboard.",
      status: "info",
      duration: 3000,
      isClosable: true
    });
  }, []);

  const value = useMemo(() => {
    const _navigator: Record<string, unknown> = {};
    const _screen: Record<string, unknown> = {};
    for (const i in navigator) _navigator[i] = navigator[i as keyof Navigator];
    for (const i in screen) _screen[i] = screen[i as keyof Screen];
    return JSON.stringify({
      version: process.env.NEXT_PUBLIC_APP_VERSION,
      router: { ...router, components: undefined },
      navigator: _navigator,
      screen: _screen,
      user: activeUser
    });
  }, [router, activeUser]);

  return (
    <>
      <Code
        // colorScheme="blue"
        variant="subtle"
        cursor="pointer"
        userSelect="none"
        onClick={copy}
        p={1}
        textAlign="right">
        {children}
      </Code>
      <VisuallyHidden>
        <input ref={copyInput} value={value} readOnly />
      </VisuallyHidden>
    </>
  );
};

export default AppVersion;
