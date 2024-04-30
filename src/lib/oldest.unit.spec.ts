import { describe, it, expect } from "vitest";

const ageForNameFake = async (name: string): Promise<number> =>
  ({ Marco: 80, Helmut: 75, "Lisa-Marie": 20 }[name] ?? 0);

describe("oldest", async () => {
  it("should return the oldest name from a list of names", async () => {
    expect(
      await oldest(["Marco", "Helmut", "Lisa-Marie"], ageForNameFake)
    ).toEqual("Marco");
  });
});

describe("highestAge", () => {
  it("should return the highest age from a list of names", async () => {
    expect(
      await highestAge(["Marco", "Helmut", "Lisa-Marie"], ageForNameFake)
    ).toEqual(80);
  });
});
describe("ageForName", () => {
  const fetchStub = async (name: string) =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          age: 75,
        }),
    });

  it("should return the highest age from a list of names", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(await ageForName("Helmut", fetchStub)).toEqual(75);
  });
});

const ageForName = async (name: string, fetch_ = fetch): Promise<number> => {
  const url = "https://api.agify.io/?name=" + name;
  const response: Response = await fetch_(url);
  return (await response.json()).age;
};

const oldest = async (
  names: string[],
  ageForName_ = ageForName
): Promise<string | undefined> =>
  names.find(
    async (name) =>
      (await ageForName_(name)) === (await highestAge(names, ageForName_))
  );

const highestAge = async (
  names: string[],
  ageForName_ = ageForName
): Promise<number> => {
  const agesPending: Promise<number>[] = names.map(async (name) =>
    ageForName_(name)
  );
  const ages: number[] = await Promise.all(agesPending);
  return Math.max(...ages);
};
