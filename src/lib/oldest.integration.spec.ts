import { describe, it, expect } from "vitest";

describe("ageForName", () => {
  it("should return the highest age from a list of names", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(await ageForName("Helmut")).toEqual(75);
  });
});

const ageForName = async (name: string, fetch_ = fetch): Promise<number> => {
  const url = "https://api.agify.io/?name=" + name;
  const response: Response = await fetch_(url);
  console.log(await response.json());
  return (await response.json()).age;
};
