import { Tour, listedTours, TourParam, tourIds } from "./models/tourModel";
import { ContractPromiseBatch, context } from "near-sdk-as";
import { Comment, tourComments } from "./models/commentModel";
import { Rate, tourRates } from "./models/rateModel";

/*
CREATE NEW TOUR
*/
export function setTour(tour: TourParam): string {
  let storedTour = listedTours.get(tour.id);
  if (storedTour !== null) {
    throw new Error(`a tour with ${tour.id} already exists`);
  }
  tourIds.push(tour.id);
  listedTours.set(tour.id, Tour.fromPayload(tour));
  return "Tour Created!";
}

/*
FETCH TOUR/TOURS
*/

export function getTour(id: string): Tour | null {
  assert(listedTours.contains(id), "This Tour doesn't exist");
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
    throw new Error("Tour not found");
  }
  if (tour.price.toString() != context.attachedDeposit.toString()) {
    throw new Error("Attached deposit should equal to the tour's price");
  }
  ContractPromiseBatch.create(tour.owner).transfer(context.attachedDeposit);
  tour.incrementSoldAmount();
  listedTours.set(tour.id, tour);

  return "Successfully Purchased Tour!";
}

/*
UPDATE TOUR
*/

export function updateTour(tour: Tour): string {
  let storedTour = listedTours.get(tour.id);
  if (storedTour === null) {
    throw new Error(`Tour not found`);
  }
  const opt = storedTour.updateFromPayload(tour);

  listedTours.set(tour.id, opt);

  return "Successfully Updated Tour!";
}

/*
DELETE TOUR
*/

export function deleteTour(id: string): string {
  let tour = listedTours.getSome(id);

  tour.comments.forEach((comment) => {
    tourComments.delete(comment.id);
  });
  tour.rates.forEach((rate) => {
    tourRates.delete(rate.id);
  });

  listedTours.delete(id);

  return "Successfully deleted Tour";
}

/*
IMPRESSIONS ON TOUR
*/
// LIKE
export function likeTour(id: string): string {
  let storedTour = listedTours.getSome(id);

  const opts = !storedTour.like.includes(context.sender);
  const check = !storedTour.dislike.includes(context.sender);

  assert(opts, "You have already liked this tour");

  assert(check, "You have already made an impression on this tour");

  const opt = storedTour.likeTour();

  listedTours.set(id, opt);

  return "You liked Tour with ID:" + id;
}

// UNLIKE
export function unLikeTour(id: string): string {
  let storedTour = listedTours.getSome(id);
  if (storedTour.like.includes(context.sender)) {
    let id = storedTour.like.findIndex((data) => data == context.sender);
    if (id != -1) {
      storedTour.like.splice(id, 1);
    }
  }

  listedTours.set(id, storedTour);
  return "You unliked Tour with ID:" + id;
}

// DISLIKE
export function dislikeTour(id: string): string {
  let storedTour = listedTours.getSome(id);

  const opts = !storedTour.dislike.includes(context.sender);
  const check = !storedTour.like.includes(context.sender);

  assert(opts, "You have already disliked this tour");
  assert(check, "You have already made an impression on this tour");

  const opt = storedTour.dislikeTour();

  listedTours.set(id, opt);

  return "You disliked Tour with ID:" + id;
}

// UNDISLIKE
export function unDislikeTour(id: string): string {
  let storedTour = listedTours.getSome(id);
  if (storedTour.dislike.includes(context.sender)) {
    let id = storedTour.dislike.findIndex((data) => data == context.sender);
    if (id != -1) {
      storedTour.dislike.splice(id, 1);
    }
  }

  listedTours.set(id, storedTour);
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
RATE TOUR
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

  assert(!found, "You have already rated this Tour");

  tourRates.set(rate.id, Rate.fromPayload(rate));
  let storedRate = tourRates.getSome(rate.id);
  let opt = tour.rate(storedRate);
  listedTours.set(tour.id, opt);
  return "You rated Tour with ID:" + rate.tourId;
}
