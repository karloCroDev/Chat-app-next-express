import { SettingsForm } from "@/components/settings-form";
import { serverSession } from "@/lib/actions/auth";

export default async function SettingsPage() {
  const user = await serverSession();
  return (
    <div className="px-8 py-6">
      <h1 className="text-4xl font-bold ">Settings</h1>
      <p className="mt-2 text-muted-foreground">
        Change your users profile settings
      </p>

      <SettingsForm
        bio={user!.bio}
        image={user!.image}
        username={user!.username}
      />
    </div>
  );
}
