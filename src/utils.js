export const isExternalLinkAnnotation = anno =>
  anno &&
  anno.hasOwnProperty('@id') &&
  anno.hasOwnProperty('label') &&
  anno['@id'] === anno.label;
