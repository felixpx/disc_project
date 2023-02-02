import * as React from "react";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useConnect } from "wagmi";

function SignInButton({
  onSuccess,
  onError,
}: {
  onSuccess: (args: { address: string }) => void;
  onError: (args: { error: Error }) => void;
}) {
  const [state, setState] = React.useState<{
    loading?: boolean;
    nonce?: string;
  }>({});

  const fetchNonce = async () => {
    try {
      const nonceRes = await fetch("/api/nonce");
      const nonce = await nonceRes.text();
      setState((x) => ({ ...x, nonce }));
    } catch (error) {
      setState((x) => ({ ...x, error: error as Error }));
    }
  };

  // Pre-fetch random nonce when button is rendered
  // to ensure deep linking works for WalletConnect
  // users on iOS when signing the SIWE message
  React.useEffect(() => {
    fetchNonce();
  }, []);

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();

  const signIn = async () => {
    try {
      const chainId = chain?.id;
      if (!address || !chainId) return;

      setState((x) => ({ ...x, loading: true }));
      // Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce: state.nonce,
      });
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const verifyRes = await fetch("/api/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, signature }),
      });
      if (!verifyRes.ok) throw new Error("Error verifying message");

      setState((x) => ({ ...x, loading: false }));
      onSuccess({ address });
    } catch (error) {
      setState((x) => ({ ...x, loading: false, nonce: undefined }));
      onError({ error: error as Error });
      fetchNonce();
    }
  };

  return (
    <button
      disabled={!state.nonce || state.loading}
      onClick={signIn}
      className="text-white ring-2 ring-white py-1 px-2 rounded-xl"
    >
      Login
    </button>
  );
}

export function Profile() {
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const { isConnected } = useAccount();
  const [hasMounted, setHasMounted] = React.useState(false);

  const [state, setState] = React.useState<{
    address?: string;
    error?: Error;
    loading?: boolean;
  }>({});

  React.useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch("/api/me");
        const json = await res.json();
        setState((x) => ({ ...x, address: json.address }));
      } catch (_error) {}
    };
    handler();

    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  // Hooks
  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  // if (isConnected) {
  //   return (
  // <div>
  //   {state.address ? (
  //     <div>
  //       <div>Signed in as {state.address}</div>
  //       <button
  //         onClick={async () => {
  //           await fetch("/api/logout");
  //           setState({});
  //         }}
  //       >
  //         Sign Out
  //       </button>
  //     </div>
  // <div>test</div>
  //     ) : (
  //       <div>test</div>
  //       // <SignInButton
  //       //   onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
  //       //   onError={({ error }) => setState((x) => ({ ...x, error }))}
  //       // />
  //     )}
  //     </div>
  // );
  // );
  // }
  if (!isConnected) {
    return (
      <div>
        <SignInButton
          onSuccess={({ address }) => setState((x) => ({ ...x, address }))}
          onError={({ error }) => setState((x) => ({ ...x, error }))}
        />
      </div>
    );
  }
}

export default Profile;
