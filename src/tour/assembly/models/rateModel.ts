import { PersistentUnorderedMap, u128, context } from "near-sdk-as";
import { tourID } from "../../../utils";

@nearBindgen
export class Rate {
  id: string;
  tourId: string;
  rate: i32;
  owner: string;
  createdAt: u64;

  public static fromPayload(rateId: tourID, payload: Rate): Rate {
    const rate = new Rate();
    rate.id = rateId;
    rate.tourId = payload.tourId;
    rate.rate = payload.rate;
    rate.createdAt = context.blockTimestamp;
    rate.owner = context.sender;
    return rate;
  }
}

export const tourRates = new PersistentUnorderedMap<string, Rate>(
  "RATE"
);
