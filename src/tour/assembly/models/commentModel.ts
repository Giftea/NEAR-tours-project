import { PersistentUnorderedMap, context } from "near-sdk-as";
import { tourID } from "../../../utils";

@nearBindgen
export class Comment {
  id: string;
  tourId: string;
  comment: string;
  commenter: string;
  createdAt: u64;

  public static fromPayload(commentId: tourID, payload: Comment): Comment {
    const comment = new Comment();
    comment.id = commentId;
    comment.tourId = payload.tourId;
    comment.comment = payload.comment;
    comment.commenter = context.sender;
    comment.createdAt = context.blockTimestamp;

    return comment;
  }
}

export const tourComments = new PersistentUnorderedMap<string, Comment>(
  "COMMENT"
);
