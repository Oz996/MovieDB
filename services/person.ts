import { Person } from "@/types";
import options from "./options";

export const getPersonDetails = async (
  id: string | number
): Promise<Person> => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/person/${id}?append_to_response=external_ids,combined_credits`,
      options
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    throw Error(error.message);
  }
};
