import { IDoc } from "../interfaces/i.doc";
import { IUser } from "../interfaces/i.user";

export class Doc implements IDoc {
    id: number;
    regNo: string;
    regDate: Date;
    outDocNo: string;
    outDocDate: Date;
    formaDostav: string;
    correspondent: string;
    tema: string;
    description: string;
    srokIspol: Date;
    access: boolean;
    control: boolean;
    docUrl: string;
    user: IUser;

}