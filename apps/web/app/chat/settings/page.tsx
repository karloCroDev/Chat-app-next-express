import { SettingsForm } from "@/components/settings-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  return (
    <>
      <h1 className="text-4xl font-bold ">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Change your users profile settings
      </p>

      <SettingsForm />
    </>
  );
}
