var Bem = require('bem-naming');
var path = require('path');

var bem = new Bem({
  elem: '__',
  mod: '_',
});

/**
 * @param  {string[]} parts
 * @return {string}
 */
function globify(parts) {
  if (parts.length === 1) {
    return parts[0];
  }

  return '{' + parts.join(',') + '}';
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
  return path.join(decl.block, bem.elemDelim + decl.elem, bem.stringify(decl));
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
  return path.join(decl.block, bem.modDelim + decl.modName, bem.stringify(decl));
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
  return path.join(decl.block, bem.elemDelim + decl.elem, bem.modDelim + decl.modName, bem.stringify(decl));
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
  if (bem.isElemMod(decl)) {
    return resolveElemMod(decl);
  }

  if (bem.isBlockMod(decl)) {
    return resolveBlockMod(decl);
  }

  if (bem.isElem(decl)) {
    return resolveElem(decl);
  }

  if (bem.isBlock(decl)) {
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

exports.globify = globify;
exports.resolveBlock = resolveBlock;
exports.resolveBlockMod = resolveBlockMod;
exports.resolveElem = resolveElem;
exports.resolveElemMod = resolveElemMod;
exports.resolveDecl = resolveDecl;
exports.stringToArray = stringToArray;
