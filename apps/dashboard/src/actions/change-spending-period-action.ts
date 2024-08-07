"use server";

import { Cookies } from "@/utils/constants";
import { getUser } from "@midday/supabase/cached-queries";
import { addYears } from "date-fns";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { action } from "./safe-action";
import { changeSpendingPeriodSchema } from "./schema";

export const changeSpendingPeriodAction = action(
  changeSpendingPeriodSchema,
  async (params) => {
    const user = await getUser();

    cookies().set({
      name: Cookies.SpendingPeriod,
      value: JSON.stringify(params),
      expires: addYears(new Date(), 1),
    });

    revalidateTag(`spending_${user.data.team_id}`);

    return params;
  }
);
