import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BankAccounts from "./BankAccounts";
export default function Settings() {
  return (
    <div className="flex flex-col gap-4 p-4 lg:p-8">
      <h1>Settings</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="bank-accounts">
          <AccordionTrigger className="text-xl font-medium">
            Bank Accounts
          </AccordionTrigger>
          <AccordionContent>
            <BankAccounts />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
