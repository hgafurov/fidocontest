import { IUser } from "./i.user";

export interface IDoc {
	id: number,
	regNo: string,
	regDate: Date,
	outDocNo: string,
	outDocDate: Date,
	formaDostav: string,
	correspondent: string,
	tema: string,
	description: string,
	srokIspol: Date,
	access: boolean,
	control: boolean,
	docUrl: string,
	user: IUser;   
}