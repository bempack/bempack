module.exports = function(babel) {
    const types = babel.types;

    function collectDeps(deps) {
        if(!types.isArrayExpression(deps)) {
            return [];
        }
        return deps.elements.filter((dep) => {
            if(!types.isStringLiteral(dep)) {
                console.warn('Unable to parse dynamic imports');
                return false;
            }
            return true;
        }).map((dep) => dep.value);
    }

    function addImport(dep) {
        return types.expressionStatement(types.callExpression(
            types.identifier('require'),
            [types.stringLiteral(dep)]
        ));
    }

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
                    this.dependencies = [];
                },
                exit(path) {
                    if(this.dependencies.length > 0) {
                        this.dependencies = this.dependencies.map((dep) => dep + '/' + dep);
                        path.node.body = this.dependencies.map(addImport).concat(path.node.body);
                    }
                    if(this.ymFound) {
                        path.node.body.unshift(importYM());
                    }
                }
            },
            CallExpression: {
                enter(path) {
                    const callee = path.node.callee;
                    if(types.isMemberExpression(callee) && types.isIdentifier(callee.object, {name: 'modules'})) {
                        var methodName = callee.property.name;
                        if(methodName === 'require' || methodName === 'define') {
                            const depArgument = methodName === 'define' ? 1 : 0;
                            this.ymFound = true;
                            this.dependencies = this.dependencies.concat(collectDeps(path.node.arguments[depArgument]));
                        }
                    }
                }
            }
        }
    }
};
