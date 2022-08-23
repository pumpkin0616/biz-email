import { IPage } from 'biz-email-core';

export interface IEmailTemplate {
  content: IPage;
  subject: string;
  subTitle: string;
}
