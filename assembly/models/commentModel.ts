import { PersistentUnorderedMap, context } from "near-sdk-as";

@nearBindgen
export class Comment {
  id: string;
  tourId: string;
  comment: string;
  commenter: string;

  public static fromPayload(payload: Comment): Comment {
    const comment = new Comment();
    comment.id = payload.id;
    comment.tourId = payload.tourId;
    comment.comment = payload.comment;
    comment.commenter = context.sender;
    return comment;
  }
}

export const tourComments = new PersistentUnorderedMap<string, Comment>(
  "COMMENT"
);
