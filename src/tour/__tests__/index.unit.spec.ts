import { VMContext } from "near-mock-vm";
import { TxFee, creator, tour, comment, rate } from "../../utils";
import {
  setTour,
  getTour,
  buyTour,
  deleteTour,
  likeTour,
  dislikeTour,
  commentOnTour,
  rateTour,
} from "../assembly";
import { tourIds } from "../assembly/models/tourModel";

// SET TOUR
describe("Checks for creating account", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
  });

  it("creates a tour", () => {
    const response = setTour(tour);

    expect(response).toBe("Tour Created!");
    expect(tourIds.length).toBeGreaterThan(
      0,
      "A new tour exists with the id: " + tourIds[0]
    );
  });
});

// GET TOUR
describe("View a single Tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);

    setTour(tour);
  });

  it("Returns a single tour", () => {
    expect(tour.id).toStrictEqual(
      tourIds[0],
      "The uniqueId on the returned tour is equal to the id: " + tourIds[0]
    );
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function getUnknownItem(): void {
      getTour("ANC-0000001");
    }
    expect(getUnknownItem).toThrow("This Tour doesn't exist");
  });
});

// BUY TOUR
describe("To purchase a single Tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
    setTour(tour);
  });

  it("purchases a single tour and returns a response", () => {
    const response = buyTour(tourIds[0]);
    expect(response).toBe("Successfully Purchased Tour!");
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function buyUnknownItem(): void {
      buyTour("ANC-0000001");
    }
    expect(buyUnknownItem).toThrow("Tour not found");
  });
});

// DELETE TOUR
describe("To delete a single Tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
    setTour(tour);
  });

  it("deletes a single tour and returns a response", () => {
    const response = deleteTour(tourIds[0]);
    expect(response).toBe("Successfully deleted Tour");
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function deleteUnknownItem(): void {
      deleteTour("ANC-0000001");
    }
    expect(deleteUnknownItem).toThrow("This Tour doesn't exist");
  });
});

// LIKE TOUR
describe("To like on a single Tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
    setTour(tour);
  });

  it("likes on a single tour and returns a response", () => {
    const response = likeTour(tourIds[0]);
    expect(response).toBe("You liked Tour with ID:" + tourIds[0]);
  });

  it("unlikes on a single tour and returns a response", () => {
    likeTour(tourIds[0]);
    const response = likeTour(tourIds[0]);
    expect(response).toBe("You unliked Tour with ID:" + tourIds[0]);
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function likeUnknownItem(): void {
      likeTour("ANC-0000001");
    }
    expect(likeUnknownItem).toThrow("This Tour doesn't exist");
  });
});

// DISLIKE TOUR
describe("To dislike on a single Tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);

    setTour(tour);
  });

  it("dislikes on a single tour and returns a response", () => {
    const response = dislikeTour(tourIds[0]);
    expect(response).toBe("You disliked Tour with ID:" + tourIds[0]);
  });

  it("undislikes on a single tour and returns a response", () => {
    dislikeTour(tourIds[0]);
    const response = dislikeTour(tourIds[0]);
    expect(response).toBe("You undisliked Tour with ID:" + tourIds[0]);
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function dislikeUnknownItem(): void {
      dislikeTour("ANC-0000001");
    }
    expect(dislikeUnknownItem).toThrow("This Tour doesn't exist");
  });
});

// COMMENT ON TOUR
describe("Comment on tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
  });

  it("comments on tour", () => {
    setTour(tour);
    const response = commentOnTour(comment);

    expect(response).toBe("You commented on Tour with ID:" + tourIds[0]);
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function commentOnInvalidTour(): void {
      commentOnTour(comment);
    }
    expect(commentOnInvalidTour).toThrow("This Tour doesn't exist");
  });
});

// RATE TOUR
describe("Rate tour", () => {
  beforeEach(() => {
    VMContext.setAttached_deposit(TxFee);
    VMContext.setSigner_account_id(creator);
  });

  it("rates tour", () => {
    setTour(tour);
    const response = rateTour(rate);

    expect(response).toBe("You rated Tour with ID:" + tourIds[0]);
  });

  it("Smart contract panics when there's no Tour with such ID", () => {
    function rateOnInvalidTour(): void {
      rateTour(rate);
    }
    expect(rateOnInvalidTour).toThrow("This Tour doesn't exist");
  });
});
