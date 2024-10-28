export interface SmtpEmailBodyDTO{
    emails: string[];
    templateName: string;
    emailBody: unknown;
}