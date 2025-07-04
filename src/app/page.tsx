"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { authClient } from "@/lib/auth-client";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data: session } = authClient.useSession();

  const onSubmit = () => {
    authClient.signUp.email({
      name,
      email,
      password,
    },{
      onError: () => {
        window.alert("Error creating account");
      },
      onSuccess: () => {
        window.alert("Account created successfully");
      }
    });
  }

  if (session) {
    return <div className="p-4 flex flex-col gap-4">
      <h1>Welcome {session.user?.name}</h1>
      <Button onClick={() => authClient.signOut()}>Sign out</Button>
    </div>
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={onSubmit}>create account</Button>
    </div>
  );
}
