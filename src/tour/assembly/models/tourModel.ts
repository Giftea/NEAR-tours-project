import {
  PersistentUnorderedMap,
  u128,
  context,
  PersistentVector,
} from "near-sdk-as";
import { Comment } from "./commentModel";
import { Rate } from "./rateModel";
import { tourID } from "../../../utils";

@nearBindgen
export class TourParam {
  id: tourID;
  name: string;
  price: u128;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
}

@nearBindgen
export class Tour {
  id: tourID;
  name: string;
  ratingsAverage: f64;
  ratingsQuantity: u32;
  price: u128;
  summary: string;
  description: string;
  imageCover: string;
  images: string[];
  like: string[];
  dislike: string[];
  owner: string;
  sold: u32;
  comments: Comment[];
  rates: Rate[];
  createdAt: u64;

  public static fromPayload(payload: TourParam): Tour {
    const tour = new Tour();
    tour.id = payload.id;
    tour.name = payload.name;
    tour.description = payload.description;
    tour.images = payload.images;
    tour.summary = payload.summary;
    tour.ratingsAverage = 0;
    tour.ratingsQuantity = 0;
    tour.price = payload.price;
    tour.imageCover = payload.imageCover;
    tour.owner = context.sender;
    tour.like = [];
    tour.dislike = [];
    tour.comments = [];
    tour.rates = [];
    tour.createdAt = context.blockTimestamp;

    return tour;
  }

  public incrementSoldAmount(): void {
    this.sold = this.sold + 1;
  }

  updateFromPayload(payload: Tour): Tour {
    this.name = payload.name;
    this.description = payload.description;
    this.images = payload.images;
    this.summary = payload.summary;
    this.price = payload.price;
    this.imageCover = payload.imageCover;
    return this;
  }

  likeTour(): Tour {
    this.like.push(context.sender);
    return this;
  }

  dislikeTour(): Tour {
    this.dislike.push(context.sender);
    return this;
  }

  comment(comment: Comment): Tour {
    this.comments.push(comment);
    return this;
  }

  rate(rate: Rate): Tour {
    this.rates.push(rate);
    let numRates = this.rates.length;
    this.ratingsQuantity = numRates;
    let num1 = this.rates.filter((item) => item.rate === 1).length;
    let num2 = this.rates.filter((item) => item.rate === 2).length;
    let num3 = this.rates.filter((item) => item.rate === 3).length;
    let num4 = this.rates.filter((item) => item.rate === 4).length;
    let num5 = this.rates.filter((item) => item.rate === 5).length;

    let tot = num1 + num2 + num3 + num4 + num5;
    let rateAvg = (num1 + num2 * 2 + num3 * 3 + num4 * 4 + num5 * 5) / tot;
    this.ratingsAverage = Math.round(rateAvg * 100) / 100;
    return this;
  }
}

export const listedTours = new PersistentUnorderedMap<string, Tour>(
  "LISTED_TOURS"
);
export const tourIds = new PersistentVector<string>("id");
