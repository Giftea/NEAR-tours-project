import { PersistentUnorderedMap, u128, context } from "near-sdk-as";

@nearBindgen
export class Rate {
  id: string;
  tourId: string;
  rate: i32;
  owner: string;

  public static fromPayload(payload: Rate): Rate {
    const rate = new Rate();
    rate.id = payload.id;
    rate.tourId = payload.tourId;
    rate.rate = payload.rate;
    rate.owner = context.sender;
    return rate;
  }
}

export const tourRates = new PersistentUnorderedMap<string, Rate>(
  "RATE"
);
