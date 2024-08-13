import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-2xl mb-4">Просмотр товаров</h2>
        </main>
      </div>
    </div>
  );
}
