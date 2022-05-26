import { Tour, listedTours } from "./models/tourModel";
import { ContractPromiseBatch, context } from "near-sdk-as";
import { Comment, tourComments } from "./models/commentModel";
import { Rate, tourRates } from "./models/rateModel";

/*
CREATE NEW TOUR
*/
export function setTour(tour: Tour): string {
  let storedTour = listedTours.get(tour.id);
  if (storedTour !== null) {
    throw new Error(`a tour with ${tour.id} already exists`);
  }
  listedTours.set(tour.id, Tour.fromPayload(tour));
  return "Tour Created!";
}

/*
FETCH TOUR/TOURS
*/

export function getTour(id: string): Tour | null {
  return listedTours.get(id);
}

export function getTours(): Tour[] {
  return listedTours.values();
}

/*
PURCHASE TOUR
*/

export function buyTour(tourId: string): string {
  const tour = getTour(tourId);
  if (tour == null) {
    throw new Error("tour not found");
  }
  if (tour.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("attached deposit should equal to the tour's price");
  }
  ContractPromiseBatch.create(tour.owner).transfer(context.attachedDeposit);
  tour.incrementSoldAmount();
  listedTours.set(tour.id, tour);

  return "Successfully Purchased Tour!"
}

/*
UPDATE TOUR
*/

export function updateTour(tour: Tour): string {
  let storedTour = listedTours.get(tour.id);
  if (storedTour === null) {
    throw new Error(`tour not found`);
  }
  const opt = storedTour.updateFromPayload(tour);

  listedTours.set(tour.id, opt);

  return "Successfully Updated Tour!"
}

/*
DELETE TOUR
*/

export function deleteTour(id: string): string {
  // tourComments.delete(id)
  // tourRates.delete(id)
  listedTours.delete(id);
  return "Successfully deleted Tour";
}

/*
IMPRESSIONS ON TOUR
*/
// LIKE
export function likeTour(id: string): string {
  let impression = listedTours.getSome(id);

  const check = !impression.dislike.includes(context.sender);
  assert(check, "You have already made an impression on this tour");

  const opt = impression.likeTour();

  listedTours.set(id, opt);

  return "You liked Tour with ID:" + id;
}

// UNLIKE
export function unLikeTour(id: string): string {
  let impression = listedTours.getSome(id);
  if (impression.like.includes(context.sender)) {
    let id = impression.like.findIndex((data) => data == context.sender);
    if (id != -1) {
      impression.like.splice(id, 1);
    }
  }

  listedTours.set(id, impression);
  return "You unliked Tour with ID:" + id;
}

// DISLIKE
export function dislikeTour(id: string): string {
  let impression = listedTours.getSome(id);

  const opts = !impression.dislike.includes(context.sender);
  const check = !impression.like.includes(context.sender);

  assert(opts, "You have already disliked this tour");
  assert(check, "You have already made an impression on this tour");

  const opt = impression.dislikeTour();

  listedTours.set(id, opt);

  return "You disliked Tour with ID:" + id;
}

// UNDISLIKE
export function unDislikeTour(id: string): string {
  let impression = listedTours.getSome(id);
  if (impression.dislike.includes(context.sender)) {
    let id = impression.dislike.findIndex((data) => data == context.sender);
    if (id != -1) {
      impression.dislike.splice(id, 1);
    }
  }

  listedTours.set(id, impression);
  return "You undisliked Tour with ID:" + id;
}

/*
COMMENTS ON TOUR
*/
export function commentOnTour(comment: Comment): string {
  let tour = listedTours.getSome(comment.tourId);

  tourComments.set(comment.id, Comment.fromPayload(comment));
  let storedComment = tourComments.getSome(comment.id);
  let opt = tour.comment(storedComment);
  listedTours.set(tour.id, opt);
  return "You commented on Tour with ID:" + comment.tourId;
}

/*
RATINGS
*/

export function rateTour(rate: Rate): string {
  let tour = listedTours.getSome(rate.tourId);

  let found = false;

  for (var i = 0; i < tour.rates.length; i++) {
    if (tour.rates[i].owner == context.sender) {
      found = true;
      break;
    }
  }

  assert(!found, "You have alrady rated this Tour");

  tourRates.set(rate.id, Rate.fromPayload(rate));
  let storedRate = tourRates.getSome(rate.id);
  let opt = tour.rate(storedRate);
  listedTours.set(tour.id, opt);
  return "You rated Tour with ID:" + rate.tourId;
}

// tourcontract.giftea.testnet
// near deploy --accountId=tourcontract.giftea.testnet --wasmFile=build/release/tour.wasm
// near view tourcontract.giftea.testnet getTour '{"id": "0"}'
// near view tourcontract.giftea.testnet getTours
// near call tourcontract.giftea.testnet deleteTour '{"id": "3"}' --accountId=giftea.testnet

// near call tourcontract.giftea.testnet likeTour '{"id": "0"}' --accountId=giftea.testnet
// near call tourcontract.giftea.testnet dislikeTour '{"id": "0"}' --accountId=firstcontract.giftea.testnet

// near call tourcontract.giftea.testnet unLikeTour '{"id": "0"}' --accountId=giftea.testnet
// near call tourcontract.giftea.testnet unDislikeTour '{"id": "1"}' --accountId=giftea.testnet

// near call tourcontract.giftea.testnet commentOnTour '{"comment": {"id": "1", "tourId": "0", "comment":"Annoying trip"} }' --accountId=firstcontract.giftea.testnet

// near call tourcontract.giftea.testnet rateTour '{"rate": {"id": "3", "tourId": "0", "rate":2} }' --accountId=buyeraccount.giftea.testnet

// near call tourcontract.giftea.testnet buyTour '{"tourId": "0"}' --depositYocto=1000000000000000000000000 --accountId=buyeraccount.giftea.testnet
// near call tourcontract.giftea.testnet setTour '{"tour": {"id": "4", "name": "Air Caravan"} }' --accountId=giftea.testnet
// near call tourcontract.giftea.testnet updateTour '{"tour": {"id": "3", "name": "Great Blue Sky"} }' --accountId=giftea.testnet
