import {Submission} from "./submission";
import {SubmissionResult} from "./submission-result";

export interface Place {
    id:string;
    alias:string;
    clues:string[];
    options:string[];
    submissionResult?:SubmissionResult
}
