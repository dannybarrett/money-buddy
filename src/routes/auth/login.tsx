import { A } from "@solidjs/router";
import { Link, Link2, Loader, LogIn } from "lucide-solid";
import { createSignal, Match, Switch } from "solid-js";
import { Button } from "~/components/ui/Button";
import { Card, CardBody, CardHeader } from "~/components/ui/Card";
import { Form, FormItem, Input, Label } from "~/components/ui/Form";

export default function Login() {
  const [loading, setLoading] = createSignal(false);

  function handleSubmit(event: Event) {
    setLoading(true);
    console.log("Form submitted");
  }
  return (
    <div class="w-full h-screen flex flex-col items-center justify-center gap-4">
      <Card class="w-full max-w-sm">
        <CardHeader>
          <h1>Login</h1>
          <p class="text-sm">Please enter your credentials to login.</p>
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
            <Button type="submit" disabled={loading()}>
              <Switch>
                <Match when={loading()}>
                  <Loader class="animate-spin" /> Loading...
                </Match>
                <Match when={!loading()}>
                  <LogIn /> Login
                </Match>
              </Switch>
            </Button>
          </Form>
        </CardBody>
      </Card>
      <A href="/auth/signup" class="flex items-center gap-1">
        Don't have an account? Sign up
      </A>
    </div>
  );
}
