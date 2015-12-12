module.exports = function(babel) {
    const types = babel.types;
    const isModulesRequire = types.buildMatchMemberExpression('modules.require');
    const isModulesDefine = types.buildMatchMemberExpression('modules.define');

    function importYM() {
        return types.variableDeclaration(
            'var',
            [types.variableDeclarator(
                types.identifier('modules'),
                types.callExpression(
                    types.identifier('require'),
                    [types.stringLiteral('ym')]
                )
            )]
        );
    }

    return {
        visitor: {
            Program: {
                enter() {
                    this.ymFound = false;
                },
                exit(path) {
                    if(this.ymFound) {
                        path.node.body.unshift(importYM());
                    }
                }
            },
            CallExpression: {
                enter(path) {
                    const callee = path.node.callee;
                    if(isModulesDefine(callee) || isModulesRequire(callee)) {
                        this.ymFound = true;
                    }
                }
            }
        }
    }
};
