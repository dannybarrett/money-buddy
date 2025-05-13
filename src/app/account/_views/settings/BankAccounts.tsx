import { usePlaidLink } from "react-plaid-link";
import {
  createLinkToken,
  deleteAccessToken,
  exchangePublicToken,
  getAccountInfo,
} from "../../plaid-actions";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-react";
import { useStore } from "../../store";
export default function BankAccounts() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountInfo = useStore((state: any) => state.accountInfo);
  const setAccountInfo = useStore((state: any) => state.setAccountInfo);
  async function generateToken() {
    const token = await createLinkToken();
    if (token && "link_token" in token) {
      setLinkToken(token.link_token);
    }
  }

  useEffect(() => {
    generateToken();
  }, []);

  if (!accountInfo) {
    return <PlaidButton linkToken={linkToken ?? ""} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {accountInfo.map((bank: any) => (
        <Card key={bank.item.institution_id}>
          <CardHeader className="flex items-center justify-between">
            <CardTitle>{bank.item.institution_name}</CardTitle>
            <button
              onClick={async () => {
                await deleteAccessToken(bank.id);
                setAccountInfo(await getAccountInfo());
              }}
            >
              <Trash className="w-4" />
            </button>
          </CardHeader>
          <CardContent>
            {bank.accounts.map((account: any) => (
              <div key={account.account_id}>
                <p>
                  <span className="font-light">{account.name}</span> -
                  <span className="font-bold">
                    {" "}
                    ${account.balances.current}
                  </span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
      <PlaidButton linkToken={linkToken ?? ""} />
    </div>
  );
}

function PlaidButton({ linkToken }: { linkToken: string }) {
  const setAccountInfo = useStore((state: any) => state.setAccountInfo);
  const { ready, open } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
      const response = await exchangePublicToken(public_token);
      if (response?.success) {
        setAccountInfo(await getAccountInfo());
      }
    },
    onExit: (error, metadata) => {
      console.log(error, metadata);
    },
  });

  return (
    <button onClick={() => open()} className="action-button">
      Connect Bank
    </button>
  );
}
