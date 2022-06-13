import { u128 } from "near-sdk-core";
import { Comment } from "./tour/assembly/models/commentModel";
import { Rate } from "./tour/assembly/models/rateModel";
import { TourParam } from "./tour/assembly/models/tourModel";

export type AccountId = string;
export type tourID = string;
export const TxFee = u128.from("520000000000000000000000");


/* Dummy data for TEST CASES */
export const creator = "giftea.testnet";

export const tour: TourParam = {
  id: "ID-42",
  name: "The Forest Hiker",
  images: ["img"],
  imageCover: "img",
  summary: "text",
  description: "text",
  price: TxFee,
};

export const comment: Comment = {
  id: "909",
  comment: "Hola",
  commenter: creator,
  tourId: tour.id,
  createdAt: 2393439489,
};

export const rate: Rate = {
  id: "01",
  tourId: tour.id,
  rate: 2,
  owner: creator,
  createdAt: 2393439489
};
