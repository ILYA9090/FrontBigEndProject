import { Node, Project, SyntaxKind } from 'ts-morph';

const removedFeatureName = process.argv[2]; // Example featureName
const featureState = process.argv[3]; // Example on/off

if (!removedFeatureName) {
  throw new Error('Укажите название фичи');
}

if (!featureState) {
  throw new Error('Укажите состоание фичи on или off');
}

if (featureState !== 'on' && featureState !== 'off') {
  throw new Error(
    'укажите правильное состояние фичи, оно может быть on или off'
  );
}
const project = new Project({});

// project.addSourceFilesAtPaths('src/**ArticleDetailsPage.tsx');
project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');
const files = project.getSourceFiles();

function isToogleFunction(node: Node) {
  let isToogleFeatures = false;
  node.forEachChild((child) => {
    if (
      child.isKind(SyntaxKind.Identifier) &&
      child.getText() === 'toogleFeatures'
    ) {
      isToogleFeatures = true;
    }
  });
  return isToogleFeatures;
}

files.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    if (node.isKind(SyntaxKind.CallExpression) && isToogleFunction(node)) {
      const objectOptions = node.getFirstDescendantByKind(
        SyntaxKind.ObjectLiteralExpression
      );
      if (!objectOptions) {
        return;
      }
      const onFunctionProperty = objectOptions.getProperty('on');
      const offFunctionProperty = objectOptions?.getProperty('off');
      const featuresNamProperty = objectOptions?.getProperty('name');
      const onFunction = onFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      );
      const offFunction = offFunctionProperty?.getFirstDescendantByKind(
        SyntaxKind.ArrowFunction
      );
      const featuresName = featuresNamProperty
        ?.getFirstDescendantByKind(SyntaxKind.StringLiteral)
        ?.getText()
        .slice(1, -1);

      if (featuresName !== removedFeatureName) return;

      if (featureState === 'on') {
        node.replaceWithText(onFunction?.getBody().getText() ?? '');
      }

      if (featureState === 'off') {
        node.replaceWithText(offFunction?.getBody().getText() ?? '');
      }
    }
  });
});

project.save();
