import { Person } from "@/types";
import { options } from "./all";

export const getPersonDetails = async (id: string | number) => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?append_to_response=external_ids,combined_credits`,
      options
    );
    const data = (await res.json()) as Person;
    return data;
  } catch (error: any) {
    console.error(error.message);
  }
};
