import { A } from "@solidjs/router";
import { Loader, UserRoundPlus } from "lucide-solid";
import { createSignal, Match, Switch } from "solid-js";
import { Button } from "~/components/ui/Button";
import { Card, CardBody, CardHeader } from "~/components/ui/Card";
import { Form, FormItem, Input, Label } from "~/components/ui/Form";

export default function SignUp() {
  const [loading, setLoading] = createSignal(false);

  function handleSubmit(event: Event) {
    event.preventDefault();
    setLoading(true);
    console.log("Form submitted");
  }

  return (
    <div class="flex flex-col items-center justify-center w-full h-screen gap-4">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <h1>Sign Up</h1>
          <p class="text-sm">Create a new account.</p>
        </CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormItem>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="someone@example.com"
                required={true}
              />
            </FormItem>
            <FormItem>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                required={true}
              />
            </FormItem>
            <Button type="submit">
              <Switch>
                <Match when={loading()}>
                  <Loader class="animate-spin" /> Creating account...
                </Match>
                <Match when={!loading()}>
                  <UserRoundPlus /> Sign Up
                </Match>
              </Switch>
            </Button>
          </Form>
        </CardBody>
      </Card>
      <A href="/auth/login" class="flex items-center gap-1">
        Already have an account? Log in
      </A>
    </div>
  );
}
