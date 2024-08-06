import { AddCardsUI } from "@/components/pageComponents/controlPage/AddCardsUI";
import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

export default async function addCards() {
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
          <h2 className="font-bold text-4xl mb-4">Добавить товар</h2>
          <AddCardsUI user={user.id} />
        </main>
      </div>
    </div>
  );
}
