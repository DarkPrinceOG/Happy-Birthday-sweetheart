export interface LetterPayload {
  recipient: string;
  greeting: string;
  paragraphs: string[];
  giftButtonLabel: string;
  roseExperience: {
    messages: string[];
    finalWishes: string[];
    signature: string;
  };
}

export type ExperienceStage = 'gate' | 'envelope' | 'letter' | 'rose';
