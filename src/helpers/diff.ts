export interface DiffEntry {
  position: string;
  isUnchanged: boolean;
}

/**
 * entry before modification.
 */
export class FromEntry {
  private readonly _position: string = "";
  private readonly _text: string = "";
  private readonly _movedTo: DiffEntry[] = [];
  constructor(position: string, text: string) {
    this._position = position;
    this._text = text;
    this._movedTo = [];
  }
  get text(): string {
    return this._text;
  }
  get position(): string {
    return this._position;
  }
  setDestination(pos: string) {
    const de: DiffEntry = {
      position: pos,
      isUnchanged: this._position === pos,
    };
    this._movedTo.push(de);
  }
  getInfo(): DiffEntry[] {
    return this._movedTo;
  }
}

/**
 * entry after modification.
 */
export class ToEntry {
  private readonly _position: string = "";
  private readonly _text: string = "";
  private readonly _movedFrom: DiffEntry[] = [];
  constructor(pos: string, text: string) {
    this._position = pos;
    this._text = text;
    this._movedFrom = [];
  }
  get text(): string {
    return this._text;
  }
  get position(): string {
    return this._position;
  }
  setHistory(pos: string) {
    const de: DiffEntry = {
      position: pos,
      isUnchanged: this._position === pos,
    };
    this._movedFrom.push(de);
  }
  getInfo(): DiffEntry[] {
    return this._movedFrom;
  }
}

const toHumanIndex = (idx: number): string => {
  if (idx === 1) return "1st";
  if (idx === 2) return "2nd";
  if (idx === 3) return "3rd";
  return `${idx}th`;
};

export class SortDiff {
  private readonly fromEntries: FromEntry[] = [];
  private readonly toEntries: ToEntry[] = [];
  constructor(fromLines: string[], toLines: string[]) {
    this.fromEntries = fromLines.map((line, idx) => {
      const elems = line.split("\t").filter((x) => x.trim().length);
      const pos = elems.length < 2 ? toHumanIndex(idx + 1) : elems[0];
      const text = elems.length < 2 ? elems[0] : elems[1];
      const ent = new FromEntry(pos, text);
      return ent;
    });
    this.toEntries = toLines.map((line, idx) => {
      const elems = line.split("\t").filter((x) => x.trim().length);
      const pos = elems.length < 2 ? toHumanIndex(idx + 1) : elems[0];
      const text = elems.length < 2 ? elems[0] : elems[1];
      const ent = new ToEntry(pos, text);
      return ent;
    });
  }

  /**
   * check how `fromLines` were changed to `toLines`.
   */
  checkDestination() {
    for (let i = 0; i < this.fromEntries.length; i++) {
      const ent = this.fromEntries[i];
      const found = this.toEntries.filter((t) => {
        return t.text === ent.text;
      });
      found.forEach((f) => {
        ent.setDestination(f.position);
      });
    }
  }

  /**
   * check how `toLines` were modified from `fromLines`.
   */
  checkHistory() {
    for (let i = 0; i < this.toEntries.length; i++) {
      const ent = this.toEntries[i];
      const found = this.fromEntries.filter((f) => {
        return f.text === ent.text;
      });
      found.forEach((f) => {
        ent.setHistory(f.position);
      });
    }
  }

  getDestination(): FromEntry[] {
    return this.fromEntries;
  }

  getHistory(): ToEntry[] {
    return this.toEntries;
  }
}
