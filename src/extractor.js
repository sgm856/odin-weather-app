export class Extractor {
  constructor(...args) {
    this.properties = args;
  }

  extract(json) {
    if (!this.properties) {
      return new Error("Constructor not given properties to extract.");
    }
    const jsonParsed = json.parse();
    extractionObject = {};
    for (const property of this.properties) {
      extractionObject.property = jsonParsed[property];
    }
    return extractionObject;
  }
}
