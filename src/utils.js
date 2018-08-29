export const isExternalLinkAnnotation = anno =>
  anno.hasOwnProperty('@id') &&
  anno.hasOwnProperty('label') &&
  anno['@id'] === anno.label;
