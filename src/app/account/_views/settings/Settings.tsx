import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BankAccounts from "./BankAccounts";
export default function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <Accordion type="single" collapsible>
        <AccordionItem value="bank-accounts">
          <AccordionTrigger>Bank Accounts</AccordionTrigger>
          <AccordionContent>
            <BankAccounts />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
