var Bem = require('@bem/naming');
var path = require('path');

var bem = new Bem({
  elem: '__',
  mod: '_',
});

/**
 * {a,b,c}
 *
 * @param  {string[]} parts
 * @return {string}
 */
function buildSet(parts) {
  return parts.length > 1
    ? '{' + parts.join(',') + '}'
    : parts[0];
}

/**
 * @param  {object} decl
 * @param  {string} decl.block
 * @param  {string} decl.elem
 * @param  {string} decl.modVal
 * @param  {string} decl.modName
 * @return {string}
 */
function resolveBlock(decl) {
  return path.join(decl.block, decl.block);
}

/**
 * @param  {object} decl
 * @param  {string} decl.block
 * @param  {string} decl.elem
 * @param  {string} decl.modVal
 * @param  {string} decl.modName
 * @return {string}
 */
function resolveElem(decl) {
  return path.join(decl.block, bem.delims.elem + decl.elem, bem.stringify(decl));
}

/**
 * @param  {object} decl
 * @param  {string} decl.block
 * @param  {string} decl.elem
 * @param  {string} decl.modVal
 * @param  {string} decl.modName
 * @return {string}
 */
function resolveBlockMod(decl) {
  return path.join(decl.block, bem.delims.mod.name + decl.mod.name, bem.stringify(decl));
}

/**
 * @param  {object} decl
 * @param  {string} decl.block
 * @param  {string} decl.elem
 * @param  {string} decl.modVal
 * @param  {string} decl.modName
 * @return {string}
 */
function resolveElemMod(decl) {
  return path.join(decl.block, bem.delims.elem + decl.elem, bem.delims.mod.name + decl.mod.name, bem.stringify(decl));
}


/**
 * @param  {object} decl
 * @param  {string} decl.block
 * @param  {string} decl.elem
 * @param  {string} decl.modVal
 * @param  {string} decl.modName
 * @return {string}
 */
function resolveDecl(decl) {

  var entity = bem.parse(bem.stringify(decl));

  if (entity.type === 'elemMod') {
    return resolveElemMod(decl);
  }

  if (entity.type === 'blockMod') {
    return resolveBlockMod(decl);
  }

  if (entity.type === 'elem') {
    return resolveElem(decl);
  }

  if (entity.type === 'block') {
    return resolveBlock(decl);
  }

  return new Error('Unknown decl');
}

/**
 * @param  {string|string[]} arg
 * @return {array}
 */
function stringToArray(arg) {
  return Array.isArray(arg) ? arg : [arg].filter(Boolean);
}

exports.buildSet = buildSet;
exports.resolveBlock = resolveBlock;
exports.resolveBlockMod = resolveBlockMod;
exports.resolveElem = resolveElem;
exports.resolveElemMod = resolveElemMod;
exports.resolveDecl = resolveDecl;
exports.stringToArray = stringToArray;
