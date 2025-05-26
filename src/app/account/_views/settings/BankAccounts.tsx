import { usePlaidLink } from "react-plaid-link";
import {
  createLinkToken,
  deleteAccessToken,
  exchangePublicToken,
  getAccountInfo,
} from "../../plaid-actions";
import { useEffect, useState } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { useStore } from "../../store";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function BankAccounts() {
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const accountInfo = useStore((state: any) => state.accountInfo);
  const setAccountInfo = useStore((state: any) => state.setAccountInfo);
  async function generateToken() {
    const token = await createLinkToken();

    console.log("link token", token);
    if (token && "link_token" in token) {
      setLinkToken(token.link_token as string);
    }
  }

  useEffect(() => {
    generateToken();
  }, []);

  if (!accountInfo) {
    return <PlaidButton linkToken={linkToken ?? ""} />;
  }

  console.log("accountInfo", accountInfo);

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {accountInfo.map((bank: any) => (
          <Card
            key={bank.item.institution_id}
            className="w-full lg:w-fit lg:min-w-sm"
          >
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-2xl">
                {bank.item.institution_name}
              </CardTitle>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost">
                    <MoreHorizontal />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex flex-col gap-2 w-fit">
                  <Button
                    variant="destructive"
                    onClick={async () => {
                      await deleteAccessToken(bank.id);
                      setAccountInfo(await getAccountInfo());
                    }}
                  >
                    Delete
                  </Button>
                </PopoverContent>
              </Popover>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {bank.accounts.map((account: any) => (
                <div key={account.account_id}>
                  <p className="flex items-center gap-2 text-lg">
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
      </div>
      <PlaidButton linkToken={linkToken ?? ""} />
    </>
  );
}

function PlaidButton({ linkToken }: { linkToken: string }) {
  const setAccountInfo = useStore((state: any) => state.setAccountInfo);
  const { open } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token) => {
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
    <Button onClick={() => open()} className="mt-4">
      Connect Bank
    </Button>
  );
}
