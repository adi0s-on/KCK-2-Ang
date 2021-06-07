export class BooleanParser {
  public parseStringToBoolean(val: string): boolean {
    return val === 'true';
  }
}
