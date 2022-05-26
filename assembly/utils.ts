import { u128 } from "near-sdk-core";

export type AccountId = string;
export type tourID = string;
export const TxFee = u128.from("520000000000000000000000");








// near call tourcontract.giftea.testnet updateTour '{"tour": {"id": "0", "name": "Mountain Hiker", "imageCover": "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu","summary": "Breathtaking hike through the Canadian Banff National Park","price":"1000000000000000000000000","images": ["https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ]  }}' --accountId=giftea.testnet

// '{"tour": {"id": "0", "name": "The Forest Hiker", "images": "https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "description": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu","summary": "Breathtaking hike through the Canadian Banff National Park","price":"1000000000000000000000000","imageCover": ["https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/747964/pexels-photo-747964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" ]  }}'