export class PlaywrightCommandException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlaywrightCommandException";
  }
}

export class PlaywrightCommandMethodNotSupportedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PlaywrightCommandMethodNotSupportedException";
  }
}

export type LogLine = {
  id?: string;
  category?: string;
  message: string;
  level?: 0 | 1 | 2;
  timestamp?: string;
  auxiliary?: {
    [key: string]: {
      value: string;
      type: "object" | "string" | "html" | "integer" | "float" | "boolean";
    };
  };
};


export type TextAnnotation = {
  text: string;
  midpoint: { x: number; y: number };
  midpoint_normalized: { x: number; y: number };
  width: number;
  height: number;
}